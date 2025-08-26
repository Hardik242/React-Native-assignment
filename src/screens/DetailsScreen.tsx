import React, {useState, useEffect, useMemo, useContext} from "react";
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import type {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../types";
import {Colors, GlobalStyles} from "../styles/theme";
import {DetailSectionLoader} from "../components/Loaders";
import {CurrencyContext} from "../context/CurrencyContext";
import {CURRENCY_SYMBOLS} from "../constants/api";

type Props = NativeStackScreenProps<RootStackParamList, "Details">;
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

type OhlcData = {
    open: number;
    high: number;
    low: number;
    close: number;
};

// Fetches real OHLC data for a given metal and currency
const fetchOhlcData = async (
    baseMetal: string,
    quoteCurrency: string
): Promise<OhlcData> => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dateString = yesterday.toISOString().split("T")[0]; // Format YYYY-MM-DD

    const url = `https://api.metalpriceapi.com/v1/ohlc?api_key=${API_KEY}&base=${baseMetal}&currency=${quoteCurrency}&date=${dateString}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.success) {
        throw new Error(
            data.error?.info || `Failed to fetch OHLC data for ${baseMetal}.`
        );
    }
    return data.rate;
};

const DetailsScreen = ({route}: Props) => {
    const {metal} = route.params;
    const [isLoading, setIsLoading] = useState(true);
    const [ohlcData, setOhlcData] = useState<OhlcData | null>(null);

    const currencyContext = useContext(CurrencyContext);
    if (!currencyContext)
        throw new Error("DetailsScreen must be used within a CurrencyProvider");
    const {currency} = currencyContext;
    const currencySymbol = CURRENCY_SYMBOLS[currency];

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            try {
                const data = await fetchOhlcData(metal.symbol, currency);
                setOhlcData(data);
            } catch (error) {
                console.error(error);
                // Handle error state in UI if needed
            } finally {
                setIsLoading(false);
            }
        };
        getData();
    }, [metal.symbol, currency]);

    const StatItem = ({label, value}: {label: string; value: string}) => (
        <View style={styles.statItem}>
            <Text style={styles.statLabel}>{label}</Text>
            <Text style={styles.statValue}>{value}</Text>
        </View>
    );

    return (
        <SafeAreaView style={GlobalStyles.safeArea}>
            <ScrollView>
                <View style={GlobalStyles.container}>
                    <View style={styles.headerContainer}>
                        <View
                            style={[
                                styles.icon,
                                {backgroundColor: metal.color},
                            ]}
                        />
                        <View>
                            <Text style={styles.name}>{metal.name}</Text>
                            <Text style={styles.symbol}>{metal.symbol}</Text>
                        </View>
                    </View>

                    {isLoading ? (
                        <DetailSectionLoader />
                    ) : (
                        ohlcData && (
                            <>
                                {/* Key Statistics Section */}
                                <View style={styles.statsCard}>
                                    <View style={styles.statsRow}>
                                        <StatItem
                                            label="Open"
                                            value={`${currencySymbol}${ohlcData.open.toFixed(
                                                2
                                            )}`}
                                        />
                                        <StatItem
                                            label="High"
                                            value={`${currencySymbol}${ohlcData.high.toFixed(
                                                2
                                            )}`}
                                        />
                                    </View>
                                    <View style={styles.statsRow}>
                                        <StatItem
                                            label="Low"
                                            value={`${currencySymbol}${ohlcData.low.toFixed(
                                                2
                                            )}`}
                                        />
                                        <StatItem
                                            label="Close"
                                            value={`${currencySymbol}${ohlcData.close.toFixed(
                                                2
                                            )}`}
                                        />
                                    </View>
                                </View>

                                {/* Mock Chart Section */}
                                <View style={styles.chartContainer}>
                                    <Text style={styles.chartTitle}>
                                        Yesterday's Price Range
                                    </Text>
                                    <View style={styles.chartPlaceholder}>
                                        <Text style={styles.chartText}>
                                            High: {currencySymbol}
                                            {ohlcData.high.toFixed(2)}
                                        </Text>
                                        <View style={styles.chartBar} />
                                        <Text style={styles.chartText}>
                                            Low: {currencySymbol}
                                            {ohlcData.low.toFixed(2)}
                                        </Text>
                                    </View>
                                </View>
                            </>
                        )
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

// --- Styles remain largely the same, with minor additions for the new chart placeholder ---
const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 24,
    },
    icon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    name: {
        fontSize: 28,
        fontWeight: "bold",
        color: Colors.text,
    },
    symbol: {
        fontSize: 16,
        color: Colors.textSecondary,
    },
    statsCard: {
        backgroundColor: Colors.surface,
        borderRadius: 16,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 4,
        marginBottom: 24,
        shadowColor: "#AAB8C2",
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    statItem: {
        flex: 1,
        alignItems: "flex-start",
    },
    statLabel: {
        color: Colors.textSecondary,
        fontSize: 14,
        marginBottom: 4,
    },
    statValue: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: "600",
    },
    chartContainer: {
        backgroundColor: Colors.surface,
        borderRadius: 16,
        padding: 20,
        shadowColor: "#AAB8C2",
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    chartTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: Colors.text,
        marginBottom: 16,
        textAlign: "center",
    },
    chartPlaceholder: {
        height: 150,
        justifyContent: "space-between",
        alignItems: "center",
    },
    chartBar: {
        flex: 1,
        width: 8,
        backgroundColor: Colors.border,
        marginVertical: 10,
    },
    chartText: {
        fontSize: 14,
        color: Colors.textSecondary,
        fontWeight: "500",
    },
});

export default DetailsScreen;
