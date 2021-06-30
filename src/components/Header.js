import styled from 'styled-components';
import { useState } from "react";

export default function Header() {
    const [openCategoriesMenu, setOpenCategoriesMenu] = useState(false);
    return(
        <Body>
            <LeftMenu>
                <CategoriesMenu>
                        <button onClick={()=> setOpenCategoriesMenu(!openCategoriesMenu)}>Categorias</button>
                        {openCategoriesMenu && 
                            <Category last={false}>
                                <button onClick={()=> setOpenCategoriesMenu(!openCategoriesMenu)}>Nacionais</button>
                            </Category>
                        }
                        {openCategoriesMenu && 
                            <Category last={false}>
                                <button onClick={()=> setOpenCategoriesMenu(!openCategoriesMenu)}>Internacionais</button>
                            </Category>
                        }
                        {openCategoriesMenu && 
                            <Category last={true}>
                                <button onClick={()=> setOpenCategoriesMenu(!openCategoriesMenu)}>Ver tudo</button>
                            </Category>
                        }
                </CategoriesMenu>
            </LeftMenu>
            <Logo>Net-Shirts</Logo>
            <RightMenu>
                <UserMenu>Usuário</UserMenu>
                <Cart>Carrinho</Cart>
            </RightMenu>
        </Body>
    )
}

const Body = styled.div`
    height: 60px;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    left: 0;
    background: #356e07;
    border: none;
`;

const LeftMenu = styled.div`
    position: relative;
`;

const CategoriesMenu = styled.div`
    position: fixed;
    top: 20px;
    left: 20px;
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
    border-radius: ${props => props.last ? "5px" : "0"};
    :hover {
        opacity: .7;
    }
`;

const Logo = styled.h1`
    font-size: 24px;
    color: #FFFFFF;
`;

const RightMenu = styled.div`
    display: flex;
    margin-right: 20px;
`;

const UserMenu = styled.button`
    color: #FFFFFF;
    padding: 5px;
    cursor: pointer;
    background: none;
    border: none;
`;

const Cart = styled.button`
    color: #FFFFFF;
    padding: 5px;
    cursor: pointer;
    background: none;
    border: none;
`;