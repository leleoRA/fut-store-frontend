import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UserContext from './contexts/UserContext';
import { useState } from "react";

import Welcome from "./Welcome.js";
import LogIn from "./header/LogIn.js";
import SignUp from "./header/SignUp.js";
import Catalog from "./Catalog.js";
import Product from "./Product.js";
import OldOrders from "./header/OldOrders.js";

export default function App() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    return(
        <UserContext.Provider value={{ user, setUser }}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact>
                        <Welcome />
                    </Route>
                    <Route path="/login" exact>
                        <LogIn />
                    </Route>
                    <Route path="/signup" exact>
                        <SignUp />
                    </Route>
                    <Route path="/products/all" exact>
                        <Catalog pageTitle={"Todos os clubes"}/>
                    </Route>
                    <Route path="/products/national" exact>
                        <Catalog category={"Nacional"} pageTitle={"Clubes brasileiros"}/>
                    </Route>
                    <Route path="/products/international" exact>
                        <Catalog category={"Internacional"} pageTitle={"Clubes internacionais"}/>
                    </Route>
                    <Route path="/products/:id" exact>
                        <Product />
                    </Route>
                    <Route path="/old-orders" exact>
                        <OldOrders />
                    </Route>
                </Switch>
            </BrowserRouter>
        </UserContext.Provider>
    )
}