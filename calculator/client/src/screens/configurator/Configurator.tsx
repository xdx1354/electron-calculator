import React from 'react';
import ChooseActionHero from "../../components/ChooseActionHero";
import NavBar from "../../components/NavBar/NavBar";

function Configurator() {
    return (
        <>
            <NavBar
                isMenu={false}
            />
            <ChooseActionHero/>
        </>
    );
}

export default Configurator;


