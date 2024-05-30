import React,{useState,useEffect} from 'react'
import "./TablesListAdmin.scss"
import { Button, Icon, Checkbox} from "semantic-ui-react"
import {map} from "lodash"

import {TableAdmin} from "../"
export  function TablesListAdmin(props) {
    const {tables}= props
    const[reload,setReload]=useState(false)
    const[autoReload,setAutoReload]=useState(false)
    useEffect(()=>{
      if(autoReload){
        const autoReloadAction=()=>{
          onReload()
          setTimeout(()=>{autoReloadAction()},5000)
        }
        autoReloadAction()
      }
    },[autoReload])
    const onReload= ()=>setReload((prev)=>!prev)
    const onCheckAutoReloas=(check)=>{
      if(check){
        setAutoReload(check)
      }else{
        window.location.reload()
      }
    }
  return (
    <div className='tables-list-admin'>
    <Button primary icon className='tables-list-admin__reload' onClick={onReload}>
        <Icon name='refresh'/>
    </Button>
    <div className='tables-list-admin__reload-toggle'>
        <span>Reload automatico</span>
        <Checkbox checked={autoReload} toggle onChange={(_,data)=>onCheckAutoReloas(data.checked)}/>
    </div>
     {map(tables,(table)=>(
       <TableAdmin key={table.number} table={table} reload={reload} />
     ))}
    </div>
  )
}
