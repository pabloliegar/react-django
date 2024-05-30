import React,{useState,useEffect} from 'react'
import {Form,Button,Image,Dropdown} from "semantic-ui-react"
import "./AddOrdersForm.scss"
import {useProducts,useOrder} from "../../../../hooks"
import {map} from "lodash"
import {useFormik} from "formik"
import * as Yup from "yup" 


export  function AddOrdersForm(props) {

const {openCloseModal,idTable,onreloadOrder} = props
const {products,getProducts,getProductById} = useProducts()
const {addOrderToTable} = useOrder()
const [productFormat,setProductFormat]=useState([])
const [productData,setProductData]=useState([])
// eslint-disable-next-line
useEffect(()=>{getProducts()},[])
useEffect(()=>{
    setProductFormat(formatDropdownData(products))
},[products]);
const formik =useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(  newSchema()),
    validateOnChange:false,
    onSubmit: async(formValue)=>{
       for await (const idProduct of formValue.products){

        await addOrderToTable(idTable,idProduct)
       }
       onreloadOrder()
       openCloseModal()
    }
  })
// eslint-disable-next-line
  useEffect(()=>{addProductList()},[formik.values])
const addProductList= async () =>{
    try {
        const productId =formik.values.products
        const arraiTemp= []
        for await (const Idproduct of productId ){
            const response = await getProductById(Idproduct)
            arraiTemp.push(response)
        }

        setProductData(arraiTemp)
    } catch (error) {
        console.log(error);
    }
}


const remove =(index) =>{
    const idProducts = [...formik.values.products]
    idProducts.splice(index,1)
    formik.setFieldValue("products",idProducts)

}
  return (
    <Form className='add-order-form' onSubmit={formik.handleSubmit}>
        <Dropdown placeholder='Productos' fluid selection search options={productFormat} value={null} onChange={(_,data) => formik.setFieldValue("products",[...formik.values.products, data.value])} />

        <div className='add-order-form__list'>
            {map(productData,(product,index)=>(
                <div className='add-order-form__list-product' key={index}> 
                    <div> 
                    <Image src={product.image} avatar size='tiny' />
                        <span>{product.title}</span>
                    </div>
                    <Button type='button' content="eliminar" basic color='red' onClick={()=>remove(index)} />

                </div>
            ))}

        </div>
        <Button type='submit' content="añadir productos a la mesa" primary fluid />

    </Form>
  )
}
function formatDropdownData(data){
    return map(data,(item)=>({
        key: item.id,
        text :item.title,
        value: item.id
    }))
    }

    function initialValues(){
        return{
         products:[]
        }
      }

      function newSchema(){
        return{
            products:Yup.array().required(true)
        }
      }