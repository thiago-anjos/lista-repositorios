import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    max-width: 700px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0,0,0, 0.2);
    padding: 30px;
    margin: 80px auto;

    ul{
        padding: 16px;

        li{
            display: flex;
            padding: 16px 8px;

            & + li {
                margin-top: 16px;
            }

            img{
                width: 36px;
                height: auto;
                border-radius: 50%;
                border:2px solid #0D2636;
            }

            div{
                flex: 1;
                margin-left: 12px;

                a{
                    text-decoration: none;
                    color: #222222;
                    transform: 1s;

                    &:hover{
                        color: red;
                    }

                }

                span{
                    background-color: #222222;
                    color: #fff;
                    border-radius: 4px;
                    font-weight: 600;
                    padding: 4px 7px;
                    margin-left: 10px;
                }

                p{
                    margin-top: 10px;
                    font-size: 12px;
                    color: #000;
                }

            }

        }
    }

`;

export const Owner = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;

    img{
        width: 150px;
        border-radius: 20%;
        margin: 20px 0;
    }

    h1{
        font-size: 30px;
        color: #0D2636;
    }

    p{
        margin-top: 5px;
        font-size: 14px;
        color: #000;
        text-align: center;
        line-height: 1.4;
        max-width: 400px;
    }

    button{
        background-color: black;
        border:none;
    }

`;

export const Loading = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: red;
    height: 100vh;
`

export const BackButton = styled(Link)`
    border:0;
    outline:0;
    background: transparent;
`;

export const PageActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    button{
        outline: 0;
        border: 0;
        background-color: #222;
        color: #fff;
        padding: 5px 10px;
        border-radius: 5px;

        &:disabled{
            cursor: not-allowed;
            opacity: 0.5
        } 
    }
`

export const ListStates = styled.ul`
    display: flex;
    flex-direction: row;
    align-items: center;
    li{
        display: flex;
        margin:0 !important;
        padding:4px 8px !important;
        background-color: black;
        color: red;
        border:1px solid white;
        cursor: pointer;

        &:nth-child(${props => props.active + 1}){
        background-color: red;
        color: black;
    }

    }

`