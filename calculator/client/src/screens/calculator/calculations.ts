import {Dodatek, PriceThreshold, Profile} from "../../types/types";
import {CalculatorResult, Dodatkowo} from "../../types/calcualtorResult";

let jsonProfileObject: Profile;


// field setter
const setJSON = (jsonProfile: Profile ) => {
    jsonProfileObject = jsonProfile;
    console.log("setJSON", jsonProfileObject);
}

// returns area as square meters instead of centimeters like the given input
const getArea = (longerEdge:number, shorterEdge: number, quantity: number) => {
    let widthWithMargins =  jsonProfileObject.marginesy.szerokosc * 2 + longerEdge;
    let heightWithMargins =  jsonProfileObject.marginesy.wysokosc * 2 + shorterEdge;
    return (widthWithMargins * heightWithMargins * quantity) / 10000;
}

const getBasePrice = (area: number) :number => {
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

    return area * pricePerSquareMeter;
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

const getFeaturesCost = (area: number, formParams: any) => {

    let additionalCostPerSquareMeter: number = 0;

    // finding additional features in Form JSON params and then finding their values in the Configuration JSON
    Object.entries(formParams).forEach(([key, value]) => {
        if (value === true && key !== "krotszy_bok" && key !== "dluzszy_bok" && key !== "ilosc_szt") {
            jsonProfileObject.dodatki.forEach((it: Dodatek) => {
                if (it.typ === key) {
                    additionalCostPerSquareMeter += it.dodatkowo_za_1m;
                }
            });
        }
    });

    return additionalCostPerSquareMeter * area;
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
        cena_netto: priceNetto,
        cena_brutto: convertToBrutto(priceNetto),
        cena_minimalna_netto: minimalPriceNetto,
        cena_minimalna_brutto: convertToBrutto(minimalPriceNetto),
        cena_za_szt_netto: priceNetto / formParams.ilosc_szt,
        ilosc_szt: formParams.ilosc_szt,
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




export {setJSON, calculatePrice, convertToBrutto};
