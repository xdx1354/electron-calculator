import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const NavigationBar = styled.nav`
    display: flex;
    flex-direction: row;
    position: absolute;
    top: 0;
    padding-left: 2vw;
    padding-top: 2vh;
`;

const NavBarButton = styled.button`
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        height: 5vh;
        width: 3vw;
        transition: height 0.2s ease;
    }

    &:hover img {
        height: 5.3vh;
    }
`;

type Props = {
    // isBack: boolean;
    // backPath: string;
    // isForward: boolean;
    // forwardPath: string;
    isMenu?: boolean;
    menuPath?: string;
}

const NavBar: React.FC<Props> = (props) => {
    const navigate = useNavigate();

    return (
        <NavigationBar>
            <NavBarButton onClick={() => navigate("/")}>
                <img src="/home3.svg" alt="Home" />
            </NavBarButton>

            {props.isMenu && props.menuPath && (
                <NavBarButton onClick={() => navigate(props.menuPath as string)}>
                    <img src="/menu.svg" alt="Menu" />
                </NavBarButton>
            )}

            {/*{props.isBack && (*/}
            {/*    <NavBarButton onClick={() => navigate(props.backPath)}>*/}
            {/*        <img src="/arrow-left2.svg" alt="Back" />*/}
            {/*    </NavBarButton>*/}
            {/*)}*/}

            {/*{props.isForward && (*/}
            {/*    <NavBarButton onClick={() => navigate(props.forwardPath)}>*/}
            {/*        <img src="/arrow-right2.svg" alt="Next" />*/}
            {/*    </NavBarButton>*/}
            {/*)}*/}


        </NavigationBar>
    );
};

export default NavBar;
