import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { StackedTabbedParamList, TabbedRootStackParamList } from "../types/pages";
import { loginResponse } from "../types/responses";
import getCurrentUser from "../utils/getCurrentUser";
import AccountSettingsPage from "./accountSettings";
import Profile from "./profile";

type Props = BottomTabScreenProps<TabbedRootStackParamList, 'ProfileNavigator'>;
export default function ProfileNavigator({ navigation, route }: Props) {
    const Stack = createNativeStackNavigator<StackedTabbedParamList>();

    return (
        <Stack.Navigator initialRouteName="Profile">
            <Stack.Screen name="Profile" component={Profile} initialParams={{ userID: 0 }} />
            <Stack.Screen name="AccountSettings" component={AccountSettingsPage} />
        </Stack.Navigator>
    )

}