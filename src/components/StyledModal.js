import styled from "styled-components";
import ReactModal from "react-modal";

const StyledModal = styled(ReactModal)`
    top: 50vh;
    left: 50vw;
    right: auto;
    bottom: auto;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    max-width: 597px;
    width: 100%;
    height: 400px;
    background: #333333;
    border-radius: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 2;
    padding: 0 80px 0 80px;

    div {
        display: flex;
    }

    .backdrop {
        background-color: green;
    }
`;

const ModalText = styled.p`
    font-weight: bold;
    font-size: 34px;
    line-height: 41px;
    color: #ffffff;
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
`;

const Order = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 15px;

    img{
        width: 100px;
        height: 100px;
    }
    
    p{
        font-size: 18px;
        font-weight: 400;
    }
`;

const GoBackButton = styled.button`
    width: 134px;
    height: 50px;
    background: #ffffff;
    color: green;
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    border-radius: 5px;
    border: none;
    margin-right: 27px;
    cursor: pointer;
`;

const ConfirmButton = styled.button`
    width: 134px;
    height: 50px;
    background: green;
    color: #ffffff;
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
`;

export { StyledModal, ModalText, GoBackButton, ConfirmButton, Order };