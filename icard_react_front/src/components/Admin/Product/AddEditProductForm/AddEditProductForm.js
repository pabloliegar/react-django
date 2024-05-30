import React,{useEffect,useState,useCallback} from 'react'
import {Form,Image,Button,Dropdown,Checkbox} from "semantic-ui-react"
import {useCategory,useProducts} from "../../../../hooks"
import {useFormik} from "formik"
import * as Yup from "yup" 
import {useDropzone} from "react-dropzone"
import "./AddEditProductForm.scss"
import { map } from 'lodash'
export  function AddEditProductForm(props) {
    const {product,onClose,onRefech} = props
    const {addProducts,updateProduct} = useProducts()
    const [categoriesFormat,setCategoriesFormat]=useState([])
    const [previewImage,setPreviewImage]= useState(product?.image || null)
    const {categories,getCategories}=useCategory()
    
    // eslint-disable-next-line
    useEffect(()=>{getCategories()},[]);

    useEffect(()=>{
        setCategoriesFormat(formatDropdownData(categories))
    },[categories]);
    const formik =useFormik({
        initialValues: initialValues(product),
        validationSchema: Yup.object(product ? updateSchema : newSchema()),
        validateOnChange:false,
        onSubmit: async(formValue)=>{
            if(product) updateProduct(product.id,formValue);
            else await addProducts(formValue)
            onRefech()
            onClose()
        }
      })
    const onDrop= useCallback(async(acceptedFile)=>{
        const file = acceptedFile[0]
        await formik.setFieldValue('image',file)
        setPreviewImage(URL.createObjectURL(file))
         
           // eslint-disable-next-line
      },[])
      const {getRootProps,getInputProps} = useDropzone({
        accept:'image/jpeg, image/png',
        noKeyboard:true,
        multiple:false,
        onDrop
    
      })

  return (
    <Form className='admin-edit-product-form' onSubmit={formik.handleSubmit}>
        <Form.Input name='title' placeholder="nombre del producto" value={formik.values.title} onChange={formik.handleChange} error={formik.errors.title}/>
        <Form.Input type='number' name='price' placeholder="precio" value={formik.values.price} onChange={formik.handleChange} error={formik.errors.price}/>
        <Dropdown  placeholder="categoria" fluid selection search options={categoriesFormat} value={formik.values.category} onChange={(_,data)=>formik.setFieldValue('category',data.value)} error={formik.errors.category} />
        <div className='admin-edit-product-form__active'>
            <Checkbox toggle checked={formik.values.active} onChange={(_,data)=>{
                formik.setFieldValue('active',data.checked)
            }}/>
            Producto activo
        </div>




        <Button type='button' fluid {...getRootProps()} color={formik.errors.image && "red"} > {previewImage ? "Cambiar imagen" : "Subir imagen"}</Button>
        <input{...getInputProps()}/>
        <Image fluid src={previewImage}/>
        <Button type='submit' primary fluid content={product ? "actualizar" : "Crear"}></Button>
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


function initialValues(data){
    return{
      title:data?.title || "",
      price: data?.price || "",
      category: data?.category || "",
      active: data?.active ? true :false,
      image:"",
    }
  }

  function newSchema(){
    return{
        title: Yup.string().required(true),
        price: Yup.number().required(true),
        category: Yup.number().required(true),
        active: Yup.boolean().required(true),
        image:Yup.string().required(true),
    }
  }

  function updateSchema(){
    return{
        title: Yup.string().required(true),
        price: Yup.number().required(true),
        category: Yup.number().required(true),
        active: Yup.boolean().required(true),
        image:Yup.string()
    }
}  