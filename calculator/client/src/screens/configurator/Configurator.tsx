import React, {createContext, useState} from 'react';
import ChooseActionHero from "../../components/ChooseActionHero";
import NavBar from "../../components/NavBar/NavBar";

type ConfiguratorProps = {
    next: string;
}

export const ConfiguratorContext = React.createContext<string|null>(null);



const Configurator:React.FC<ConfiguratorProps> = (props) => {

    const [next, setNext] = useState<string>(props.next);

    return (
        <>
            <NavBar
                isMenu={false}
            />
            <ConfiguratorContext.Provider value={next}>
                <ChooseActionHero/>
            </ConfiguratorContext.Provider>
        </>
    );
}

export default Configurator;


