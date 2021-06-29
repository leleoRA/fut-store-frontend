import styled from 'styled-components';
import {useHistory} from 'react-router-dom';

import Header from "./Header.js";

export default function Welcome() {
    const history = useHistory();

    function goTo(path) {
        history.push(path);
    }

    return(
        <Body>
            <Header />
            <WelcomeMsg>
                <h1>Bem vindo à Fut-Store! Escolha uma categoria abaixo ou clique <button onClick={()=> goTo('/products/all')}>aqui</button> para ver todos os nossos produtos.</h1>
            </WelcomeMsg>
            <Categories>
                <Category url={"https://esportems.com.br/site/wp-content/uploads/2020/06/1-maracana.jpg"} onClick={()=> goTo('/products/national')}>
                    <button>NACIONAIS</button>
                </Category>
                <Category url={"https://knoow.net/wp-content/uploads/2016/02/wembley-bowl.jpg"} onClick={()=> goTo('/products/international')}>
                    <button>INTERNACIONAIS</button>
                </Category>
            </Categories>
        </Body>
    )
}

const Body = styled.div`
    height: 100vh;
    width: 100vw;
    background: #FFFFFF;
`;

const WelcomeMsg = styled.div`
    height: 60px;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    button {
        font-size: inherit;
        background: none;
        border: none;
        color: darkgreen;
        cursor: pointer;
        :hover {
            opacity: .7;
        }
    }
`;

const Categories = styled.div`
    height: calc(100vh - 120px);
    width: 100vw;
    display: flex;
    background: #000000;
`;

const Category = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000000;
    background: url(${props => props.url}) no-repeat center center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -ms-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    opacity: .9;
    :hover {
        opacity: 0.7;
    }
    button {
        font-size: 50px;
        padding: 15px;
        cursor: pointer;
        background: none;
        border: none;
        color: #FFFFFF;
    }
`;