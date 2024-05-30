import React from 'react'
import { ToastContainer } from "react-toastify"
//import { Button} from "semantic-ui-react"
import "./app.scss"
import {Navigation} from './routes'
import {AuthProvider} from "./context"
export default function App() {
  return (
   <AuthProvider>
      <Navigation />
      <ToastContainer
        position='bottom-center'
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
       />
      </AuthProvider>
  )
}

