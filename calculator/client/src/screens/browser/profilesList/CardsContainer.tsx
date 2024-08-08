import React, {useEffect, useState} from "react";
import ProfileCard from "./ProfileCard";
import styled from "styled-components";
import {JsonResponse} from "../../../types/types";

const CardsWrapper = styled.div`
    width: 95%;
    height: 100%;
    //margin: 3vh 0vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow-y: auto;
    overflow-x: hidden;
    //background-color: #069a68;
`;

type FileName = string;

const CardsContainer: React.FC = () => {

    const [error, setError] = useState<any>(null);
    const [configsList, setConfigsList] = useState<FileName[]>([]);

    useEffect(() => {
        fetchFiles().then(() => console.log("fetching files successful"))
    }, [])

    const fetchFiles = async () => {
        try {
            const response:Response = await fetch('http://localhost:4001/files');

            if(!response.ok) {
                console.log('Error!');
                throw new Error('Failed to fetch config');
            }

            const data = await response.json(); // parsing response to JSON
            console.log(data);
            setConfigsList(data.files);

        } catch (error) {
            setError(error);
            console.error(error);
        }
    }

    const fetchConfig = async (name:string) => {
        try {
            const response = await fetch('http://localhost:4001/config/' + name);

            if(!response.ok) {
                console.log('Error!');
                throw new Error('Failed to fetch config');
            }

            const data : JsonResponse = await response.json(); // parsing response to JSON

            return data;

        } catch (error) {
            setError(error);
            console.error(error);
            throw error;
        }
    }


    return(
        <CardsWrapper>
            {configsList.map((item, key) => (
                <>
                    <ProfileCard name={item} fetchConfig={() => fetchConfig(item)}/>
                </>

            ))}
        </CardsWrapper>
    )
}

export default CardsContainer;