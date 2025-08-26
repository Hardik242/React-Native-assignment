import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import {RootStackParamList} from "../types";
import {Colors} from "../styles/theme";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {backgroundColor: Colors.background},
                    headerTintColor: Colors.text,
                    headerShadowVisible: false,
                    headerTitleStyle: {
                        fontWeight: "600",
                    },
                    contentStyle: {backgroundColor: Colors.background},
                }}>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Details"
                    component={DetailsScreen}
                    options={({route}) => ({title: route.params.metal.name})}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
