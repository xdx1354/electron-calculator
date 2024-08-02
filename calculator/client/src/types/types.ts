// Interface for individual price per 1m
interface CenaZa1m {
    wieksze_niz: number;
    mniejsze_rowne_niz: number;
    cena: number;
}

// Interface for the price thresholds
interface PriceThresholds {
    [key: string]: CenaZa1m;
}

// Interface for individual extra feature
interface Dodatek {
    typ: string;
    dodatkowo_za_1m: number;
    dodatkowo_do_ceny_minimalnej: number;
}

// Interface for discount
interface Rabat {
    [key: number]: number; // Keys are numbers, values are also numbers
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
    cena_za_1m_od_powierzchni_naklejki: PriceThresholds;
    cena_minimalna: number;
    koszt_projektu: number;
    doplata_za_sztuke: number;
    dodatki: Dodatek[];
    rabat: Rabat;
    wymiary: Wymiary;
    marginesy: Marginesy;
}

// Main interface for the entire JSON response
interface JsonResponse {
    profile: Profile;
}

export type { JsonResponse, Profile, CenaZa1m, PriceThresholds, Dodatek, Rabat, Wymiary, Marginesy };
