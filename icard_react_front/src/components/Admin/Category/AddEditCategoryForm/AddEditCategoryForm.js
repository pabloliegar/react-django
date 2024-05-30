import React,{useState,useCallback} from 'react'
import {Form,Image,Button} from "semantic-ui-react"
import "./AddEditCategoryForm.scss"
import {useDropzone} from "react-dropzone"
import {useFormik} from "formik"
import * as Yup from "yup" 
import {useCategory} from "../../../../hooks"
export  function AddEditCategoryForm(props) {
  const {onClose,onRefech,category}= props
  const [previewImage,setPreviewImage]= useState(category?.image || null)
  const {addCategory,updateCategory} = useCategory()
  const formik =useFormik({
    initialValues: initialValues(category),
    validationSchema: Yup.object(category ? updateSchema() : newSchema()),
    validateOnChange:false,
    onSubmit:async(formValue)=>{
      try {
        if (category) await  updateCategory(category.id,formValue )
        else await addCategory(formValue)
        
        onRefech()
        onClose()
        console.log(formValue)
      } catch (error) {
        console.error(error)
      }
        
    }
  })
  const onDrop= useCallback(async(acceptedFile)=>{
    const file = acceptedFile[0]
    await formik.setFieldValue('image',file)
    setPreviewImage(URL.createObjectURL(file))
      console.log(file)
      // eslint-disable-next-line
  },[])
  const {getRootProps,getInputProps} = useDropzone({
    accept:'image/jpeg, image/png',
    noKeyboard:true,
    multiple:false,
    onDrop

  })
  return (
   <Form className='add-edit-category-form' onSubmit={formik.handleSubmit}>
       <Form.Input name="title" placeholder="nombre de la categoria" value={formik.values.title} onChange={formik.handleChange} error={formik.errors.title}/> 
        <Button type='button' fluid {...getRootProps()} color={formik.errors.image && "red"} > {previewImage ? "Cambiar imagen" : "Subir imagen"} </Button>
        <input{...getInputProps()}/>
        <Image fluid src={previewImage}/>
        <Button type='submit' content={category ? "actualizar" : "Crear"} primary fluid />
   </Form>
  )
}

function initialValues(data){
  return{
    title:data?.title || "",
    image:"",
  }
}
function newSchema(){
  return{
    title:Yup.string().required(true),
    image:Yup.string().required(true),
  }
}
function updateSchema(){
  return{
    title:Yup.string().required(true),
    image:Yup.string()
  }
}