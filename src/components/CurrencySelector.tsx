import React, {useContext} from "react";
import {ScrollView, TouchableOpacity, Text, StyleSheet} from "react-native";
import {CurrencyContext} from "../context/CurrencyContext";
import {CURRENCIES} from "../constants/api";
import {Colors} from "../styles/theme";

type CurrencySelectorProps = {
    disabled: boolean;
};

export const CurrencySelector = ({disabled}: CurrencySelectorProps) => {
    const context = useContext(CurrencyContext);
    if (!context) return null;
    const {currency, setCurrency} = context;

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.container}>
            {CURRENCIES.map((c) => (
                <TouchableOpacity
                    key={c}
                    disabled={disabled}
                    style={[
                        styles.button,
                        currency === c && styles.selectedButton,
                        disabled && styles.disabledButton,
                    ]}
                    onPress={() => setCurrency(c)}>
                    <Text
                        style={[
                            styles.buttonText,
                            currency === c && styles.selectedButtonText,
                        ]}>
                        {c}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
        flexShrink: 0,
        flexGrow: 0,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginRight: 10,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    selectedButton: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    disabledButton: {
        opacity: 0.5,
    },
    buttonText: {
        color: Colors.text,
        fontWeight: "600",
        fontSize: 14,
    },
    selectedButtonText: {
        color: "#FFFFFF",
    },
});
