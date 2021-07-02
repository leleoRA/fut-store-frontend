import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';

import CartContext from "./contexts/CartContext";
import Header from "./header/Header"
import Footer from './Footer';
import {
    StyledModal,
    ModalText,
    GoBackButton,
    ConfirmButton,
    Order
} from "./StyledModal";

export default function Product(){
    const { id } = useParams();
    const [p, setP] = useState(false)
    const [m, setM] = useState(false)
    const [g, setG] = useState(false)
    const [product, setProduct] = useState([]);
    const [image, setImage] = useState('');
    const [size, setSize] = useState("");
    const [modalIsOpen, setModalIsOPen] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const price = product.price;
    const image1 = product.urlImageFront;
    const image2 = product.urlImageBack;
    const { cart, setCart } = useContext(CartContext);
    const history = useHistory();
    let path = '';

    if (product.category !== undefined){
        if (product.category === "Nacional"){
            path = `/national`
        } else{
            path = `/international` 
        }
    }
    
    useEffect(() => {
        showProduct()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function showProduct(){
        const request = axios.get(`https://back-netshirts.herokuapp.com/products/${id}`)

        request.then(res => {
            setProduct(res.data)
            setImage(res.data.urlImageFront)
        })
    }

    function toggleModal() {
        if (size!==""){
            modalIsOpen ? setModalIsOPen(false) : setModalIsOPen(true);
        }
    }

    function addCart(){
        if (size===""){
            alert("Selecione um tamanho para prosseguir")
        } else {
            let actualCart = cart;
            actualCart.push({img: product.urlImageFront, price: product.price, product: product.name, size});
            setCart(actualCart);
        }
    }

    function changeImage1(){
        setImage(image1)
    }

    function changeImage2(){
        setImage(image2)
    }

    function goTo(path) {
        setModalIsOPen(false);
        history.push(path);
    }

    return(
        <>
            <Header />
            <Path>
                <p><Link to="/">Página Inicial</Link> {`>>>`} <Link to={`/products${path}`}>{(product.category ==="Nacional") ? "Clubes nacionais" : "Clubes internacionais"}</Link> {`>>>`} {product.team}</p>
            </Path>
            <Body>  
                <Section>
                    <Images>
                        <Thumbs>
                            <div onClick={changeImage1}>
                                <img src={product.urlImageFront} alt={product.name}/>
                            </div>
                            <div onClick={changeImage2}>
                                <img src={product.urlImageBack} alt={product.name}/>
                            </div>
                        </Thumbs>
                        <Principal>
                            <div>
                                <InnerImageZoom src={image} alt={product.name}/>
                            </div>
                        </Principal>
                    </Images>
                </Section>
                <VerticalSeparator></VerticalSeparator>
                <Aside>
                    <h1>{product.name}</h1>
                    <h2>R$ {price}</h2>
                    <p>ou <strong>3x</strong> de <strong>R$ {(price/3).toFixed(2)}</strong> Sem juros</p>
                    <Division>
                        <Subtitle>
                            Tamanho
                        </Subtitle>
                        <Line></Line>
                    </Division>
                    <Sizes>
                        <ShirtSize option={p} onClick={() => {setSize("P");setP(!p);setM(false);setG(false)}}>P</ShirtSize>
                        <ShirtSize option={m} onClick={() => {setSize("M");setP(false);setM(!m);setG(false)}}>M</ShirtSize>
                        <ShirtSize option={g} onClick={() => {setSize("G");setP(false);setM(false);setG(!g)}}>G</ShirtSize>
                    </Sizes>
                    <Buy onClick={() => {toggleModal();addCart()}}>
                        Comprar
                    </Buy>
                    <StyledModal
                        isOpen={modalIsOpen}
                        onRequestClose={toggleModal}
                        contentLabel="Erase Modal"
                    >
                        <ModalText>
                            {disabled
                                ? ""
                                : `Produto adicionado ao carrinho`}
                            <Order>
                                <img src={product.urlImageFront} alt={product.name}/>
                                <p><strong>{product.name}</strong><br/>Tamanho: {size}<br/>Preço: R$ {product.price}</p>
                            </Order>
                        </ModalText>
                        <div>
                            <GoBackButton disabled={disabled} onClick={toggleModal}>
                                Continuar comprando
                            </GoBackButton>
                            <ConfirmButton onClick={() => goTo("/cart")} disabled={disabled}>
                                Ir para o carrinho
                            </ConfirmButton>
                        </div>
                    </StyledModal>
                    <Description>
                        <h3>Mais detalhes</h3>
                        <p>{product.description}</p>
                    </Description>
                </Aside>
            </Body>
            <Footer />
        </>
    );
}

const Path = styled.div`
    width: 95vw;
    display: flex;
    margin: 18px auto 0 auto;
    font-size: 15px;
    font-weight: 700;
`;

const Body = styled.div`
    height: 100vh;
    width: 95vw;
    display: flex;
    margin: 0 auto;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    margin: 18px 0;
`;

const Images = styled.div`
    width: 60%;
    display: flex;
`;

const Thumbs = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;
    cursor: pointer;

    div{
        width: 120px;
        height: 120px;
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #bebe;
    }

    img{
        width: 120px;
        height: 120px;
        border-radius: 3px;

        :hover{
            box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.4);
        }
    }
`;

const Principal = styled.div`
    display: flex;
    justify-content: center;

    div{
        width: 590px;
        height: 590px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #cecece;
    }

    img{
        width: 590px;
        height: 590px;
    }
`;

const VerticalSeparator = styled.div`
    height: 590px;
    width: 2px;
    background-color: #c9c3c3;
    margin: 18px;
`;

const Aside = styled.div`
    width: 40%;
    margin: 18px 0;

    h1{
        font-size: 32px;
        font-weight: 700;
        margin-bottom: 5px;
    }

    h2{
        font-size: 35px;
        font-weight: 700;
        margin-bottom: 5px;
    }

    p{
        font-size: 15px;
        margin-bottom: 5px;
    }
`;

const Division = styled.div`
    display: flex;
    align-items: center;
    margin-top: 25px;
`;

const Subtitle = styled.div`
    font-size: 18px;
    font-weight: 700;
`;

const Line = styled.div`
    width: 80%;
    height: 2px;
    background-color: #c9c3c3;
    margin-left: 5px;
`;

const Sizes = styled.div`
    display: flex;
`;

const ShirtSize = styled.button`
    border: 1px solid #878484;
    border-radius: 3px;
    color: ${(props) => (props.option ? "#cecece" : "#878484")};
    background-color: ${(props) => (props.option ? "#878484" : "#FFF")};
    margin-right: 10px;
    margin-top: 25px;
    height: 33px;
    width: 72px;
    font-weight: 700;
    cursor: pointer;
`;

const Buy = styled.button`
    border: none;
    border-radius: 3px;
    width: 95%;
    height: 54px;
    margin-top: 25px;
    background-color: green;
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
`;

const Description = styled.div`
    width: 95%;
    margin-top: 25px;

    h3{
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 10px;
    }

    p{
        text-align: justify;
        font-size: 18px;
    }
`;