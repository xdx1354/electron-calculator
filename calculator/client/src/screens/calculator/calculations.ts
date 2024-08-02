import {PriceThreshold, Profile} from "../../types/types";

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

const getFeaturesCost = (area: number) => {

    let additionalCostPerSquareMeter: number = 0;

    jsonProfileObject.dodatki.forEach((item) => {
        additionalCostPerSquareMeter += item.dodatkowo_za_1m;
    })

    return additionalCostPerSquareMeter * area;
}

const getMinimalPrice = () => {
    let minimalPrice = 0;

    // Base minimal price
    minimalPrice += jsonProfileObject.cena_minimalna;

    // Additional minimal price for each feature
    jsonProfileObject.dodatki.forEach((item) => {
        minimalPrice += item.dodatkowo_do_ceny_minimalnej;
    })

    return minimalPrice;
}

const calculatePrice = (longerEdge:number, shorterEdge: number, quantity: number): number => {

    // area includes the margins as 2x jsonObject.marginesy.szerokosc + 2x jsonObject.marginesy.wysokosc!
    let area: number = getArea(longerEdge, shorterEdge, quantity);
    console.log("Area: ", area);
    let basePrice: number = getBasePrice(area);
    console.log("BasePrice: ", basePrice);
    let projectCost: number = jsonProfileObject.koszt_projektu;
    let additionalCostPerItem = jsonProfileObject.doplata_za_sztuke * quantity;
    let additionalFeaturesCost = getFeaturesCost(area);

    // calculated as overall discount including project cost!
    let discount: number = getDiscount(area);

    let totalPrice: number = basePrice + projectCost + additionalCostPerItem + additionalFeaturesCost;

    let discountedPrice: number = totalPrice - totalPrice * discount/100;

    let minimalPrice: number = getMinimalPrice();
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
