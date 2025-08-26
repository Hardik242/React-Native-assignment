import React from "react";
import {View, ActivityIndicator, StyleSheet} from "react-native";
import {Colors} from "../styles/theme";

export const HomeScreenLoader = () => (
    <View style={styles.container}>
        {[...Array(7)].map((_, i) => (
            <View key={i} style={styles.skeletonItem}>
                <View style={styles.skeletonIcon} />
                <View style={styles.skeletonTextContainer}>
                    <View style={styles.skeletonTextLong} />
                    <View style={styles.skeletonTextShort} />
                </View>
            </View>
        ))}
    </View>
);

export const DetailSectionLoader = () => (
    <View style={styles.detailLoader}>
        <ActivityIndicator size="large" color={Colors.primary} />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 0,
    },
    skeletonItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        backgroundColor: Colors.surface,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    skeletonIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#E2E8F0",
        marginRight: 16,
    },
    skeletonTextContainer: {
        flex: 1,
        justifyContent: "center",
    },
    skeletonTextLong: {
        width: "70%",
        height: 18,
        backgroundColor: "#E2E8F0",
        borderRadius: 4,
        marginBottom: 8,
    },
    skeletonTextShort: {
        width: "40%",
        height: 14,
        backgroundColor: "#E2E8F0",
        borderRadius: 4,
    },
    detailLoader: {
        height: 200,
        justifyContent: "center",
        alignItems: "center",
    },
});
