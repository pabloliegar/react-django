import React,{useEffect ,useState} from 'react'
import {Loader} from "semantic-ui-react"
import {HeaderPage} from "../../components/Admin/HeaderPage/HeaderPage"
import {TableCategoryAdmin,AddEditCategoryForm} from "../../components/Admin"
import {useCategory} from "../../hooks"
import {ModalBasic} from "../../components/Common"
export  function CategoriesAdmin() {
   const [showModal,setShowModal]=useState(false)
   const [tittleModal,setTittleModal]=useState(null)
   const [contentModal,setContentModal]=useState(null)
    const {loading,categories,getCategories,deleteCategory} = useCategory()
    const [refech,setRefech] = useState(false)
    // eslint-disable-next-line
    useEffect(()=>{getCategories()},[refech]);
    const openCloseModal = () => setShowModal((prev)=>!prev)
    const onRefech = () => setRefech((prev)=>!prev)
    const addCategory = () => {
      setTittleModal("nueva Categoria")
      setContentModal(<AddEditCategoryForm onClose={openCloseModal} onRefech={onRefech}/>)
      openCloseModal()
    }
    const updateCategory = (data) =>{
      setTittleModal("Actualizar categoria");
      setContentModal(<AddEditCategoryForm onClose={openCloseModal} onRefech={onRefech} category={data} />)
      openCloseModal()
    }
    const onDeleteCategory= async(data)=>{
      const result =window.confirm(`¿Eliminar categoria ${data.title}?`);
      if(result){
        try {
          await deleteCategory(data.id)
       onRefech();
        } catch (error) {
          console.log(error)
        }
       
      }
    }
  return (
    <>
      <HeaderPage title='Categorias' btnTitle='Nueva Categoria' btnClick={addCategory}/>
      {loading ? (
        <Loader active inline='centered'>
            Cargando...
        </Loader>
      ):(
        <TableCategoryAdmin
          categories={categories} updateCategory={updateCategory} onDeleteCategory={onDeleteCategory}
        />
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
