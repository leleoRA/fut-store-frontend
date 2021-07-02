import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {useState} from "react";

import UserContext from './contexts/UserContext';
import CartContext from './contexts/CartContext';

import Welcome from "./Welcome.js";
import LogIn from "./header/LogIn.js";
import SignUp from "./header/SignUp.js";
import Catalog from "./Catalog.js";
import Product from "./Product.js";
import OldOrders from "./header/OldOrders.js";
import Cart from "./header/Cart.js";

export default function App() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [cart, setCart] = useState([
        {product: "Camisa teste", size: "M", price: 2399, img: "https://madmais.vteximg.com.br/arquivos/ids/157184-1000-1000/LAMINADO-PERTECH-AZUL-REAL-PP3620-TX.jpg?v=637308454415300000"},
        {product: "Camisa teste 2", size: "G", price: 3199, img: "https://varotti.vteximg.com.br/arquivos/ids/172906-1000-1000/36562_MDF-Vermelho-Scarlate-Lacca-AD-Eucatex_6mm.jpg?v=637152138083630000"}
    ]);

    return(
        <UserContext.Provider value={{user, setUser}}>
        <CartContext.Provider value={{cart, setCart}}>
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
                    <Route path="/cart" exact>
                        <Cart />
                    </Route>
                </Switch>
            </BrowserRouter>
        </CartContext.Provider>
        </UserContext.Provider>
    )
}