import styled from 'styled-components';
import {useState, useContext, useEffect} from "react";
import {useHistory} from 'react-router-dom';

import UserContext from '../contexts/UserContext';

export default function UserAndCart() {
    const {user, setUser} = useContext(UserContext);
    const [openUserMenu, setOpenUserMenu] = useState(false);
    const [openCartMenu, setOpenCartMenu] = useState(false);
    const [loggedUser, setLoggedUser] = useState(false);
    const history = useHistory();

    useEffect(()=>{
        if(user !== null){
            setLoggedUser(true);
        }
    },[user, setUser, setLoggedUser ]);

    function goTo(path) {
        history.push(path);
    }

    function logOut() {
        localStorage.clear();
        setUser(null);
        setLoggedUser(false);
    }

    return(
        <Menus>
            <UserMenu>
                <button onClick={()=> {setOpenUserMenu(!openUserMenu); setOpenCartMenu(false)}}>Usuário</button>
                {openUserMenu && !loggedUser &&
                    <Category last={false}>
                        <button onClick={()=> {setOpenUserMenu(!openUserMenu); goTo('/login')}}>Entrar</button>
                    </Category>
                }
                {openUserMenu && !loggedUser &&
                    <Category last={true}>
                        <button onClick={()=> {setOpenUserMenu(!openUserMenu); goTo('/signup')}}>Criar conta</button>
                    </Category>
                }
                {openUserMenu && loggedUser &&
                    <Category last={false}>
                        <button onClick={()=> setOpenUserMenu(!openUserMenu)}>Pedidos antigos</button>
                    </Category>
                }
                {openUserMenu && loggedUser &&
                    <Category last={true}>
                        <button onClick={()=> {setOpenUserMenu(!openUserMenu); logOut()}}>Sair</button>
                    </Category>
                }
            </UserMenu>
            <CartMenu>
            <button onClick={()=> {setOpenCartMenu(!openCartMenu); setOpenUserMenu(false)}}>Carrinho</button>
                {openCartMenu && 
                    <Category last={false}>
                        <button onClick={()=> {setOpenCartMenu(!openCartMenu); goTo('/cart')}}>Visualizar</button>
                    </Category>
                }
                {openCartMenu && 
                    <Category last={true}>
                        <button onClick={()=> setOpenCartMenu(!openCartMenu)}>Limpar</button>
                    </Category>
                }
            </CartMenu>
        </Menus>
    )
}

const Menus = styled.div`
    display: flex;
    margin-right: 20px;
`;

const UserMenu = styled.div`
    position: fixed;
    top: 20px;
    right: 160px;
    display: flex;
    flex-direction: column;
    background: #438a0a;
    border: thin;
    border-radius: 5px;
    button {
        width: 120px;
        background: #53961d;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        color: #FFFFFF;
        padding: 5px;
    }
`;

const Category = styled.div`
    background: #53961d;
    border-radius: ${props => props.last ? "0px 0px 3px 3px" : "0"};
    :hover {
        opacity: .7;
    }
`;

const CartMenu = styled.div`
    position: fixed;
    top: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    background: #438a0a;
    border: thin;
    border-radius: 5px;
    button {
        width: 120px;
        background: #53961d;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        color: #FFFFFF;
        padding: 5px;
    }
`;