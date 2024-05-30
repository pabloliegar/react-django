import React,{useEffect} from 'react'
import {Loader} from "semantic-ui-react"
import {useTables} from "../../hooks"
import {HeaderPage,TablesListAdmin} from "../../components/Admin"
export  function OrdersAdmin() {
  const {loading,tables,getTables}=useTables()
  // eslint-disable-next-line
  useEffect(()=>{getTables()},[]);
  return (
    <>
     <HeaderPage title="Restaurantes"/>
     {loading ? (
        <Loader active inline='centered'>
            Cargando...
        </Loader>
      ):(
        
       <TablesListAdmin tables={tables}/>
        
      )}
    </>
  )
}
