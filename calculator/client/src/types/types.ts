// Interface for individual price per 1m
interface PriceThreshold {
    id: number
    wieksze_niz: number;
    mniejsze_rowne_niz: number;
    cena: number;
}

// Interface for individual extra feature
interface Dodatek {
    typ: string;
    dodatkowo_za_1m: number;
    dodatkowo_do_ceny_minimalnej: number;
}

// Interface for discount
interface RabatValue {
    wieksze_rowne: number;
    rabat_procenty: number;
}

// Interface for dimensions
interface Wymiary {
    max_krotszy_bok: number;
    max_dluzszy_bok: number;
}

// Interface for margins
interface Marginesy {
    szerokosc: number;
    wysokosc: number;
}

// Main interface for profile
interface Profile {
    type: string;
    cena_za_1m_od_powierzchni_naklejki: PriceThreshold[];
    cena_minimalna: number;
    koszt_projektu: number;
    doplata_za_sztuke: number;
    dodatki: Dodatek[];
    rabat: RabatValue[];
    wymiary: Wymiary;
    marginesy: Marginesy;
}

// Main interface for the entire JSON response
interface JsonResponse {
    profile: Profile;
}

export type { JsonResponse, Profile, PriceThreshold, Dodatek, RabatValue, Wymiary, Marginesy };
