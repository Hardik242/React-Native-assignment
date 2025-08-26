import {StyleSheet} from "react-native";

export const Colors = {
    background: "#F4F7FC",
    surface: "#FFFFFF",
    primary: "#4A90E2",
    text: "#2D3748",
    textSecondary: "#718096",
    accent: "#FFD700",
    border: "#E2E8F0",
    positive: "#48BB78",
    negative: "#F56565",
};

export const GlobalStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors.background,
    },
    headerTitle: {
        fontSize: 34,
        fontWeight: "bold",
        color: Colors.text,
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 16,
        color: Colors.textSecondary,
        marginBottom: 24,
    },
    errorText: {
        color: Colors.negative,
        textAlign: "center",
        marginVertical: 16,
    },
});
