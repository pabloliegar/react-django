import React,{useEffect,useState } from 'react'
import {Loader} from "semantic-ui-react"
import {useTables} from "../../hooks"
import {HeaderPage,TableTablesAdmin} from "../../components/Admin"
import {AddEditTablesForm} from "../../components/Admin/Table/AddEditTablesForm"
import {ModalBasic} from "../../components/Common"
export  function TablesAdmin() {
  const [showModal,setShowModal]=useState(false)
  const [tittleModal,setTittleModal]=useState(null)
  const [contentModal,setContentModal]=useState(null)
  const openCloseModal = () => setShowModal((prev)=>!prev)
  const [refech,setRefech] = useState(false)
  const onRefech = () => setRefech((prev)=>!prev)
  // eslint-disable-next-line
const {loading,getTables,tables,deleteTable} = useTables()
// eslint-disable-next-line
useEffect(()=>{getTables()},[refech]);
const addTables = () => {
  setTittleModal("nueva mesa")
  setContentModal(<AddEditTablesForm onClose={openCloseModal} onRefech={onRefech}/>)
  openCloseModal()
}
const updateTable = (data) =>{
  setTittleModal("Actualizar mesa");
  setContentModal(<AddEditTablesForm onClose={openCloseModal} onRefech={onRefech} table={data} />)
  openCloseModal()
}
const onDeleteTable= async(data)=>{
  const result =window.confirm(`¿Eliminar mesa ${data.number}?`);
  if(result){
    try {
      await deleteTable(data.id)
   onRefech();
    } catch (error) {
      console.log(error)
    }
   
  }
}
  return (
    <>
    <HeaderPage title="Mesas" btnTitle="Nueva Mesa" btnClick={addTables}/>
    {loading ? (
        <Loader active inline='centered'>
            Cargando...
        </Loader>
      ):(
        
        <TableTablesAdmin tables={tables} updateTable={updateTable} onDeleteTable={onDeleteTable} />
        
      )}

      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={tittleModal}
        children={contentModal}
      />

    </>
  )
}
