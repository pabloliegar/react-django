import {useState} from "react"
import {getProductsApi,addProductApi,updateProductApi,deleteProductApi,getProductByIdApi,getProductByCategoryApi} from "../api/product"
import {useAuth} from "./"


export function useProducts(){
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(false)
    const [products,setProducts] = useState(null) 
    const {auth} = useAuth()



    const getProducts = async () => {
        try {
            setLoading(true)
            const response = await getProductsApi()
            setLoading(false)
            setProducts(response)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
        
            };
        const addProducts= async(data)=> {
        try {
            setLoading(true)
            await addProductApi(data,auth.token)
            setLoading(false)
           
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }

    const updateProduct= async(id,data)=>{
        try {
            setLoading(true)
            await updateProductApi(id,data,auth.token)
            setLoading(false) 
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }
    const deleteProduct = async(id)=>{
        try {
            setLoading(true)
            await deleteProductApi(id,auth.token)
           setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }
    
    const getProductById = async(id)=>{
        try {
        const product=    await  getProductByIdApi(id)
        return product
        } catch (error) {
            setError(error)
        }
    }
    const getProductByCategory = async(id)=>{
        try {
            setLoading(true)
        const product= await getProductByCategoryApi(id)
        setLoading(false)
        setProducts(product)
        return product
        } catch (error) {
            setLoading(false)
            setError(error)
        }}
    

            return{
                loading,
                products,
                error,
                getProducts,
                addProducts,
                updateProduct,
                deleteProduct,
                getProductById,
                getProductByCategory
            }
}