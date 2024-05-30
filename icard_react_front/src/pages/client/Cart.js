import React, { useState, useEffect } from 'react'
import { useProducts } from "../../hooks"
import { getProductCart } from "../../api/cart"
import {size} from "lodash"
import {Link ,useParams} from "react-router-dom"
import {Button} from "semantic-ui-react"
import {ListProductCard} from "../../components/Client"
export function Cart() {
  const { getProductById } = useProducts()
  const [products, setProducts] = useState(null)
  const [reload, setReload] = useState(false)
  const {tablenum} = useParams()
  useEffect(() => {
    (async () => {
      const idProductsCart = getProductCart()
      const productCat = []
      for await (const idProduct of idProductsCart) {
        const response = await getProductById(idProduct)
        productCat.push(response)
      }
      setProducts(productCat)
    })()
  }, [reload])

  const onReload =()=> setReload((prev)=>!prev)
  return (

    <div>
      <h1>Carrito</h1>
      {!products ? (
        <p>Cargando....</p>
      ) : size(products)<1 ? (
        <div style={{textAlign:"center"}}>
        <p>No tienes productos en el carrito</p>
        <Link to={`/client/${tablenum}/orders`}>
          <Button primary>Ver pedidos</Button>
         </Link>
        </div>
      ) : (
        <ListProductCard products={products} onReload={onReload} ></ListProductCard>
      ) }
    </div>
  )
}
