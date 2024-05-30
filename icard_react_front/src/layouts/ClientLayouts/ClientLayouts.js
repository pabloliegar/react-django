import React,{ useEffect} from 'react'
import {useTables} from "../../hooks"
import "./ClientLayouts.scss"
import {useParams ,useNavigate,Link} from "react-router-dom"
import {Container,Icon,Button} from "semantic-ui-react"
export  function ClientLayouts(props) {
    const { children} = props;
    const {isExistTable} = useTables()
    const {tablenum}=useParams()
    const navigate = useNavigate()
   useEffect(()=>{
      (async()=>{
        const exict = await isExistTable(tablenum)
        if(!exict) closeTable()
      })()
   },[tablenum])

   const closeTable = () =>{
    navigate("/")
   }
   const goToCar = ()=> {
    navigate(`/client/${tablenum}/cart`)
   }
   const goToOrder = ()=> {
    navigate(`/client/${tablenum}/orders`)
   }
  return (
    <div className='client-layout-bg'>
      <Container className='client-layout'>
        <div className='client-layout__header'>
          <Link to={`/client/${tablenum}`}>Icard</Link>
          <span>mesa {tablenum}</span>
          <div>
            <Button icon onClick={goToCar}>
              <Icon name='shop'/>
            </Button>
            <Button icon onClick={goToOrder}>
              <Icon name='list'/>
            </Button>
            <Button icon onClick={closeTable}>
              <Icon name='sign-out'/>
            </Button>
          </div>
        </div>

        <div className='client-layout__content'> {children}</div>
      </Container>
     
    </div>
  )
}
