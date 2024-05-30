const Product_cart= "productCart"

export function getProductCart(){
    const response = localStorage.getItem(Product_cart)
    return JSON.parse(response || "[]")
}

export function addProductCart(id){
    const product= getProductCart()
    product.push(id)
    localStorage.setItem(Product_cart,JSON.stringify(product))
}
export function removeProductCartApi(index){
    const idProduct = getProductCart()
    idProduct.splice(index,1)
    localStorage.setItem(Product_cart,JSON.stringify(idProduct))
}
export function clearProductCardApi(){
    localStorage.removeItem(Product_cart)
}