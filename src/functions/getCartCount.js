const getCartCount = (cart, action) => {
    let count = 0;
    cart.forEach(item => count += item.quantity);
    if(action){
        count += action.quantity
    }
    return count;
}

export default getCartCount;