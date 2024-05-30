import React, {useEffect ,useState} from 'react'
import {HeaderPage} from "../../components/Admin"
import {TableUser,AddEditUserForm} from "../../pages/admin"
import {useUser} from "../../hooks"
import {ModalBasic} from "../../components/Common"
import {Loader} from "semantic-ui-react"

export  function UserAdmin() {
  const {loading,users,getUsers,deleteUser} = useUser();
  const [titleModal, setTitleModal] =useState(null)
  const [showModal, setShowModal] =useState(false)
  const [contentModal, setContentModal] =useState(null)
  const [refech,setRefech] = useState(false)

  // eslint-disable-next-line
  useEffect(()=>{ getUsers()}, [refech])  ;
  const openCloseModal=() => setShowModal((prev)=>!prev)
  const onRefech = () => setRefech((prev)=>!prev)
  const addUser =() =>{
    setTitleModal("Nuevo Usuario");
    setContentModal(<AddEditUserForm onClose={openCloseModal} onRefech={onRefech} />)
    openCloseModal();
  }
  const updateUser=(data)=>{
    setTitleModal("Actualizar Usuario");
    setContentModal(<AddEditUserForm user={data} onClose={openCloseModal} onRefech={onRefech} />)
    openCloseModal();
   
    
  }
  const onDeleteUser = async (data) => {
    
    const result =window.confirm(`¿Eliminar Usuario ${data.email}?`);

    if(result){
      try {
        await deleteUser(data.id)
     onRefech();
      } catch (error) {
        console.log(error)
      }
     
    }
  }
  return (
    <div>
    <HeaderPage title="Usuarios" btnTitle="Nuevo usuario" btnClick={addUser} />
      {loading ?(
        <Loader active inline='centered'>
          Cargando......
        </Loader>
      ): (
        <TableUser users={users} updateUser={updateUser} onDeleteUser={onDeleteUser} />
      )}
      <ModalBasic show={showModal} onClose={openCloseModal} title={titleModal} children={contentModal} />
    </div>
  )
}
