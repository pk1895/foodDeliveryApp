import classes from './MealItem.module.css';
import Input from './Input';
import { useRef } from 'react';
import { useContext } from 'react';
import cartContext from '../../store/cart-context';

const MealItem = (props) => {
    const cartCtx = useContext(cartContext);
    const price = '₹ ' + props.price.toFixed(2);
    const amountRef = useRef();

    const submitHandler = (evt) => {
        evt.preventDefault();
        const enteredAmount = amountRef.current.value;
        const intAmount = +enteredAmount;
        if (enteredAmount) {
            if (enteredAmount.trim().length === 0 || intAmount < 1 || intAmount > 5) {
                return;
            }
        }
        onAddToCart(intAmount);
    }

    const onAddToCart = enteredAmount => {
        cartCtx.addItem.addItemHandler({
            id: props.id,
            name: props.name,
            amount: enteredAmount,
            price: props.price
        });
    }

    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <form className={classes.form} onSubmit={submitHandler}>
                <Input label={"Amount"} ref={amountRef}
                    input={{
                        id: 'amount',
                        type: 'number',
                        min: '1',
                        max: '5',
                        step: '1',
                        defaultValue: '1'
                    }} />
                <button>+ ADD</button>
            </form>
        </li>
    )
};

export default MealItem;