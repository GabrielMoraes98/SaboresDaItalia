import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./dashboard.module.css";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const adminAuthData = JSON.parse(localStorage.getItem("adminAuth"));
  const token = adminAuthData?.token;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin/auth");
  };

  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:3000/admin/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setUsers(result.users);
        } else {
          alert("Não foi possível carregar os usuários.");
        }
      })
      .catch((error) => console.log("Erro ao buscar usuários:", error));
  }, [token]);

  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:3000/admin/orders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setOrders(result.orders);
        } else {
          alert("Não foi possível carregar os pedidos.");
        }
      })
      .catch((error) => console.log("Erro ao buscar pedidos:", error));
  }, [token]);

  const updateOrderStatus = (orderId, newStatus) => {
    fetch(`http://localhost:3000/admin/orders/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ pickupStatus: newStatus })
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order._id === orderId ? { ...order, pickupStatus: newStatus } : order
            )
          );
        } else {
          alert("Falha ao atualizar o status do pedido.");
        }
      })
      .catch((error) =>
        console.log("Erro ao atualizar o status do pedido:", error)
      );
  };

  const handleStatusChange = (orderId, event) => {
    const newStatus = event.target.value;
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <div className={styles.dashboardContainer}>
      <h2>Dashboard do Administrador</h2>
      
      <button onClick={handleLogout} className={`${styles.button} ${styles.logoutButton}`}>
        Sair como Admin
      </button>

      <h3>Usuários Cadastrados</h3>
      {users.length > 0 ? (
        <ul className={styles.userList}>
          {users.map((user) => (
            <li key={user._id}>
              {user.fullname} - {user.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum usuário encontrado.</p>
      )}

      <h3>Pedidos Realizados</h3>
      {orders.length > 0 ? (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuário (userId)</th>
                <th>Horário de Retirada</th>
                <th>Data de Criação</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.userId}</td>
                  <td>{order.pickupTime}</td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                  <td>
                    <select
                      value={order.pickupStatus}
                      onChange={(e) => handleStatusChange(order._id, e)}
                      className={styles.statusSelect}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Canceled">Canceled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Nenhum pedido encontrado.</p>
      )}
    </div>
  );
}