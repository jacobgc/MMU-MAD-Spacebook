import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileNavigator from "../pages/profileNavigator";
import { TabbedRootStackParamList } from "../types/pages";

export default function AuthedNavigator() {

    const Tab = createBottomTabNavigator<TabbedRootStackParamList>();
    return (
        <Tab.Navigator initialRouteName='ProfileNavigator' screenOptions={{ headerShown: false }}>
            <Tab.Screen name="ProfileNavigator" component={ProfileNavigator} initialParams={{ userID: 1 }} />
        </Tab.Navigator>
    )

}