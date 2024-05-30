import React,{useState,useEffect} from 'react'
import "./TableAdmin.scss"
import {size} from "lodash"
import classNames from "classnames"
import {Link} from "react-router-dom"
import { Label} from "semantic-ui-react"
import {ReactComponent as IcTable} from "../../../../assets/table.svg"
import { getOrdersByTableApi } from "../../../../api/orders"
import {ORDER_STATUS} from "../../../../utils/constant"
import {usePayment} from "../../../../hooks"
export  function TableAdmin(props) {
  const {table,reload } = props
  const {getPaymentByTable} =usePayment()
  const [orders,setOrders]=useState([])
  const [tableBusy,setTableBusy]=useState(false)
  const [pendingPayment,setpendingPayment]=useState(false)
  useEffect(()=>{(async()=>{
    const response = await getOrdersByTableApi(table.id,ORDER_STATUS.PENDING);
    setOrders(response)
  }
  
// eslint-disable-next-line
  )()},[reload]);


  useEffect(()=>{(async()=>{
    const response = await getPaymentByTable(table.id)
    if(size(response)>0) setpendingPayment(true)
    else setpendingPayment(false)
  }
  
// eslint-disable-next-line
  )()},[reload]);



  useEffect(()=>{(async()=>{
    const response = await getOrdersByTableApi(table.id,ORDER_STATUS.DELIVERED);
    if(size(response)>0) setTableBusy(response)
    else setTableBusy(false)
  }
  
// eslint-disable-next-line
  )()},[reload]);
  return (
    <Link className='table-admin' to={`/admin/table/${table.id}`}>
    {size(orders)>0?(
      <Label circular color='orange'>
        {size(orders)}
      </Label>
    ) : null }

    {pendingPayment && (
      <Label circular color='orange'>
        Cuenta
      </Label>
    )}
      <IcTable className={classNames({
        pending:size(orders)>0,
        busy:tableBusy,
        pendingPayment: pendingPayment,
      })}/>
      <p>Mesa {table.number}</p>
    </Link>
  )
}
