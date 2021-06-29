import styled from 'styled-components';

export default function Header() {
    return(
        <Body>
            <UserMenu>Usuário</UserMenu>
            <Logo>Fut-Store</Logo>
            <Cart>Carrinho</Cart>
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

const UserMenu = styled.button`
    color: #FFFFFF;
    margin-left: 20px;
    padding: 5px;
    cursor: pointer;
    background: none;
    border: none;
`;

const Logo = styled.h1`
    font-size: 24px;
    color: #FFFFFF;
`;

const Cart = styled.button`
    color: #FFFFFF;
    margin-right: 20px;
    padding: 5px;
    cursor: pointer;
    background: none;
    border: none;
`;