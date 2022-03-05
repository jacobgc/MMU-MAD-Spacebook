import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import LoginPage from "../pages/login";
import PreAuthPage from "../pages/preAuth";
import RegisterPage from "../pages/register";
import { RootNavigator } from "./rootNavigator";

export type AuthenticationNavigator = {
    PreAuth: {
        setIsAuthed: React.Dispatch<React.SetStateAction<boolean>>
    };
    Login: {
        setIsAuthed: React.Dispatch<React.SetStateAction<boolean>>
    };
    Register: undefined;
};

type Props = NativeStackScreenProps<RootNavigator, 'Authentication'>;
export default function AuthenticationNavigator({ route, navigation }: Props) {
    const Stack = createNativeStackNavigator<AuthenticationNavigator>();

    return (
        <Stack.Navigator initialRouteName="PreAuth">
            <Stack.Screen options={{ headerShown: false }} initialParams={{ setIsAuthed: route.params.setIsAuthed }} name="PreAuth" component={PreAuthPage}></Stack.Screen>
            <Stack.Screen name="Login" initialParams={{ setIsAuthed: route.params.setIsAuthed }} component={LoginPage}></Stack.Screen>
            <Stack.Screen name="Register" component={RegisterPage}></Stack.Screen>
        </Stack.Navigator>
    )

}