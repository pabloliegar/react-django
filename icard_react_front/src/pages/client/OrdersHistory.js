import React,{useEffect,useState} from 'react'
import {useTables,usePayment,useOrder} from "../../hooks"
import {useParams} from "react-router-dom"
import {OrderHistoryItem} from "../../components/Client"
import _, {map,forEach,size} from "lodash"
import {getOrdersByTableApi} from "../../api/orders"
import {Button} from "semantic-ui-react"
import {ModalConfirm} from "../../components/Common"
export  function OrdersHistory() {
   const [show,setShow]=useState(false)
    const {getTableByNumber} = useTables()
    const {tablenum} =useParams()
    const {addPaymentToOrder} =useOrder()
    const {createPayment,getPaymentByTable}= usePayment()
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tableId,setTableId]=useState(null)
    const [paymentAcount,setpaymentAcount]=useState(false)

    useEffect(() => {
        const fetchTableAndOrders = async () => {
            try {
                console.log('Fetching table data for tablenum:', tablenum);
                const table = await getTableByNumber(tablenum);
                console.log('Table data:', table);
                setTableId(table[0].id)
                if (table && table.length > 0) {
                    const idTableTemp = table[0].id;
                    console.log('Table ID:', idTableTemp);
                    
                    console.log('Fetching orders for table ID:', idTableTemp);
                    await getOrderByTable(idTableTemp, _, "ordering=-status,created_at");
                    
                } else {
                    console.log('No table data found');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                
            } finally {
                setLoading(false);
            }
        
        };

        fetchTableAndOrders();
    }, [tablenum]); 
        const getOrderByTable = async (idTable, status, ordering) => {
        try {
            const response = await getOrdersByTableApi(idTable, status, ordering);
            setOrders(response);
           
        } catch (error) {
            setError(error);
        }
    };

    useEffect(()=>{(async()=>{
        if(tableId){
             const response= await getPaymentByTable(tableId)
             setpaymentAcount(response)

        }
       
    })()},[tableId])


    const onCreatePayment = async (paymentType)=>{
        setShow(false)
        let totalPayment=0
        forEach(orders,(order)=>{
            totalPayment+=Number(order.product_data.price)
        })

        const paymentData={
            table:tableId,
            totalPayment:totalPayment.toFixed(2),
            paymentType,
            statusPayment:"PENDING"
        }

        const payment= await createPayment(paymentData)
        for await (const order of orders) {
            await addPaymentToOrder(order.id,payment.id)
        }
        window.location.reload()
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
        <>
        <h1>Historial de pedidos</h1>
            {size(orders)>0 && (
                <Button primary fluid onClick={()=>size(paymentAcount)===0 && setShow(true)}>
                    {size(paymentAcount)>0 ? (
                        "La cuenta esta pedida "
                    ):(
                        "Pedir la cuenta"
                    )}
                </Button>
            )}
            {map(orders, (order) => (
                <OrderHistoryItem key={order.id} order={order}/>
            ))}
        </>
        <ModalConfirm 
        title="Pagar con tragera o efectivo" 
         show={show} 
         onCloseText="Efectivo"
         onClose={()=>onCreatePayment("CASH")}  
         onConfirmText="Tarjeta"
         onConfirm={()=>onCreatePayment("CARD")}  
        />
        </div>
    );
}
