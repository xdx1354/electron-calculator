import styled from 'styled-components'

const StyledCheckBox = styled.input`
    border-radius: 10px;
    height: 21px;
    width: 20%;
    border-color: #c3b5b5;
    border-style: solid;
    border-width: 1px;
    margin-top: 3px;
    //padding-left: 15px;
`;


const StyledLabel = styled.label`
    width: 30%;
`;

const StyledDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: 40px;
    width: 100%;
`;

const CustomCheckBox = ({ ...props }) => {
    return (
        <>
            <StyledDiv>
                <StyledLabel htmlFor="shorter-edge" >{props.label}</StyledLabel>
                <StyledCheckBox
                    type={props.type}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                    name={props.name}
                />
            </StyledDiv>
        </>
    )
}


export default CustomCheckBox
