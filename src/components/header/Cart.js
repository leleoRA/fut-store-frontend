import styled from 'styled-components';
import {useState, useContext, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

import Header from "./Header.js";
import CartContext from '../contexts/CartContext';
import UserContext from '../contexts/UserContext.js';

export default function Cart() {
    const {user} = useContext(UserContext);
    const {cart, setCart} = useContext(CartContext);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [securityCode, setSecurityCode] = useState("");
    const [cartReload, setCartReload] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        calcTotalPrice()
    }, [setCart, cart, cartReload]); // eslint-disable-line react-hooks/exhaustive-deps
    
    function calcTotalPrice() {
        let newTotal = 0;
        cart.forEach(p => {
            newTotal = newTotal + p.price;
        });
        setTotalPrice(newTotal);
    }

    function buyItems(e) {
        e.preventDefault();
        if (cardName && cardNumber && expiryDate && securityCode){
            setIsLoading(true);
            const body = {
                userId: user.userId,
                products: cart,
                cardName,
                cardNumber,
                expiryDate,
                securityCode
            };
            const request = axios.post('https://back-netshirts.herokuapp.com/new-purchase', body);
            request.then((response)=> {
                setIsLoading(false);
                alert("Compra efetuada com sucesso!");
                history.push('/products/national');
            })
            request.catch((error)=> {
                setIsLoading(false);
                if(error.response.status === 403){
                    alert('Por favor, preencha todos os dados de pagamento corretamente!');
                }
            })
        } else {
            alert('Por favor, não deixe nenhum campo em branco.');
        }
    }
    
    function removeItem(i) {
        let newCart = cart;
        newCart.splice(i, 1);
        setCart(newCart);
        setCartReload(!cartReload);
    }

    return(
        <Body>
            <Header />
            <CartItems>
                <Title>Seu carrinho</Title>
                {cart.length >= 1 ?
                cart.map((p, i) => (
                    <Item cartReload={true} key={i}>
                        <ItemTitle >
                            <img src={p.img} alt=""></img>
                            {p.product + " (" + p.size + ")"}
                        </ItemTitle>
                        <ItemInfo>
                            <RemoveButton onClick={() => removeItem(i)}>Remover item</RemoveButton>
                            <div>{"Valor: R$" + ((p.price).toFixed(2))}</div>
                        </ItemInfo>
                        {(i !== (cart.length - 1)) && <Spliter></Spliter>}
                        {(i === (cart.length - 1)) && <TotalPrice>Valor total: R${totalPrice.toFixed(2)}</TotalPrice>}
                    </Item>
                )) :
                <NullMessage>Seu carrinho está vazio!</NullMessage>
                }
                <Title>Método de pagamento</Title>
                <Form onSubmit={buyItems}>
                    <input onChange={(e)=>setCardNumber(e.target.value)} value={cardNumber} type="text" placeholder="Número do cartão" ></input>
                    <input onChange={(e)=>setCardName(e.target.value)} value={cardName} type="text" placeholder="Nome do titular"></input>
                    <input onChange={(e)=>setExpiryDate(e.target.value)} value={expiryDate} type="text" placeholder="Data de validade (dd/mm)" ></input>
                    <input onChange={(e)=>setSecurityCode(e.target.value)} value={securityCode} type="text" placeholder="Código de segurança"></input>
                    <Button isloading={isLoading} disabled={isLoading} type="submit">Comprar</Button>
                </Form>
            </CartItems>
        </Body>
    )
}

const Body = styled.div`
    width: 100vw;
`;

const CartItems = styled.div`
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

const Item = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    margin: 0px auto;
`;

const ItemTitle = styled.h1`
    color: #000000;
    font-size: 20px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    img {
        width: 50px;
        height: 50px;
        margin-right: 15px;
    }
`;

const ItemInfo = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
`;

const Spliter = styled.div`
    width: 80%;
    height: 1px;
    border: solid .2px #f7f7f7;
    margin: 24px auto;
`;

const RemoveButton = styled.button`
    width: 120px;
    background: red;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    color: #FFFFFF;
    padding: 5px;
`;

const TotalPrice = styled.h1`
    width: 100%;
    display: flex;
    justify-content: end;
    margin-top: 50px;

    font-size: 20px;
    font-weight: 700;
`;

const NullMessage = styled.h1`
    color: #868686;
    font-size: 20px;
    margin: auto auto;
`;

const Form = styled.form`
    width: 80%;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    margin: 0px auto;
    p:hover,button:hover{
        filter: contrast(140%);
    }
    p:active,button:active{
        filter: contrast(80%);
    }
    input {    
        font-size: 20px;
        line-height: 23px;
        margin-bottom:13px;
        color: #000000;
        width: 100%;
        height: 58px;
        background: #F1F1F1;
        border-radius: 6px;
        border: none;
        text-indent: 12px;
        outline:none;
    }
    input::placeholder{
        color: #000000;
    }
    input:focus{
        box-shadow: inset 4px 0px 0px #438a0a;
    }
    p{
        font-family: 'Raleway', sans-serif;
        font-size: 15px;
        font-weight: 700;
        line-height: 18px;
        letter-spacing: 0em;
        color: #FFFFFF;
        cursor: pointer;
    }
`

const Button = styled.button`
    width: 20%;
    height: 36px;
    margin-top: 40px;
    margin-bottom: 40px;
    margin-left: 80%;
    background: #438a0a;
    border-radius: 6px;
    font-size: 20px;
    line-height: 23px;
    font-weight: 700;
    color: #FFF;
    border: none;
    cursor: ${props=> props.isloading ? "not-allowed" : "pointer"};
    opacity: ${props=> props.isloading ? 0.7 : 1};
    :hover{
        background-color:#5bbd0d;
    }
`