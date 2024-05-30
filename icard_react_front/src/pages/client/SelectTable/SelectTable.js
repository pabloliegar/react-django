import React,{useState} from 'react'
import {Form,Button} from "semantic-ui-react"
import "./SelectTable.scss"
import {useTables} from "../../../hooks"
import {useNavigate} from "react-router-dom"
export  function SelectTable(props) {
    let navigate= useNavigate()
    
    const [tablenum,setTableNum]=useState(null)
    const [error,setError]=useState(null)

    const {isExistTable} =useTables()


    const onSubmit = async() =>{
        setError(null)
        if(!tablenum){
            setError("No has introducido una mesa")
        }else{
            console.log("entrando")
            const exist = await isExistTable(tablenum)
            if(exist) navigate(`/client/${tablenum}`)
            else setError("el numero de la mesa no exite")
        }
    }

  return (
    <div className='select-table'>
        <div className='select-table__content'>
            <h1>Bienvenido</h1>
            <h2>introduce el numero de la mesa</h2>

            <Form onSubmit={onSubmit}>
                <Form.Input placeholder="Ejemplo 135, 758" type='number' onChange={(_,data)=>setTableNum(data.value)}></Form.Input>
                <Button primary fluid>Entrar</Button>
            </Form>
            <p className='select-table__content-error'>{error}</p>
        </div>
      
    </div>
  )
}
