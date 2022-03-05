import { createDrawerNavigator } from "@react-navigation/drawer";
import { useState } from "react";
import AuthenticationNavigator from "./authenticationNavigator";
import { View, Text } from 'native-base'
import Profile from "../pages/profile";
import ProfileNavigator from "./profileNavigator";
import SearchPage from "../pages/search";
import SearchNavigator from "./searchNavigator";

export type RootNavigator = {
    // No Auth Required
    Authentication: {
        setIsAuthed: React.Dispatch<React.SetStateAction<boolean>>
    };
}

export type AuthedRootNavigator = {
    Profile: {
        userID: number
        setIsAuthed: React.Dispatch<React.SetStateAction<boolean>>
    };
    Search: undefined;
}

export default function RootNavigator() {
    const [isAuthed, setIsAuthed] = useState<boolean>(false);
    const Drawer = createDrawerNavigator<RootNavigator>();
    const AuthedDrawer = createDrawerNavigator<AuthedRootNavigator>();

    if (!isAuthed) {
        return (
            <Drawer.Navigator initialRouteName="Authentication" >
                <Drawer.Group >
                    <Drawer.Screen initialParams={{ setIsAuthed: setIsAuthed }} name="Authentication" component={AuthenticationNavigator} />
                </Drawer.Group>
            </Drawer.Navigator>
        )
    } else {
        return (
            <AuthedDrawer.Navigator initialRouteName="Profile" >
                <AuthedDrawer.Group >
                    <AuthedDrawer.Screen name="Profile" options={{ headerTitle: "My Profile" }} initialParams={{ userID: 0, setIsAuthed: setIsAuthed }} component={ProfileNavigator} />
                    <AuthedDrawer.Screen name="Search" component={SearchNavigator} />
                </AuthedDrawer.Group>

            </AuthedDrawer.Navigator>
        )
    }


}