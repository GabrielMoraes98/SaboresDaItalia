import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authServices from "../../services/auth";
import orderServices from "../../services/order";
import styles from "./page.module.css";
import { LuTimer, LuCircleAlert, LuCircleCheckBig } from "react-icons/lu";
import { Link } from "react-router-dom";
import Loading from "../loading/page";

export default function Profile() {
  const { logout } = authServices();
  const { getUserOrders, orderLoading, refetchOrders, ordersList } = orderServices();
  const navigate = useNavigate();
  const authData = JSON.parse(localStorage.getItem("auth"));

  useEffect(() => {
    if (!authData) {
      navigate("/auth");
    } else if (refetchOrders) {
      getUserOrders(authData?.user?._id);
    }
  }, [authData, refetchOrders]);

  if (orderLoading) {
    return <Loading />;
  }

  const handleLogout = () => {
    logout();
    return navigate("/");
  };

  const handleDeleteOrder = (orderId) => {
    const userAuth = JSON.parse(localStorage.getItem("auth"));
    fetch(`http://localhost:3000/orders/${orderId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userAuth?.token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          getUserOrders(authData.user._id);
        } else {
          alert("Não foi possível deletar o pedido.");
        }
      })
      .catch((error) => {
        console.log("Erro ao deletar o pedido:", error);
      });
  };

  return (
    <div className={styles.pageContainer}>
      <div>
        <h1>Bem vindo(a): {authData?.user?.fullname}</h1>
        <h3>E-mail: {authData?.user?.email}</h3>
      </div>

      <button onClick={handleLogout}>Sair</button>

      <button onClick={() => getUserOrders(authData.user._id)}>
        Atualizar Pedidos
      </button>

      {ordersList.length > 0 ? (
        <div className={styles.ordersContainer}>
          {ordersList.map((order) => (
            <div key={order._id} className={styles.orderContainer}>
              {order.pickupStatus === "Pending" ? (
                <p className={`${styles.pickupStatus} ${styles.pending}`}>
                  <LuTimer />
                  {order.pickupStatus}
                </p>
              ) : null}
              {order.pickupStatus === "Completed" ? (
                <p className={`${styles.pickupStatus} ${styles.completed}`}>
                  <LuCircleCheckBig />
                  {order.pickupStatus}
                </p>
              ) : null}
              {order.pickupStatus === "Canceled" ? (
                <p className={`${styles.pickupStatus} ${styles.canceled}`}>
                  <LuCircleAlert />
                  {order.pickupStatus}
                </p>
              ) : null}
              <h3>{order.pickupTime}</h3>
              {order.orderItems.map((item) => (
                <div key={item._id}>
                  <h4>{item.itemDetails[0].name}</h4>
                  <p>Quantity: {item.quantity}</p>
                </div>
              ))}
              <button className={styles.removeButton} onClick={() => handleDeleteOrder(order._id)}>
                Deletar Pedido
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          Você ainda não fez pedidos.
          <Link to={"/plates"} className={styles.platesLink}>
            Clique aqui para verificar nossos pratos!
          </Link>
        </div>
      )}
    </div>
  );
}