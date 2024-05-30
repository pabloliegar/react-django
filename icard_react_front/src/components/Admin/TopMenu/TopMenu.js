import React from 'react'
import {Icon,Menu} from "semantic-ui-react"
import "./TopMenu.scss"
import {useAuth} from "../../../hooks" 
export  function TopMenu() {
   
    const {auth, logout} = useAuth()
 
    const renderName = () => {
        if(auth.me?.first_name && auth.me?.last_name){
            return `${auth.me.first_name} ${auth.me.last_name}`
        }
        return auth.me?.email
    }
    console.log(renderName())
  return (
   <Menu fixed='top' className='top-menu-admin'>
    <Menu.Item className='top-menu-admin__logo'>
        <p>iCarD admin</p>
    </Menu.Item>
    <Menu.Menu position='right'>
        <Menu.Item>Hola, {renderName()}</Menu.Item>
        <Menu.Item onClick={logout}>
            <Icon name='sign-out'></Icon>
        </Menu.Item>
    </Menu.Menu>
   </Menu>
  )
}
