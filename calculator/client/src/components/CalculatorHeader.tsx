import React from 'react';
import styled from "styled-components";

const Header = styled.header`
    font-size: 60px;
    font-family: Roboto, sans-serif;
    font-weight: 1000;
    margin: 0;
    color: ${(props) => props.color || 'black'};
`

interface CalculatorHeaderProps {
    title?: string;
    color?: string;
}

const CalculatorHeader: React.FC<CalculatorHeaderProps> = (props) => {
    return (
        <Header color={props.color}>{props.title}</Header>
    );
}

export default CalculatorHeader;


