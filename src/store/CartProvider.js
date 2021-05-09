import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedTotalAmount = state.totalAmount + action.item.price;
        const existingCartItemIdx = state.items.findIndex(item => {
            return item.id === action.item.id
        });
        const existingCartItem = state.items[existingCartItemIdx];

        let updatedItems;
        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + 1
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIdx] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }

    }
    if (action.type === 'REMOVE') {
        const existingCartItemIdx = state.items.findIndex(item => {
            return item.id === action.id
        });

        const existingCartItem = state.items[existingCartItemIdx];
        const updatedTotalAmount = state.totalAmount - existingCartItem.price;
        let updatedItems;
        if (existingCartItem.amount === 1) {
            updatedItems = state.items.filter(item => {
                return item.id !== action.id;
            });
        } else {
            const updatedItem = { ...existingCartItem, amount: existingCartItem.amount - 1 };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIdx] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    if(action.type==='CLEAR'){
        return defaultCartState;
    }
    return defaultCartState;
}

const CartProvider = (props) => {
    const [cartState, dispatchAction] = useReducer(cartReducer, defaultCartState);

    const addItemHandler = item => {
        dispatchAction({ type: 'ADD', item: item });
    };
    const removeItemHandler = id => {
        dispatchAction({ type: 'REMOVE', id: id });
    };
    const clearCartHandler = ()=>{
        dispatchAction({ type: 'CLEAR'});
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: { addItemHandler },
        removeItem: { removeItemHandler },
        clearCart: {clearCartHandler}
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider;