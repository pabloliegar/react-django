import React,{useEffect,useState } from 'react'
import {Loader} from "semantic-ui-react"
import {HeaderPage,TableProductAdmin} from "../../components/Admin"
import {useProducts} from "../../hooks"
import {ModalBasic} from "../../components/Common"
import {AddEditProductForm} from "../../components/Admin"

export  function ProductAdmin() {
    const [titleModal, setTitleModal] =useState(null)
    const [showModal, setShowModal] =useState(false)
    const [contentModal, setContentModal] =useState(null)
    const [refech,setRefech] = useState(false)
  

   const openCloseModal = () => setShowModal((prev)=>!prev)
   const onRefech = () => setRefech((prev)=>!prev)
   const addProduct = () => {
    setTitleModal("nueva Producto")
    setContentModal(<AddEditProductForm onClose={openCloseModal} onRefech={onRefech}/>)
    openCloseModal()
  }
  const updateProduct = (data) =>{
    setTitleModal("Actualizar producto");
    setContentModal(<AddEditProductForm onClose={openCloseModal} onRefech={onRefech} product={data} />)
    openCloseModal()
  }
  

    const {getProducts,loading,products,deleteProduct} = useProducts()
    const onDeleteProducts= async(data)=>{
        const result =window.confirm(`¿Eliminar categoria ${data.title}?`);
        if(result){
          try {
            await deleteProduct(data.id)
         onRefech();
          } catch (error) {
            console.log(error)
          }
         
        }
      }
     // eslint-disable-next-line
    useEffect(()=>{getProducts()},[refech]);
    
  return (
    <>
      <HeaderPage title="Productos" btnTitle="Nuevo Producto" btnClick={addProduct} />
      {loading ? (
        <Loader active inline='centered'>
            Cargando...
        </Loader>
      ):(
        <TableProductAdmin products={products} updateProduct={updateProduct} onDeleteProducts={onDeleteProducts} />
        
      )}
      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
      />
    </>
  )
}
