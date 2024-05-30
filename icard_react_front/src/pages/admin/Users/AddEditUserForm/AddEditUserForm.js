import React from 'react'
import "./AddEditUserForm.scss"
import {Form,Button,Checkbox} from "semantic-ui-react"
import {useFormik} from "formik"
import * as Yup from "yup"
import {useUser} from "../../../../hooks"
export  function AddEditUserForm(props) {
    const {onClose,onRefech,user} = props
    const {addUser,updateUser} = useUser()
    const formik= useFormik({
        initialValues: initialValues(user),
        validationSchema:Yup.object(user ? updateSchame() : newSchame()),
        validateOnChange:false,
        onSubmit: async (formValue)=>{
           try {
            if(user) await updateUser(user.id,formValue);
            else await addUser(formValue);
            onRefech()
            onClose()
           } catch (error) {
            console.error(error)
           }
        }
    })
  return (
    <Form className='add-edit-user-form' onSubmit={formik.handleSubmit}>
        <Form.Input value={formik.values.username} onChange={formik.handleChange} error={formik.errors.username} name="username" placeholder="nombre del usuario"/>
        <Form.Input value={formik.values.email} onChange={formik.handleChange} error={formik.errors.email} name="email" placeholder="correo electronico"/>
        <Form.Input value={formik.values.first_name} onChange={formik.handleChange} error={formik.errors.first_name} name="first_name" placeholder="nombre"/>
        <Form.Input value={formik.values.last_name} onChange={formik.handleChange} error={formik.errors.last_name} name="last_name" placeholder="apellidos"/>
        <Form.Input value={formik.values.password} onChange={formik.handleChange} error={formik.errors.password} name="password" type='password' placeholder="contraseña" />

        <div className='add-edit-user-form__active'>
            <Checkbox toggle checked={formik.values.is_active} onChange={(_,data)=>{
                formik.setFieldValue('is_active',data.checked)
            }}/>Usuario Activo
            
        </div>
        <div className='add-edit-user-form__staff'>
            <Checkbox toggle checked={formik.values.is_staff} onChange={(_,data)=>{
                formik.setFieldValue('is_staff',data.checked)}}/>Usuario Addministrador
            
        </div>
        <Button type='submit' content={user ? "Actualizar" : "Crear"} primary fluid />
    </Form>
  )
}


function initialValues(data){
    return{
        username: data?.username||"",
        email:data?.email||"",
        first_name:data?.first_name||"",
        last_name:data?.last_name||"",
        is_active:data?.is_active ? true :false,
        is_staff:data?.is_staff ? true :false,
        password:""


    }
}
function newSchame(){
    return{
        username: Yup.string().required(true),
        email: Yup.string().email(true).required(true),
        first_name: Yup.string(),
        last_name: Yup.string(),
        is_active: Yup.bool().required(true),
        is_staff: Yup.bool().required(true),
        password: Yup.string().required(true)


    }
}
function updateSchame(){
    return{
        username: Yup.string().required(true),
        email: Yup.string().email(true).required(true),
        first_name: Yup.string(),
        last_name: Yup.string(),
        is_active: Yup.bool().required(true),
        is_staff: Yup.bool().required(true),
        password: Yup.string()


    }
}