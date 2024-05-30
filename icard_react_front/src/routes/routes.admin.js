import {AdminLayouts} from "../layouts"
import {OrdersAdmin, UserAdmin,CategoriesAdmin,ProductAdmin,TablesAdmin,TablesDatailsAdmin,paymentsHistory} from "../pages/admin"
const routesAdmin=[
{
    path: "/admin",
    layout: AdminLayouts,
    component: OrdersAdmin,
},{
    path:"/admin/users",
    layout: AdminLayouts,
    component: UserAdmin,
},{
    path:"/admin/categories",
    layout: AdminLayouts,
    component: CategoriesAdmin

}
,{
    path:"/admin/products",
    layout: AdminLayouts,
    component: ProductAdmin

},{
    path:"/admin/tables",
    layout: AdminLayouts,
    component: TablesAdmin

}
,{
    path:"/admin/table/:id",
    layout: AdminLayouts,
    component: TablesDatailsAdmin

}
,{
    path:"/admin/payments-history",
    layout: AdminLayouts,
    component: paymentsHistory

}
]
export default routesAdmin