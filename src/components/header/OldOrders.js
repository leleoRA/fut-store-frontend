import styled from 'styled-components';
import {useState, useContext, useEffect} from "react";
import axios from 'axios';

import UserContext from '../contexts/UserContext';
import Header from "./Header.js";

export default function OlderOrders() {
    const {user} = useContext(UserContext);
    const [oldOrders, setOldOrders] = useState([]);

    console.log(user.userId);

    useEffect(() => {
        const request = axios.get(`http://localhost:4000/old-orders/${user.userId}`);
        request.then(res => {
            console.log(res.data);
            setOldOrders(res.data)
        });
    }, [setOldOrders, user.userId]);

    console.log(oldOrders);

    return(
        <Body>
            <Header />
            <OrdersBox>
                <Title>Produtos já pedidos</Title>
                {oldOrders.length >= 1 ?
                oldOrders.map((o, i) => (
                    <Order>
                        <OrderTitle key={i}>{o.product + " (" + o.size + ")"}</OrderTitle>
                        <OrderInfo>
                            <div>{"Data da compra: " + o.date}</div>
                            <div>{"Valor: R$" + (o.price/100).toFixed(2)}</div>
                        </OrderInfo>
                        {(i !== (oldOrders.length - 1)) && <Spliter></Spliter>}
                    </Order>
                )) :
                <NullMessage>Você não possui pedidos antigos!</NullMessage>
                }
            </OrdersBox>
        </Body>
    )
}

const Body = styled.div`
    width: 100vw;
`;

const OrdersBox = styled.div`
    width: 80vw;
    min-height: 300px;
    margin: 0px auto;
    display: flex;
    flex-direction: column;
`;

const Title = styled.h1`
    margin-top: 80px;
    margin-bottom: 50px;
    font-weight: 700;
    font-size: 30px;
    color: darkgreen;
`;

const Order = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    margin: 0px auto;
`;

const OrderTitle = styled.h1`
    color: #000000;
    font-size: 20px;
`;

const OrderInfo = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    padding-left: 30px;
`;

const Spliter = styled.div`
    width: 80%;
    height: 1px;
    border: solid .2px #f7f7f7;
    margin: 24px auto;
`;

const NullMessage = styled.h1`
    color: #868686;
    font-size: 20px;
    margin: auto auto;
`;