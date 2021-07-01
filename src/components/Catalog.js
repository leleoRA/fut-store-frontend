import styled from 'styled-components';
import { GiBrazilFlag, GiEarthAfricaEurope } from "react-icons/gi";
import { useEffect, useState } from 'react';
import axios from "axios";

import Header from "./header/Header.js";
import Footer from './Footer.js';

export default function Catalog(props) {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        let query = '';
        
        if (props.category !== undefined){
            query = `?page=${props.category}`
        }
        const request = axios.get(`http://localhost:4000/catalog${query}`)

        request.then(res => {
            setEvents(res.data)
        })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    
    return(
        <Body>
            <Header />
            <Banner>
                {(props.pageTitle !== "Todos os clubes") ?
                    <>
                        <Icon>
                            {(props.category === 'Nacional') ?
                                <GiBrazilFlag size="50px" color="#fff"/>
                            :  
                                <GiEarthAfricaEurope size="50px" color="#fff" />
                            }
                        </Icon>
                        <Separator></Separator>
                        <h1>{props.pageTitle}</h1>
                    </>
                :
                    <h1>{props.pageTitle}</h1>
                }
            </Banner>
            <Products>
                {events.map(e => (
                    <Content>
                        <img src={e.urlImageFront} alt={e.name}></img>
                        <Info>{e.name}</Info>
                        <Price>R${(e.price).replace(".",",")}</Price>
                    </Content>
                ))}
            </Products>
            <Footer />
        </Body>
    )
}

const Body = styled.div`
    height: 100vh;
    width: 100vw;
`;

const Banner = styled.div`
    height: 160px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 20px;
    margin-bottom: 20px;
    background-image: linear-gradient(to right, black , grey);
    background-color: #cecece;
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.4);

    h1{
        font-size: 30px;
        color: #FFF;
        font-weight: bold;
    }
`;

const Icon = styled.div`
    width: 50px;
    height: 50px;
    border: 4px solid #FFF;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFF;
`;

const Separator = styled.div`
    width: 2px;
    height: 30px;
    background-color: #FFF;
    margin: 0 15px;
`;

const Products = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    cursor: pointer;
`;

const Content = styled.div`
    height: 400px;
    width: 300px;
    margin: 10px; 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img{ 
        height: 300px;
        margin-bottom: 10px;  
    }

    :hover{
        border-radius: 8px;
        box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.4);
    }
`;

const Info = styled.p`
    font-size: 15px;
    margin: 6px 0;
    align-self: flex-start;
    margin-left: 2px;
    font-weight: bold;
`;

const Price = styled.p`
    font-size: 20px;
    margin: 6px 0;
    align-self: flex-start;
    margin-left: 2px;
    font-weight: bold;
`;