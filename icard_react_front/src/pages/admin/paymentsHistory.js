import React,{useEffect} from 'react'
import {HeaderPage,TablePayments} from "../../components/Admin"
import  {usePayment}  from "../../hooks"
import {Loader} from "semantic-ui-react"

export  function paymentsHistory() {
  // eslint-disable-next-line
  const {payment,loading,getPayments} = usePayment()
  // eslint-disable-next-line
  useEffect(()=>{getPayments()},[])
  console.log(payment);
  return (
    <>
      <HeaderPage title="Historial de pagos"/>
      {loading?(
        <Loader active inline="centered">Cargando</Loader>
      ):(
        <TablePayments payment={payment}/>
      )}

    </>
  )
}
