import React,{useEffect} from 'react'
import {useParams,Link} from "react-router-dom"
import {useProducts} from "../../hooks"
import {ListProducts} from "../../components/Client"
export  function Products() {
    const {tablenum,idCategory} = useParams()
    const {loading,products,getProductByCategory} = useProducts()
   
    // eslint-disable-next-line
    useEffect(()=>{getProductByCategory(idCategory)}, [idCategory])
    
  return (
    <div>
      <Link to={`/client/${tablenum}`}>Volver a categorias</Link>
      {loading ? <p>Cargando.......</p> : <ListProducts products={products} />}
    </div>
  )
}
