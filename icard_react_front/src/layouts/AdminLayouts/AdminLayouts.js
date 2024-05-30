import React from 'react'
import "./AdminLayouts.scss"
import {useAuth} from "../../hooks"

import {TopMenu,LoginAdmin} from "../../components/Admin"
import { SideMenu } from "../../components/Admin/SideMenu/SideMenu"
export  function AdminLayouts(props) {
    const { children} = props;
    const { auth } = useAuth(); 
   
    if (!auth) return <LoginAdmin/>
  return (
    <div className='admin-layout'>
      <div className='admin-layout__menu'>
      <TopMenu/>
        <div className='admin-layout__main-content'>
          <SideMenu>{children}</SideMenu>
        </div>
      </div>
      
    </div>
  )
}
