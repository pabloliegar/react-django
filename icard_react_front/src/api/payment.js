import {BASE_API ,paymentStatus} from "../utils/constant"




export async function createPaymentData(paymentdata){
    try {
        const url = `${BASE_API}/api/payments/`;
        const params ={
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                
            },
            body :JSON.stringify(paymentdata),
        }
        const response =await fetch(url,params)
        const result= await response.json();
        return result
    } catch (error) {
        throw error
    }
}


export async function getPaymentByTableApi(idTable){
    try {
        const filter = `table=${idTable}`
        const statusfilter =`statusPayment=${paymentStatus.PENDING}`
        const url = `${BASE_API}/api/payments/?${filter}&${statusfilter}`;
        const params ={
            headers:{
                "Content-Type": "application/json",
                
            },
           
        }
        const response =await fetch(url,params)
        const result= await response.json();
        return result
    } catch (error) {
        throw error
    }
}


export async function closePaymentApi(idPayment){
    try {
        const url = `${BASE_API}/api/payments/${idPayment}/`;
        const params ={
            method:"PATCH",
            headers:{
                "Content-Type": "application/json",
                
            },
            body:JSON.stringify({
                statusPayment:paymentStatus.PAID
            })
           
        }
        await fetch(url,params)
        
    } catch (error) {
        throw error
    }
}
export async function getPaymentsApi(){
    try {
        const paymentFilter=`statusPayment=${paymentStatus.PAID}`
        const orderingFilter ='ordering=created_at'

        const url = `${BASE_API}/api/payments/?${paymentFilter}&${orderingFilter}`;
       
            const response = await fetch(url)
            const result = await response.json()
            return result
    } catch (error) {
        throw error 
    }
}