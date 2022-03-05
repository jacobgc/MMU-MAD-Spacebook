import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator, NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackedTabbedParamList } from "../types/pages";
import AccountSettingsPage from "../pages/accountSettings";
import Profile from "../pages/profile";
import { AuthedRootNavigator } from "./rootNavigator";

export type ProfileNavigatorParamList = {
    Profile: {
        userID: number,
        setIsAuthed: React.Dispatch<React.SetStateAction<boolean>>
    }
    AccountSettings: { userID: number, updateTrigger: React.Dispatch<React.SetStateAction<boolean>> };
}

type Props = NativeStackScreenProps<AuthedRootNavigator, 'Profile'>;
export default function ProfileNavigator({ navigation, route }: Props) {
    const Stack = createNativeStackNavigator<ProfileNavigatorParamList>();
    return (
        <Stack.Navigator initialRouteName="Profile">
            <Stack.Screen name="Profile" component={Profile} initialParams={{ userID: route.params.userID, setIsAuthed: route.params.setIsAuthed }} options={{ headerShown: false }} />
            <Stack.Screen name="AccountSettings" component={AccountSettingsPage} />
        </Stack.Navigator>
    )

}