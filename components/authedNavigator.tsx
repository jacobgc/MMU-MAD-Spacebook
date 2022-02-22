import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../pages/profile";
import { TabbedRootStackParamList } from "../types/pages";

export default function AuthedNavigator() {

    const Tab = createBottomTabNavigator<TabbedRootStackParamList>();

    return (
        <Tab.Navigator initialRouteName='Profile'>
            <Tab.Screen name="Profile" component={Profile} initialParams={{ userID: 1 }} />
        </Tab.Navigator>
    )

}