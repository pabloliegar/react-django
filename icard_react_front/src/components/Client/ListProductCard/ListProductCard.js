import React,{useEffect,useState} from 'react'
import {Button,Icon,Image} from "semantic-ui-react"
import {map,forEach} from "lodash"

import {useParams,useNavigate} from "react-router-dom"
import {removeProductCartApi,clearProductCardApi} from "../../../api/cart"
import {useOrder,useTables} from "../../../hooks"
import "./ListProductCard.scss"
export  function ListProductCard(props) {
    const {products,onReload} = props
    const {addOrderToTable} =useOrder()
    const {getTableByNumber} =useTables()
    const {tablenum} = useParams()
    const navigate = useNavigate()

    const [total,setTotal]=useState(0)
    useEffect(()=>{
        let totalTemp = 0;
        forEach(products,(product)=>{
            totalTemp+=Number(product.price)
        })
        setTotal(totalTemp.toFixed(2))
    },[products])
    const removeProduct= (index)=>{
        removeProductCartApi(index)
        onReload()
    }

    const createOoder = async()=>{

        const tableData=await getTableByNumber(tablenum)
        const idTable = tableData[0].id
        for await (const product of products) {
            await addOrderToTable(idTable,product.id)
        }
        clearProductCardApi()
        navigate(`/client/${tablenum}/orders`)
    }
  return (
    <div className='list-product-cart'> 
      {map(products,(product,index)=>(
        <div key={index} className='list-product-cart__product'>
            <div>
                <Image src={product.image} avatar />
                <span>{product.title}</span>
            </div>
            <span>{product.price}$ </span>
            <Icon name='close' onClick={()=> removeProduct(index)} />
        </div>
      ))}
      <Button primary fluid onClick={()=>createOoder()}>Realizar pedido ({total}$)</Button>
    </div>
  )
}
