import React, {useState} from 'react';
import CalculatorHeader from "../../../components/CalculatorHeader";
import CustomInput from "../../../components/FormField";
import styled from "styled-components";
import CustomButton from "../../../components/CustomButton";

const StyledBody = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 13px;
    height: 80%;
    width: 40%;
    margin: 1% 1.5%; // top-bottom left-right
    padding: 5%;
    z-index: 1;
`

const SmallPricingPrimary = styled.p`
    font-size: 21px;
    font-family: "Roboto Black",serif;
    margin: 0;
    font-style: italic;
`

const SmallPricingSecondary = styled.p`
    font-size: 13px;
    font-style: italic;
    margin: 0;
`

const SmallPricing = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #ffffff;
    margin-top: 2%;
`

const SmallPricingWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 20%;
    margin-bottom: 3%;
`

const PricingPerItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
    color: white;
`

const PricingPerItemBig = styled.p`
    font-family: "Roboto",serif;
    font-size: 30px;
    margin: 0;
`

const PricingPerItemSmall = styled.p`
    font-family: "Roboto Black",serif;
    font-size: 21px;
    margin: 0;
    font-style: italic;
    margin-top: 1.5%;
    
`

const PricingWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 60%;
`

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`



function CalculatorRightSideBody() {

    const [netto, setNetto] = useState<number>(0);
    const [brutto, setBrutto] = useState<number>(0);
    const [minimalNetto, setMinimalNetto] = useState<number>(0);
    const [minimalBrutto, setMinimalBrutto] = useState<number>(0);
    const [perItem, setPerItem] = useState<number>(0);

    return (
        <StyledBody>
            <CalculatorHeader title={"Do zapłaty:"} color={"white"}></CalculatorHeader>
            <PricingWrapper>
                <SmallPricingWrapper>
                    <SmallPricing>
                        <SmallPricingPrimary>{netto}zł netto</SmallPricingPrimary>
                        <SmallPricingSecondary>(minimalna opłata {minimalNetto}zł)</SmallPricingSecondary>
                    </SmallPricing>
                    <SmallPricing>
                        <SmallPricingPrimary>{brutto}zł brutto</SmallPricingPrimary>
                        <SmallPricingSecondary>(minimalna opłata {minimalBrutto}zł)</SmallPricingSecondary>
                    </SmallPricing>
                </SmallPricingWrapper>

                <PricingPerItemWrapper>
                    <PricingPerItemBig>Cena za 1 sztukę:</PricingPerItemBig>
                    <PricingPerItemSmall>{perItem}zł</PricingPerItemSmall>
                </PricingPerItemWrapper>
            </PricingWrapper>

            <ButtonWrapper>
                <CustomButton text={"ZAMÓW WYCENĘ"}/>
            </ButtonWrapper>

        </StyledBody>
    );
}

export default CalculatorRightSideBody;


