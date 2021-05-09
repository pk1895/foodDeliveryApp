import React from 'react';

const cartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: () => { },
    removeItem: () => { },
    clearCart: () => { }
});

export default cartContext; 