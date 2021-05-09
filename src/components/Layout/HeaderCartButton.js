import { useContext, useEffect, useState } from 'react';
import CartIcon from './CartIcon.js';
import classes from './HeaderCartButton.module.css';
import cartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {
    const [isBtnHighlighted, setIsBtnHighlighted] = useState(false);
    const cartCtx = useContext(cartContext);
    const { items } = cartCtx;
    const countCart = items.reduce((currentCount, ind) => {
        return currentCount + ind.amount;
    }, 0);

    const btnClass = `${classes.button} ${isBtnHighlighted ? classes.bump : ''}`;
    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setIsBtnHighlighted(true);
        const timer = setTimeout(() => {
            setIsBtnHighlighted(false);
        }, 300);
        return () => {
            clearTimeout(timer);
        }
    }, [items]);
    const hasItems = items.length !==0;
    return <button className={btnClass} onClick={props.onShowModal} disabled={!hasItems}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{countCart}</span>
    </button>
}

export default HeaderCartButton;