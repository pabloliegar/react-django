import React from 'react'
import "./AddEditTablesForm.scss"
import {Form,Button} from "semantic-ui-react"
import {useFormik} from "formik"
import * as Yup from "yup" 
import {useTables} from "../../../../hooks"
export  function AddEditTablesForm(props) {
    const {onClose,onRefech,table} = props
    const {addTable,updateTable} = useTables()
    const formik =useFormik({
        initialValues: initialValues(table),
        validationSchema: Yup.object(newSchema()),
        validateOnChange:false,
        onSubmit: async(formValue)=>{
            if(table) await updateTable(table.id,formValue)
            else await addTable(formValue)
            onRefech()
            onClose()
        }
      })

  return (
    <Form className='admin-edit-product-form' onSubmit={formik.handleSubmit}>
    <Form.Input name='number' type='number' placeholder="number de la mesa" value={formik.values.number} onChange={formik.handleChange} error={formik.errors.number}/>

    <Button type='submit' primary fluid content={table ? "actualizar" : "Crear"}></Button>
</Form>
  )
}
function initialValues(table){
    return{
      number:table?.number || "",
     
    }
  }

  function newSchema(){
    return{
        number: Yup.number().required(true),
    }
  }