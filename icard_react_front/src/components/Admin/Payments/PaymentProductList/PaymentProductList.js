import React,{useEffect,useState} from 'react'
import "./PaymentProductList.scss"
import {useOrder} from "../../../../hooks"
import {map} from "lodash"
import {Image} from "semantic-ui-react"
export  function PaymentProductList(props) {
    const {payment} = props
    const {getOrdersByPayment} = useOrder()

    const[orders,setOrders]=useState([])
    // eslint-disable-next-line
  useEffect(()=>{(async()=>{
    const response =await getOrdersByPayment(payment.id)
    setOrders(response)
    // eslint-disable-next-line
  })()},[])
  return (
    <div className='payment-product-list'>
      {map(orders,(order)=>(
        <div className='payment-product-list__product' key={order.id}> 
            <div>
            <Image src={order.product_data.image} avatar size='tiny' />
            <span> {order.product_data.title}</span>
      
            <span className='payment-product-list__product-price'>      {order.product_data.price} $</span>
             </div>
        
        </div>
      ))}
    </div>
  )
}
