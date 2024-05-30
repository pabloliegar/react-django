import routesAdmin from "./routes.admin";
import routesClient from "./routes.client";
import {Error404} from "../pages"
import {Basic} from "../layouts"
const routes = [...routesAdmin,...routesClient, {
    path:"*",
    layout: Basic,
    component : Error404  ,
    
}]
export default routes