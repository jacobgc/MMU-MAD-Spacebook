import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PreAuthPage from './pages/preAuth';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import { StackedRootStackParamList, TabbedRootStackParamList } from './types/pages';
import AuthedNavigator from './components/authedNavigator';
import { NativeBaseProvider } from "native-base";



export default function App() {

  const Stack = createNativeStackNavigator<StackedRootStackParamList>();

  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator initialRouteName="PreAuth">
          <Stack.Screen name="PreAuth" component={PreAuthPage} />
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Register" component={RegisterPage} />
          <Stack.Screen name="Authed" component={AuthedNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  )
}