import { useState } from "react"
import { useCartContext } from "../../contexts/useCartContext"
import styles from './page.module.css'
import { LuCircleMinus } from 'react-icons/lu'
import ConfirmOrderPopup from "../../components/confirmOrderPopup/confirmOrderPopup"
import orderServices from "../../services/order"
import { Link } from "react-router-dom"

export default function Cart() {

    const { cartItems, updateCartItems, removeFromCart, clearCart } = useCartContext()
    const [confirmPopupOpen, setConfirmPopupOpen] = useState(false)
    const { sendOrder } = orderServices()

    const handleChangeItemQty = (mode, itemId) => {
        const updatedCartItem = cartItems.map((item) => {
            if(item._id === itemId) {
                if(mode === 'less' && item.quantity > 1) {
                    item.quantity -= 1 
                } else if (mode === 'more') {
                    item.quantity += 1
                }
            }

            return item 
        })

        updateCartItems(updatedCartItem)
    }

    const handleOpenPopup = (e) => {
        e.preventDefault()
        setConfirmPopupOpen(!confirmPopupOpen)
    }

    const handleConfirmOrder = (orderData) => {
         orderData.items = cartItems.map((item) => {
            return { plateId: item._id, quantity: item.quantity }
        })
        sendOrder(orderData)
        setConfirmPopupOpen(!confirmPopupOpen)
        clearCart()
    }

    if(!cartItems.length) {
        return(
            <div className={styles.emptyCart}> 
                <h1>Seu carrinho está vazio... :/</h1>
                <Link to="/plates">
                <button type="button">
                    Veja nossos pratos!
                </button>
                </Link>
            </div>
        )
    }

    return (
        <>        
            <div className={styles.pageContainer}>
                <h1>Seus items:</h1>
                <section>
                    <div className={styles.itemsListContainer}>
                        {cartItems.map((item) => (
                            <div className={styles.itemContainer} key={item._id}>
                                <img src={item.imgUrl} alt="" />
                                <div className={styles.itemContent}>
                                    <h2>{item.name}</h2>
                                    <p>[{String(item.ingredients)}]</p>
                                    <p>{item.description}</p>
                                    <div className={styles.portionContainer}>
                                        <p>Quantidade:</p>
                                        <p>{item.quantity}</p>
                                        <div className={styles.portionBtns}>
                                            <button onClick={() => {handleChangeItemQty('less', item._id)}}>-</button>
                                            <button onClick={() => {handleChangeItemQty('more', item._id)}}>+</button>
                                        </div>
                                    </div>
                                    <button onClick={() => { removeFromCart(item._id) }}><LuCircleMinus /> Remover item</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <button className={styles.confirmBtn} onClick={handleOpenPopup}>Confirme seu pedido!</button>
            </div>

            <ConfirmOrderPopup open={confirmPopupOpen} onClose={handleOpenPopup} onConfirm={handleConfirmOrder}/>
        </>

    )
}