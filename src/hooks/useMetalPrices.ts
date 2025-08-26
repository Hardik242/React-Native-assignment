import {useState, useEffect, useContext, useRef} from "react";
import {CurrencyContext} from "../context/CurrencyContext";
import {METALS} from "../constants/api";
import {PriceData} from "../types";
import {CurrencyCode} from "../constants/api";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const API_BASE_URL = "https://api.metalpriceapi.com/v1";
const REFRESH_INTERVAL = 300000; // 5 minutes in milliseconds

const fetchMetalPrices = async (currency: CurrencyCode): Promise<PriceData> => {
    console.log(`Fetching prices for ${currency}...`);

    const metalSymbols = METALS.map((m) => m.symbol).join(",");
    const url = `${API_BASE_URL}/latest?api_key=${API_KEY}&base=${currency}&currencies=${metalSymbols}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.success) {
        throw new Error(data.error?.info || "Failed to fetch metal prices.");
    }

    const prices: PriceData = {};
    for (const symbol in data.rates) {
        prices[symbol] = 1 / data.rates[symbol];
    }
    return prices;
};

export const useMetalPrices = () => {
    const currencyContext = useContext(CurrencyContext);
    if (!currencyContext)
        throw new Error(
            "useMetalPrices must be used within a CurrencyProvider"
        );

    const {currency} = currencyContext;
    const [data, setData] = useState<PriceData>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!API_KEY) {
            setError("API key is missing. Please check your .env file.");
            setLoading(false);
            return;
        }

        // This function fetches data but doesn't set loading state on interval runs
        const getPrices = async (isInitialLoad = false) => {
            if (isInitialLoad) {
                setLoading(true);
            }
            try {
                setError(null);
                const prices = await fetchMetalPrices(currency);
                setData(prices);
            } catch (e: any) {
                setError(e.message || "An unknown error occurred.");
                console.error(e);
            } finally {
                if (isInitialLoad) {
                    setLoading(false);
                }
            }
        };

        // --- Start of Interval Logic ---

        // 1. Fetch data immediately on component load
        getPrices(true);

        // 2. Set up an interval to refetch data every 5 minutes
        const intervalId = setInterval(() => {
            console.log("Refreshing prices...");
            getPrices(false); // `false` so it doesn't show the loading skeleton on refresh
        }, REFRESH_INTERVAL);

        // 3. Cleanup: Clear the interval when the component unmounts
        return () => clearInterval(intervalId);

        // --- End of Interval Logic ---
    }, [currency]); // This effect re-runs if the currency changes

    return {data, loading, error, currency};
};
