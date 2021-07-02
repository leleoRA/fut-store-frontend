import styled from 'styled-components';
import axios from 'axios';
import {useState} from 'react';
import {useHistory} from 'react-router-dom';

import validateEmail from '../validate/validateEmail';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [username, setUserName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    function signUp(e) {
        e.preventDefault();
        if (username && password && validateEmail(email) && password === password2){
            setIsLoading(true);
            const body = {
                email,
                password,
                username
            };
            const request = axios.post('https://back-netshirts.herokuapp.com/sign-up', body);
            request.then((response)=> {
                setIsLoading(false);
                alert("Cadastro realizado com sucesso! Por favor, efetue login em sua nova conta");
                history.push("/login");
            });
            request.catch((error)=> {
                if(error.response.status === 403) {
                    alert('Este email já está cadastrado. Por favor, tente efetuar o login ou use um email diferente.');
                } else if(error.response.status === 400) {
                    alert('Um dos campos está em branco!');
                } else {
                    alert(error.response.status);
                }
                setIsLoading(false);
            })
        }
        if (!validateEmail(email)){
            alert("Por favor, digite um email apropriado.");
            return;
        }
        if (!password){
            alert("Por favor, escolha uma senha.");
            return;
        }
        if (!username){
            alert("Por favor, informe seu nome.");
            return;
        }
        if (password !== password2){
            alert("As senhas inseridas são diferentes entre si!");
        }
    }

    function goTo(path) {
        history.push(path);
    }

    return(
        <Body>
            <LogInBox>
                <Title>NetShoes</Title>
                <Form onSubmit={signUp}>
                    <input onChange={(e)=>setUserName(e.target.value)} value={username} type="text" placeholder="Nome"></input>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} type="text" placeholder="E-mail" ></input>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder="Senha"></input>
                    <input onChange={(e)=>setPassword2(e.target.value)} value={password2} type="password" placeholder="Confirme sua senha"></input>
                    <Button isloading={isLoading} disabled={isLoading} type="submit">Cadastrar</Button>
                    <Button isloading={isLoading} disabled={isLoading} type="button" onClick={()=> goTo('/')}>Voltar</Button>
                    <p onClick={()=> goTo('/login')}>Já tem uma conta? Entre agora!</p>
                </Form>
            </LogInBox>
        </Body>
    )
}

const Body = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #356e07;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LogInBox = styled.div`
    width: 400PX;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h1`
    font-family: 'Nova Flat';
    font-size: 32px;
    font-weight: 700;
    line-height: 50px;
    color: #FFFFFF;
    margin-bottom: 24px;
`;

const Form = styled.form`
    width: 100%;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
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
        background: #FFFFFF;
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
        font-size: 15px;
        font-weight: 700;
        line-height: 18px;
        letter-spacing: 0em;
        color: #FFFFFF;
        cursor: pointer;
    }
`

const Button = styled.button`
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
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