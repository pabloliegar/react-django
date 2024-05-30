import {Basic,ClientLayouts} from "../layouts"
import {SelectTable,Categories,Products,Cart,OrdersHistory} from "../pages/client"

const routesClient=[
    {
        path: "/",
        layout: Basic,
        component: SelectTable,
        exact: true,
    },
    {
        path: "/client/:tablenum",
        layout: ClientLayouts,
        component: Categories,
        exact: true,
    },
    
    {
        path: "/client/:tablenum/cart",
        layout: ClientLayouts,
        component: Cart,
        exact: true,
    },
    
    {
        path: "/client/:tablenum/orders",
        layout: ClientLayouts,
        component: OrdersHistory,
        exact: true,
    },
    {
        path: "/client/:tablenum/:idCategory",
        layout: ClientLayouts,
        component: Products,
        exact: true,
    } 
   
]
export default routesClient