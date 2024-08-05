import React from "react";
import styled from "styled-components";
import CustomButton from "../../../components/CustomButton";
import {JsonResponse} from "../../../types/types";
import {useNavigate} from "react-router-dom";

const Card = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    height: 20vh; // does not work 
    padding: 1vh 3vh;
    margin: 1vh;
    background-color: #FBFBFB;
    border-radius: 8px;
`
type Props = {
    name: string;
    fetchConfig: () => Promise<JsonResponse>;
}

const ProfileCard: React.FC<Props> = (props) => {

    const navigate = useNavigate();

    const getName = () => {
        return props.name.substring(0, props.name.length - 5);
    }

    const handleClick = async () => {
        try {
            console.log('Selected profile name:', props.name);
            const fetchedConfig= await props.fetchConfig();
            console.log('CONFIG:', fetchedConfig); // Should log the updated config

            navigate('/editor', { state: { profile: fetchedConfig.profile } });
        } catch (error) {
            console.error('Error navigating:', error);
        }
    }

    return(
        <Card>
            <h3>{getName()}</h3>
            <CustomButton text="EDIT" function={handleClick} />
        </Card>
    )
}

export default ProfileCard