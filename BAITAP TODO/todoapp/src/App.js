import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import PageNotFound from './Page/PageNotFound/PageNotFound';
import MenuTemplate from './template/MenuTemplate';
import { RouteMenu } from "./routes/routes";
function App() {
  const showMenu = (routes) => {
    if(routes && routes.length > 0){
      return routes.map((item, index) =>{
        return (
          <MenuTemplate
          key={index}
          exact={item.exact}
          path={item.path}
          Component={item.component}
          />
        )
      })
    }
  }
  return(
    <BrowserRouter>
    <ToastContainer/>
    <Switch>
      {showMenu(RouteMenu)}
      <Route path="" component={PageNotFound} />
    </Switch>
    </BrowserRouter>
  )
}


export default App;

