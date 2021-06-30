import styled from 'styled-components';

import Header from "./header/Header.js";

export default function Catalog() {
    return(
        <Body>
            <Header />
            <Page>
                <h1>Nossos produtos estarão aqui!</h1>
            </Page>
        </Body>
    )
}

const Body = styled.div`
    height: 100vh;
    width: 100vw;
`;

const Page = styled.div`
    height: 50vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`;