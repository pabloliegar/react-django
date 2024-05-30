import React,{useEffect,useState} from 'react'
import {useParams} from "react-router-dom"
import {useOrder,useTables,usePayment} from '../../hooks'
import {Loader} from "semantic-ui-react"
import {HeaderPage,ListOrder,AddOrdersForm,PaymentsDetails} from "../../components/Admin"
import _,{forEach,size} from 'lodash'
import {ModalBasic} from "../../components/Common"


export  function TablesDatailsAdmin() {
  const [reloadOrder,setreloadOrder]= useState(false)
  const [paymentData,setpaymentData]= useState(null)
  const [showModal, setShowModal] =useState(false)
 const {createPayment,getPaymentByTable} = usePayment()
  const {loading,orders,getOrderByTable,addPaymentToOrder} =useOrder()
  const {id} = useParams()
  const {table,getTable} =useTables()
useEffect(()=>{
  getOrderByTable(id, _,"ordering=-status,created_at")
  // eslint-disable-next-line
},[id,reloadOrder])
useEffect(()=>{
  getTable(id)
  // eslint-disable-next-line
},[id])

useEffect(()=>{
  (async()=>{
    const response = await getPaymentByTable(id)
    
    if (size(response)>0) setpaymentData(response[0]);
  })()
  // eslint-disable-next-line
},[reloadOrder])
const onreloadOrder= () => setreloadOrder((prev)=>!prev)
const openCloseModal = () => setShowModal((prev)=>!prev)
const onCreatePayment = async () =>{
  const result = window.confirm('¿Estas seguro de crear la cuenta?');

  if (result){
    let totalPayment=0
    forEach(orders,(order)=>{
      totalPayment+=Number(order.product_data.price)
    })
    const resultpaymentType = window.confirm('Pago con targeta pulsa Ok con efectivo cancelar');

    const paymentData={
      table:id,
      totalPayment:totalPayment.toFixed(2),
      paymentType:resultpaymentType ? "CARD":"CASH",
      statusPayment:'PENDING',
    }
    const payment= await createPayment(paymentData)

    for await (const order of orders) {
      await addPaymentToOrder(order.id,payment.id)
      
    }
    onreloadOrder()
  }
}
  return (
    <>

<HeaderPage title={`Mesa ${table?.number || ""} `}  btnTitle={paymentData ? "ver cuenta":"añadir pedido"}  btnClick={openCloseModal} btnTitleTwo={!paymentData ? "Generar cuenta" :null} btnClickTwo={onCreatePayment} />
{loading ? (
        <Loader active inline='centered'>
            Cargando...
        </Loader>
      ):(
        
        <ListOrder orders={orders} onreloadOrder={onreloadOrder} />
         
      )}
      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title="generar pedido"
        
      >
      {paymentData ? (
        <PaymentsDetails paymentData={paymentData} orders={orders} openCloseModal={openCloseModal} onreloadOrder={onreloadOrder}/>
      ):(
        <AddOrdersForm idTable ={id} openCloseModal={openCloseModal} onreloadOrder={onreloadOrder} />
      )}
         </ModalBasic>
    
    </>
  )
}
