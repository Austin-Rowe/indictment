const toggleCart = (cart, cartOpened, action) => {
    if(cartOpened && cart.length === 0){
        return false;
    } else if(!cartOpened && cart.length === 0){
        return false;
    } else if(action.type === "UPDATE_CART"){
        if(cart.length === 1 && action.quantity === 0){
            return false;
        } else {
            return true;
        }
    } else {
        return !cartOpened;
    }
}

export default toggleCart;