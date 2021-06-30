import styled from 'styled-components';
import {useState} from "react";
import {useHistory} from 'react-router-dom';

export default function UserAndCart() {
    const [openUserMenu, setOpenUserMenu] = useState(false);
    const [openCartMenu, setOpenCartMenu] = useState(false);
    const history = useHistory();

    function goTo(path) {
        history.push(path);
    }

    return(
        <Menus>
            <UserMenu>
                <button onClick={()=> {setOpenUserMenu(!openUserMenu); setOpenCartMenu(false)}}>Usuário</button>
                {openUserMenu && 
                    <Category last={false}>
                        <button onClick={()=> setOpenUserMenu(!openUserMenu)}>Entrar</button>
                    </Category>
                }
                {openUserMenu && 
                    <Category last={false}>
                        <button onClick={()=> setOpenUserMenu(!openUserMenu)}>Criar conta</button>
                    </Category>
                }
                {openUserMenu && 
                    <Category last={false}>
                        <button onClick={()=> setOpenUserMenu(!openUserMenu)}>Pedidos antigos</button>
                    </Category>
                }
                {openUserMenu && 
                    <Category last={true}>
                        <button onClick={()=> setOpenUserMenu(!openUserMenu)}>sair</button>
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
    background: #FFFFFF;
    border: thin;
    border-radius: 5px;
    button {
        width: 120px;
        background: none;
        border: none;
        cursor: pointer;
        color: green;
        padding: 5px;
    }
`;

const Category = styled.div`
    background: #F7F7F7;
    border-radius: ${props => props.last ? "0px 0px 5px 5px" : "0"};
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
    background: #FFFFFF;
    border: thin;
    border-radius: 5px;
    button {
        width: 120px;
        background: none;
        border: none;
        cursor: pointer;
        color: green;
        padding: 5px;
    }
`;