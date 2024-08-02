import {Dodatek, PriceThreshold, Profile} from "../../types/types";

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
    let areaSquareMeters = (widthWithMargins * heightWithMargins * quantity) / 10000;

    return areaSquareMeters;
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

const calculatePrice = (formParams: any): number => {
    // area includes the margins as 2x jsonObject.marginesy.szerokosc + 2x jsonObject.marginesy.wysokosc!
    let area: number = getArea(formParams.dluzszy_bok, formParams.krotszy_bok, formParams.ilosc_szt);
    console.log("Area: ", area);
    let basePrice: number = getBasePrice(area);
    console.log("BasePrice: ", basePrice);
    let projectCost: number = jsonProfileObject.koszt_projektu;
    let additionalCostPerItem = jsonProfileObject.doplata_za_sztuke * formParams.ilosc_szt;
    let additionalFeaturesCost = getFeaturesCost(area, formParams);
    console.log("Additional features costs:", additionalFeaturesCost);
    // calculated as overall discount including project cost!
    let discount: number = getDiscount(area);

    let totalPrice: number = basePrice + projectCost + additionalCostPerItem + additionalFeaturesCost;

    let discountedPrice: number = totalPrice - totalPrice * discount/100;

    let minimalPrice: number = getMinimalPrice(formParams);
    console.log("Minimal Price: ", minimalPrice);
    // Final price is given as netto!
    let finalPrice = discountedPrice < minimalPrice ? minimalPrice : discountedPrice;
    console.log("Inside Price Netto:", finalPrice);
    return finalPrice;
}

const convertToBrutto = (priceNetto: number): number => {

    // assuming that VAT is 23%
    // TODO: add VAT to json configuration to ease changing in the future

    return priceNetto / 1.23;
}




export {setJSON, calculatePrice, convertToBrutto};
