import {Dodatek, PriceThreshold, Profile} from "../../types/types";
import {CalculatorResult, Dodatkowo} from "../../types/calcualtorResult";

let jsonProfileObject: Profile;


// field setter
const setJSON = (jsonProfile: Profile ) => {
    jsonProfileObject = jsonProfile;
}

// returns area as square meters instead of centimeters like the given input
const getArea = (longerEdge:number, shorterEdge: number, quantity: number) => {

    return ( getAreaOfOneSticker(longerEdge, shorterEdge) * quantity )
}

const getAreaOfOneSticker = (longerEdge:number, shorterEdge: number) => {
    let widthWithMargins =  jsonProfileObject.marginesy.szerokosc * 2 + longerEdge;
    let heightWithMargins =  jsonProfileObject.marginesy.wysokosc * 2 + shorterEdge;
    return (widthWithMargins * heightWithMargins) / 10000;
}

const getBasePrice = (area: number) :number => {
    return area * getSquareMeterCost(area);
}

const getSquareMeterCost = (area: number) => {
    let pricePerSquareMeter: number | undefined;

    jsonProfileObject.cena_za_1m_od_powierzchni_naklejki.forEach((item:PriceThreshold) => {
        if ( area > item.wieksze_niz && area <= item.mniejsze_rowne_niz) {
            pricePerSquareMeter = item.cena;
            // cannot break forEach :/
        }
    })

    if(pricePerSquareMeter === undefined){
        throw new Error("No valid price for this area was found!");
    }

    return pricePerSquareMeter;
}

const getDiscount = (area: number): number => {

    let discount = 0;

    jsonProfileObject.rabat.forEach((item) => {
        if( area >= item.wieksze_rowne) {
            discount = item.rabat_procenty;
        }
    })

    return discount;
}

const getFeaturesCostPerSquareMeter = (formParams: any) => {
    let additionalCostPerSquareMeter: number = 0;

    // finding additional features in form JSON params and then finding their values in the Configuration JSON
    Object.entries(formParams).forEach(([key, value]) => {
        if (value === true && key !== "krotszy_bok" && key !== "dluzszy_bok" && key !== "ilosc_szt") {
            jsonProfileObject.dodatki.forEach((it: Dodatek) => {
                if (it.typ === key) {
                    additionalCostPerSquareMeter += it.dodatkowo_za_1m;
                }
            });
        }
    });

    return additionalCostPerSquareMeter;
}

const getFeaturesCost = (area: number, formParams: any) => {

    return getFeaturesCostPerSquareMeter(formParams) * area;
}

const getMinimalPrice = (formParams: any) => {
    let minimalPrice = 0;

    // Base minimal price
    minimalPrice += jsonProfileObject.cena_minimalna;

    Object.entries(formParams).forEach(([key, value]) => {
        if (value === true && key !== "krotszy_bok" && key !== "dluzszy_bok" && key !== "ilosc_szt") {
            jsonProfileObject.dodatki.forEach((it: Dodatek) => {
                if (it.typ === key) {
                    minimalPrice += it.dodatkowo_do_ceny_minimalnej;
                }
            });
        }
    });
    return minimalPrice;
}

/**
 * Rounds a number to a specified number of decimal places.
 * @param num The number to be rounded.
 * @param decimalPlaces The number of decimal places to round to.
 * @returns The rounded number.
 */
function roundToDecimalPlaces(num: number, decimalPlaces: number): number {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(num * factor) / factor;
}

const calculatePrice = (formParams: any): CalculatorResult => {
    // area includes the margins as 2x jsonObject.marginesy.szerokosc + 2x jsonObject.marginesy.wysokosc!
    let area: number = getArea(formParams.dluzszy_bok, formParams.krotszy_bok, formParams.ilosc_szt);
    let basePrice: number = getBasePrice(area);
    let projectCost: number = jsonProfileObject.koszt_projektu;
    let additionalCostPerItem = jsonProfileObject.doplata_za_sztuke * formParams.ilosc_szt;
    let additionalFeaturesCost = getFeaturesCost(area, formParams);
    // calculated as overall discount including project cost!
    let discount: number = getDiscount(area);

    let totalPrice: number = basePrice + projectCost + additionalCostPerItem + additionalFeaturesCost;

    let discountedPrice: number = totalPrice - totalPrice * discount/100;

    let minimalPrice: number = getMinimalPrice(formParams);
    // Final price is given as netto!
    let finalPrice = discountedPrice < minimalPrice ? minimalPrice : discountedPrice;

    return packIntoJSON(formParams, finalPrice, minimalPrice);
}

const packIntoJSON = (formParams: any, priceNetto: number, minimalPriceNetto: number): CalculatorResult => {
    // Filter and transform formParams to create the Dodatkowo array

    const dodatki: Dodatkowo[] = Object.entries(formParams)
        .filter(([key]) => key !== "krotszy_bok" && key !== "dluzszy_bok" && key !== "ilosc_szt")
        .map(([key, value]) => ({
            typ: key,
            czy_zastosowany: Boolean(value)  // Ensure the value is a boolean
        }));

    // Create the CalculatorResult object
    return {
        typ: jsonProfileObject.type,
        dodatki: dodatki,
        cena_netto: roundToDecimalPlaces(priceNetto, 2),
        cena_brutto: roundToDecimalPlaces(convertToBrutto(priceNetto), 2),
        cena_minimalna_netto: roundToDecimalPlaces(minimalPriceNetto, 2),
        cena_minimalna_brutto:roundToDecimalPlaces(convertToBrutto(minimalPriceNetto), 2),
        cena_za_szt_netto: roundToDecimalPlaces(priceNetto / formParams.ilosc_szt, 3),
        ilosc_szt: formParams.ilosc_szt,
        wymiary: {
            krotszy_bok: formParams.krotszy_bok,
            dluzszy_bok: formParams.dluzszy_bok
        }
    };
};

const packIntoReversedJSON = (formParams: any, amountOfItemsFittingInMinimalPrice: number, minimalPriceNetto: number): CalculatorResult => {
    // Filter and transform formParams to create the Dodatkowo array

    const dodatki: Dodatkowo[] = Object.entries(formParams)
        .filter(([key]) => key !== "krotszy_bok" && key !== "dluzszy_bok" && key !== "ilosc_szt")
        .map(([key, value]) => ({
            typ: key,
            czy_zastosowany: Boolean(value)  // Ensure the value is a boolean
        }));

    // Create the CalculatorResult object
    return {
        typ: jsonProfileObject.type,
        dodatki: dodatki,
        cena_netto: minimalPriceNetto,
        cena_brutto: roundToDecimalPlaces(convertToBrutto(minimalPriceNetto), 2),
        cena_minimalna_netto: roundToDecimalPlaces(minimalPriceNetto, 2),
        cena_minimalna_brutto:roundToDecimalPlaces(convertToBrutto(minimalPriceNetto), 2),
        cena_za_szt_netto: roundToDecimalPlaces(minimalPriceNetto / amountOfItemsFittingInMinimalPrice, 3),
        ilosc_szt: roundToDecimalPlaces(amountOfItemsFittingInMinimalPrice, 0),
        wymiary: {
            krotszy_bok: formParams.krotszy_bok,
            dluzszy_bok: formParams.dluzszy_bok
        }
    };
};


const convertToBrutto = (priceNetto: number): number => {

    // assuming that VAT is 23%
    // TODO: add VAT to json configuration to ease changing in the future

    return priceNetto / 1.23;
}

const reversedCalculations = (formParams: any) => {
    // area includes the margins as 2x jsonObject.marginesy.szerokosc + 2x jsonObject.marginesy.wysokosc!

    // Calculate the area of one sticker
    let areaOfASticker: number = getAreaOfOneSticker(formParams.dluzszy_bok, formParams.krotszy_bok);
    console.log('Area of one sticker:', areaOfASticker);

    // Get the project cost
    let projectCost: number = jsonProfileObject.koszt_projektu;
    console.log('Project cost:', projectCost);

    // Calculate the square meter cost including features cost
    let squareMeterCost = getSquareMeterCost(areaOfASticker);
    console.log('Square meter cost:', squareMeterCost);

    // Get the additional cost per item
    let additionalCostPerItem = jsonProfileObject.doplata_za_sztuke;
    console.log('Additional cost per item:', additionalCostPerItem);

    // Calculate the minimal price
    let minimalPrice: number = getMinimalPrice(formParams);
    console.log('Minimal price:', minimalPrice);

    // Calculate the amount of items fitting in minimal price
    let amountOfItemsFittingInMinimalPrice = (minimalPrice - projectCost) / (areaOfASticker * squareMeterCost + additionalCostPerItem);
    console.log('Amount of items fitting in minimal price:', amountOfItemsFittingInMinimalPrice);

    // Pack the result into JSON
    return packIntoReversedJSON(formParams, amountOfItemsFittingInMinimalPrice, minimalPrice);
}




export {setJSON, calculatePrice, convertToBrutto, getMinimalPrice, reversedCalculations};
