import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileNavigator from "../navigators/profileNavigator";
import SearchPage from "../pages/search";
import { TabbedRootStackParamList } from "../types/pages";

export default function AuthedNavigator() {

    const Tab = createBottomTabNavigator<TabbedRootStackParamList>();
    return (
        <Tab.Navigator initialRouteName='ProfileNavigator' screenOptions={{ headerShown: false }}>
            <Tab.Screen name="ProfileNavigator" component={ProfileNavigator} options={{ title: 'Profile' }} initialParams={{ userID: 1 }} />
            <Tab.Screen name="Search" component={SearchPage} options={{ headerShown: true }} />
        </Tab.Navigator>
    )

}