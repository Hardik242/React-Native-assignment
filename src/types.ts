export type Metal = {
    symbol: string;
    name: string;
    color: string;
};

export type PriceData = {
    [key: string]: number;
};

// Defines the screens and the params they expect for type-safe navigation
export type RootStackParamList = {
    Home: undefined; // No params for Home screen
    Details: {metal: Metal}; // Details screen expects a 'metal' object
};
