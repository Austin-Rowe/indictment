const editCart = (cart, action) => {
    let matchingKey;
    if(action.props.id === 16){
        matchingKey = cart.findIndex( item => item.props.id === action.props.id); 
    } else {
       matchingKey = cart.findIndex( item => item.props.id === action.props.id && item.size === action.size && item.neck === action.props.neck);
    }

    let copiedCart = cart.slice();

    if(matchingKey >= 0){
        if(action.type === "UPDATE_CART"){
            if(action.quantity === 0 ){
                copiedCart.splice(matchingKey, 1);
            } else {
                copiedCart[matchingKey].quantity = action.quantity;
            }
        } else {
            copiedCart[matchingKey].quantity += action.quantity;
        }
    } else {
        copiedCart.push(action);
    }

    return copiedCart;
}
  
export default editCart;