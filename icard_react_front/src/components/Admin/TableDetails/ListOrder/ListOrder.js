import React from 'react'
import './ListOrder.scss'
import {map} from "lodash"
import {OrderItem} from "../"
export  function ListOrder(props) {

    const {orders,onreloadOrder} = props
  return (
    <div className='list-orders-admin'>
      {map(orders,(order)=>(
        <OrderItem key={order.id} order={order} onreloadOrder={onreloadOrder} />
      ))}
    </div>
  )
}
