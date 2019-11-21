const getTotal = (cart) => {
    const obj = {
        total: 0
    }
    cart.forEach(item => {
        obj.total += (item.quantity * item.price);
    })

    return obj.total;
};

export default getTotal;