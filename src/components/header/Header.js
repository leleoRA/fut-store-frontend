import styled from 'styled-components';

import CategoriesMenu from "./CategoriesMenu.js";
import UserAndCart from "./UserAndCart.js";

export default function Header() {
    return(
        <Body>
            <LeftMenu>
                <CategoriesMenu />
            </LeftMenu>
            <Logo>NetShirts</Logo>
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
    top: 0;
    left: 0;
    background: #356e07;
    border: none;
`;

const LeftMenu = styled.div`
    position: relative;
`;

const Logo = styled.h1`
    font-size: 30px;
    font-weight: 700;
    color: #FFFFFF;
`;

const RightMenu = styled.div`
    display: flex;
    margin-right: 20px;
`;