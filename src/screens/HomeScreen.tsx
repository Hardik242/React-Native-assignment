import React from "react";
import {View, Text, FlatList, SafeAreaView} from "react-native";
import type {NativeStackScreenProps} from "@react-navigation/native-stack";
import {useMetalPrices} from "../hooks/useMetalPrices";
import {METALS} from "../constants/api";
import {CurrencySelector} from "../components/CurrencySelector";
import {MetalListItem} from "../components/MetalListItem";
import {HomeScreenLoader} from "../components/Loaders";
import {RootStackParamList} from "../types";
import {GlobalStyles} from "../styles/theme";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen = ({navigation}: Props) => {
    const {data, loading, error, currency} = useMetalPrices();

    return (
        <SafeAreaView style={GlobalStyles.safeArea}>
            <View style={GlobalStyles.container}>
                <Text style={GlobalStyles.headerTitle}>Metal Prices</Text>
                <Text style={GlobalStyles.headerSubtitle}>
                    Live rates from the global markets
                </Text>
                <CurrencySelector disabled={loading} />
                {error && <Text style={GlobalStyles.errorText}>{error}</Text>}
                {loading ? (
                    <HomeScreenLoader />
                ) : (
                    <FlatList
                        data={METALS}
                        renderItem={({item}) => (
                            <MetalListItem
                                item={item}
                                price={data[item.symbol]}
                                currency={currency}
                                onPress={() =>
                                    navigation.navigate("Details", {
                                        metal: item,
                                    })
                                }
                            />
                        )}
                        keyExtractor={(item) => item.symbol}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
