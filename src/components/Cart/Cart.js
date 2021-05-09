import classes from './Cart.module.css';
import Modal from '../Modal/Modal';
import React, { Fragment, useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const cartContext = useContext(CartContext);
    const totalAmt = '₹ ' + cartContext.totalAmount.toFixed(2);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const onAddHanadler = item => {
        cartContext.addItem.addItemHandler(item);
    }
    const onRemoveHanadler = id => {
        cartContext.removeItem.removeItemHandler(id);
        setIsCheckout(false);
    }

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const postData = async (userData) => {
        setIsSubmitting(true);
        const response = await fetch('https://food-delivery-fa2bb-default-rtdb.firebaseio.com/Orders.json', {
            method: 'POST',
            body: JSON.stringify({
                UserData: userData,
                OrderItems: cartContext.items
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        setIsSubmitting(false);
        setIsSubmitted(true);
        cartContext.clearCart.clearCartHandler();
        console.log(data);
    }

    const cartItems = <ul className={classes['cart-items']}>
            {cartContext.items.map(el => {
                return (
                    <li className={classes['cart-item']}>
                        <div>
                            <h2>{el.name}</h2>
                            <div className={classes.summary}>
                                <span className={classes.price}>{el.price}</span>
                                <span className={classes.amount}>X {el.amount}</span>
                            </div>
                        </div>
                        <div className={classes.actions}>
                            <button onClick={onAddHanadler.bind(null, el)}>+</button>
                            <button onClick={onRemoveHanadler.bind(null, el.id)}>-</button>
                        </div>
                    </li>
                )
            })}
        </ul>;
    const hasItems = cartContext.items.length > 0;

    const actionsBtn = <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onCancelModal}>Cancel</button>
            {hasItems && <button className={classes.button} onClick={orderHandler}> Confirm</button>}
        </div>;

    const orderSubmitted = <Fragment>
        <p>Order Completed!!!</p>
        <div className={classes.actions}>
        <button className={classes.button} onClick={props.onCancelModal}>OK</button>
        </div>
        </Fragment>;

    const cartContent = <Fragment>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmt}</span>
        </div>
        {isCheckout &&
            <Checkout
                onCancel={props.onCancelModal}
                onPostFormData={postData} />}
        {!isCheckout && actionsBtn}
    </Fragment>;

    return (
        <Modal onCancel={props.onCancelModal}>
            {!isSubmitting && !isSubmitted && cartContent}
            {isSubmitting && !isSubmitted && <p>Sending Order Data...</p>}
            {!isSubmitting && isSubmitted && orderSubmitted}
        </Modal>
    );
};

export default Cart;