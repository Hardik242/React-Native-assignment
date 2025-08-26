import React from "react";
import {TouchableOpacity, View, Text, StyleSheet} from "react-native";
import {CURRENCY_SYMBOLS} from "../constants/api";
import {Metal} from "../types";
import {Colors} from "../styles/theme";

type MetalListItemProps = {
    item: Metal;
    price?: number;
    currency: string;
    onPress: () => void;
};

export const MetalListItem = ({
    item,
    price,
    currency,
    onPress,
}: MetalListItemProps) => {
    const formattedPrice = price
        ? `${CURRENCY_SYMBOLS[currency] || ""}${price.toFixed(2)}`
        : "...";

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={[styles.icon, {backgroundColor: item.color}]} />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.symbol}>{item.symbol}</Text>
            </View>
            <Text style={styles.price}>{formattedPrice}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        backgroundColor: Colors.surface,
        borderRadius: 16,
        marginBottom: 12,
        shadowColor: "#AAB8C2",
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    icon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        marginRight: 16,
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: "600",
        color: Colors.text,
    },
    symbol: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    price: {
        fontSize: 18,
        fontWeight: "bold",
        color: Colors.text,
    },
});
