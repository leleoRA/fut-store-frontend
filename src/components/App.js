import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UserContext from './contexts/UserContext';
import { useState } from "react";

import Welcome from "./Welcome.js";
import Catalog from "./Catalog.js";

export default function App() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    return(
        <UserContext.Provider value={{ user, setUser }}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact>
                        <Welcome />
                    </Route>
                    <Route path="/products/all" exact>
                        <Catalog category={"all"} />
                    </Route>
                    <Route path="/products/national" exact>
                        <Catalog category={"national"} />
                    </Route>
                    <Route path="/products/international" exact>
                        <Catalog category={"international"} />
                    </Route>
                </Switch>
            </BrowserRouter>
        </UserContext.Provider>
    )
}