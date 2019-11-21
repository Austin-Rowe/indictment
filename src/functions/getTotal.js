const getTotal = (cart, action) => {
    let obj = {
        total: 0
    }
    cart.forEach(item => {
        obj.total += (item.price * item.quantity)
    });

    if(action){
        obj.total += (action.price * action.quantity);
    };
    return obj.total;
}

export default getTotal;