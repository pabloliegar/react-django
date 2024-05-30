import {useState} from "react"
import {getOrdersByTableApi,checkDeliveredOrderApi,addOrderToTableApi,addPaymentToOrderApi,closeOrdersApi,getOrdersByPaymentApi} from "../api/orders"





export function useOrder(){
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(false)
    const [orders,setOrders] = useState(null) 
    



    const getOrderByTable = async(idTable, status, ordering)=>{

        try {
            setLoading(true)
            const response = await getOrdersByTableApi(idTable, status, ordering)
            setLoading(false)
            setOrders(response)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }


    const checkDeliveredOrder = async (idOrder)=>{
        try {
           
            await checkDeliveredOrderApi(idOrder)
        } catch (error) {
            
            setError(error)
        }
    }
    const addOrderToTable = async (idTable,idProduct)=>{
        try {
            await addOrderToTableApi(idTable,idProduct)
        } catch (error) {
            setError(error)
        }

    }
    const addPaymentToOrder =async (idOrder,idPayment)=>{
        try {
            await addPaymentToOrderApi(idOrder,idPayment) 
        } catch (error) {
            setError(error)
        }
    }
    const  closeOrders= async (idOrder)=>{
        try {
            await closeOrdersApi(idOrder)
        } catch (error) {
            setError(error)
        }
    }
    const getOrdersByPayment = async(idPayment)=>{
        try {
            return await getOrdersByPaymentApi(idPayment)
        } catch (error) {
            setError(error)
        }
    }
    return {
        loading,
        error,
        orders,
        getOrderByTable,
        checkDeliveredOrder,
        addOrderToTable,
        addPaymentToOrder,
        closeOrders,
        getOrdersByPayment,
    }
}