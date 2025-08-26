import React, {createContext, useState, ReactNode} from "react";
// Import the new type
import {CURRENCIES, CurrencyCode} from "../constants/api";

// Define the context type using CurrencyCode
type CurrencyContextType = {
    currency: CurrencyCode;
    setCurrency: (currency: CurrencyCode) => void;
};

export const CurrencyContext = createContext<CurrencyContextType | undefined>(
    undefined
);

export const CurrencyProvider = ({children}: {children: ReactNode}) => {
    // Update the state to use the CurrencyCode type
    const [currency, setCurrency] = useState<CurrencyCode>(CURRENCIES[0]);

    return (
        <CurrencyContext.Provider value={{currency, setCurrency}}>
            {children}
        </CurrencyContext.Provider>
    );
};
