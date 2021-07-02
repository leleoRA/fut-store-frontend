import styled from 'styled-components';
import {useState} from "react";
import { useHistory} from 'react-router-dom';
import {BsList} from 'react-icons/bs';

export default function CategoriesMenu(props) {
    const [openCategoriesMenu, setOpenCategoriesMenu] = useState(false);
    const history = useHistory();

    function goTo(path) {
        history.push(path);
    }

    return(
        <Menu>
            <button onClick={()=> setOpenCategoriesMenu(!openCategoriesMenu)}><BsList /> Categorias</button>
            {openCategoriesMenu && 
                <Category last={false}>
                    <button onClick={()=> {setOpenCategoriesMenu(!openCategoriesMenu); goTo('/products/national')}}>Nacionais</button>
                </Category>
            }
            {openCategoriesMenu && 
                <Category last={false}>
                    <button onClick={()=> {setOpenCategoriesMenu(!openCategoriesMenu); goTo('/products/international')}}>Internacionais</button>
                </Category>
            }
            {openCategoriesMenu && 
                <Category last={true}>
                    <button onClick={()=> {setOpenCategoriesMenu(!openCategoriesMenu); goTo('/products/all')}}>Ver tudo</button>
                </Category>
            }
        </Menu>
    )
}

const Menu = styled.div`
    position: fixed;
    top: 20px;
    left: 20px;
    display: flex;
    flex-direction: column;
    background: #438a0a;
    border: thin;
    border-radius: 5px;
    button {
        font-size: 16px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        width: 110px;
        background: #53961d;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        color: #FFFFFF;
        padding: 5px;
    }
`;

const Category = styled.div`
    background: #53961d;
    border-radius: ${props => props.last ? "0px 0px 3px 3px" : "0"};
    :hover {
        opacity: .7;
    }
`;