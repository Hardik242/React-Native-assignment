import React from "react";
import {StatusBar} from "expo-status-bar";
import AppNavigator from "./src/navigation/AppNavigator";
import {CurrencyProvider} from "./src/context/CurrencyContext";

export default function App() {
    return (
        <CurrencyProvider>
            <AppNavigator />
            <StatusBar style="light" />
        </CurrencyProvider>
    );
}
