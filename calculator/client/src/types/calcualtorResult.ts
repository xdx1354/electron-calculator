interface Dodatkowo {
    typ: string;
    czy_zastosowany: boolean;
}

interface Wymiary {
    krotszy_bok: number;
    dluzszy_bok: number;
}

interface CalculatorResult {
    typ: string;
    dodatki: Dodatkowo[];
    cena_brutto: number;
    cena_netto: number;
    ilosc_szt: number;
    wymiary: Wymiary;
    cena_minimalna_netto: number;
    cena_minimalna_brutto: number;
    cena_za_szt_netto: number;
}

export type {Dodatkowo, Wymiary, CalculatorResult};