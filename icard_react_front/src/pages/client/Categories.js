import React,{useEffect} from 'react'
import{useCategory}from "../../hooks"
import {ListCategories} from "../../components/Client"
export  function Categories() {
  const {loading,categories,getCategories} = useCategory()

  useEffect(()=>{getCategories()},[])

  return (
    <div>
      <h3 > categorias</h3>
      {loading ? <p>Cargando</p> : <ListCategories categories={categories} />}
    </div>
  )
}
