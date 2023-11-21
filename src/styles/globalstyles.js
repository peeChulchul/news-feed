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
`;
