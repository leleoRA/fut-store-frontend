import styled from "styled-components";

import Header from "./Header.js";
import Footer from './Footer.js';

export default function Product(){
    return(
        <>
            <Header />
            <Body>               
                <Section>
                    asfhdfhdfh
                </Section>
                <Aside>
                    asdfdfhdf
                </Aside>
            </Body>
            <Footer />
        </>
    );
}

const Body = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
`;

const Section = styled.div`

`;

const Aside = styled.div`

`;