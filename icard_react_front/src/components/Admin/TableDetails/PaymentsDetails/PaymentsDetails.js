import React from 'react'
import {Table,Icon,Button} from "semantic-ui-react"
import "./PaymentsDetails.scss"
import {usePayment,useOrder} from "../../../../hooks"

export  function PaymentsDetails(props) {
    const {paymentData,orders,openCloseModal,onreloadOrder} = props
    const {closePayment} = usePayment()
    const {closeOrders} = useOrder()
    const getIconPayment = (key) =>{
      if(key==="CARD") return "credit card outline"
      if(key ==="CASH") return "money bill alternate outline"
      return null
    }
    const onCloseTable = async () =>{
      const result = window.confirm("¿Cerrar mesa para nuevos clientes")
      if(result){
        await closePayment(paymentData.id)
        for await (const order of orders){
          await closeOrders(order.id)
        }
        onreloadOrder()
        openCloseModal()
      }
    }
  return (
    <div className='payment-details'>
      <Table striped>
        <Table.Body>
            <Table.Row>
                <Table.Cell>mesa:</Table.Cell>
                <Table.Cell>{paymentData.table_data.number}</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>total:</Table.Cell>
                <Table.Cell>{paymentData.totalPayment} $</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>metodo de pago:</Table.Cell>
                <Table.Cell>
                  <Icon name={getIconPayment(paymentData.paymentType)}/>
                </Table.Cell>
            </Table.Row>
        </Table.Body>

      </Table>
      <Button primary fluid onClick={onCloseTable}>Marcar como pagodo y cerrar Mesa</Button>
    </div>
  )
}
