import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

export const GlobalStyle = createGlobalStyle`
    ${reset}
    *{
        box-sizing: border-box;
    }
    button{
        background-color: none;
        border:none;
    }
    a{
        text-decoration: none;
    }
    body{
        font-family: 'Noto Sans KR';
        letter-spacing: -0.03cap;
    }

`;
