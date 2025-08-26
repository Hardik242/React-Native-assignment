import {Metal} from "../types";

export const MOCK_API_DATA = {
    rates: {
        XAU: 0.00042,
        XAG: 0.025,
        XPT: 0.00085,
        XPD: 0.00095,
    },
    conversions: {
        USD: 1,
        INR: 83.5,
        EUR: 0.92,
        GBP: 0.79,
        JPY: 157.0,
    },
};

export const METALS: Metal[] = [
    {symbol: "XAU", name: "Gold", color: "#FFD700"},
    {symbol: "XAG", name: "Silver", color: "#C0C0C0"},
    {symbol: "XPT", name: "Platinum", color: "#E5E4E2"},
    {symbol: "XPD", name: "Palladium", color: "#CED0DD"},
];

export type CurrencyCode = keyof typeof MOCK_API_DATA.conversions;

export const CURRENCIES: CurrencyCode[] = ["USD", "INR", "EUR", "GBP", "JPY"];

export const CURRENCY_SYMBOLS: {[key: string]: string} = {
    USD: "$",
    INR: "₹",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
};
