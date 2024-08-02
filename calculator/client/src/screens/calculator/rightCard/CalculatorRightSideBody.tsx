import React from 'react';
import CalculatorHeader from "../../../components/CalculatorHeader";
import styled from "styled-components";
import CustomButton from "../../../components/CustomButton";
import {CalculatorResult} from "../../../types/calcualtorResult";

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

interface Props {
    calc: CalculatorResult;
}

const CalculatorRightSideBody: React.FC<Props> = ({calc}) => {

    // const [netto, setNetto] = useState<number>(calc.cena_netto);
    // const [brutto, setBrutto] = useState<number>(calc.cena_brutto);
    // const [minimalNetto, setMinimalNetto] = useState<number>(calc.cena_minimalna_netto);
    // const [minimalBrutto, setMinimalBrutto] = useState<number>(calc.cena_minimalna_brutto);
    // const [perItem, setPerItem] = useState<number>(calc.cena_za_szt_netto);

    return (
        <StyledBody>
            <CalculatorHeader title={"Do zapłaty:"} color={"white"}></CalculatorHeader>
            <PricingWrapper>
                <SmallPricingWrapper>
                    <SmallPricing>
                        <SmallPricingPrimary>{calc.cena_netto}zł netto</SmallPricingPrimary>
                        <SmallPricingSecondary>(minimalna opłata {calc.cena_minimalna_netto}zł)</SmallPricingSecondary>
                    </SmallPricing>
                    <SmallPricing>
                        <SmallPricingPrimary>{calc.cena_brutto}zł brutto</SmallPricingPrimary>
                        <SmallPricingSecondary>(minimalna opłata {calc.cena_minimalna_brutto}zł)</SmallPricingSecondary>
                    </SmallPricing>
                </SmallPricingWrapper>

                <PricingPerItemWrapper>
                    <PricingPerItemBig>Cena za 1 sztukę:</PricingPerItemBig>
                    <PricingPerItemSmall>{calc.cena_za_szt_netto}zł</PricingPerItemSmall>
                </PricingPerItemWrapper>
            </PricingWrapper>

            <ButtonWrapper>
                <CustomButton text={"ZAMÓW WYCENĘ"}/>
            </ButtonWrapper>

        </StyledBody>
    );
}

export default CalculatorRightSideBody;


