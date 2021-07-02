import styled from 'styled-components';
import {useHistory} from 'react-router-dom';

import CategoriesMenu from "./CategoriesMenu.js";
import UserAndCart from "./UserAndCart.js";

export default function Header() {
    const history = useHistory();

    function goTo(path) {
        history.push(path);
    }

    return(
        <Body>
            <LeftMenu>
                <CategoriesMenu/>
            </LeftMenu>
            <Logo onClick={() => goTo('/')}>NetShirts</Logo>
            <RightMenu>
                <UserAndCart />
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
    z-index: 10;
    top: 0;
    left: 0;
    background: #356e07;
    border: none;
`;

const LeftMenu = styled.div`
    position: relative;
`;

const Logo = styled.h1`
    font-size: 50px;
    color: #FFFFFF;
    cursor: pointer;
    font-family: 'Nova Flat';
`;

const RightMenu = styled.div`
    display: flex;
    margin-right: 20px;
`;