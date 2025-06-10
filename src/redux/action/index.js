// For Add Item to Cart
export const addCart = (product) =>{
    return {
        type:"ADDITEM",
        payload:product
    }
}

// For Delete Item to Cart
export const delCart = (product) =>{
    return {
        type:"DELETEITEM",
        payload:product
    }
}

// Clear entire cart
export const clearCart = () => {
  return {
    type: "CLEAR_CART"
  }
}