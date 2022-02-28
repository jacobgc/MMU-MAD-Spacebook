import { StyleSheet, View, Button, TextInput } from 'react-native'
import { User } from '../types/user';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StackedRootStackParamList } from '../types/pages';
import { postRequestJSON } from '../utils/requests';
import AwesomeAlert from 'react-native-awesome-alerts';
import { loginResponse } from '../types/responses';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SpaceBookAPI } from '../classes/SpaceBookAPI';

export type UserProfileProps = {
    user: User;
};

type Props = NativeStackScreenProps<StackedRootStackParamList, 'Login'>;
export default function LoginPage({ navigation }: Props) {

    let [email, setEmail] = useState<string>('');
    let [password, setPassword] = useState<string>('');

    let [showError, setShowError] = useState<boolean>(false)
    let [errorMessage, setErrorMessage] = useState<string>('')

    async function attemptLogin() {
        try {

            const api = new SpaceBookAPI()
            const loginResponse = await api.userManagement.login(email, password)

            console.log(loginResponse)

            await AsyncStorage.setItem('@spacebook_current_user', JSON.stringify(loginResponse))

            navigation.navigate('Authed')

        } catch (err) {
            const error = err as Error

            if (error.message.includes('request must match the spec')) {
                setErrorMessage("Please ensure all fields are filled out")
            } else if (error.message.includes('Invalid email/password supplied')) {
                setErrorMessage("Invalid email/password")
            } else {
                setErrorMessage("An unknown error occurred")
            }

            setErrorMessage(error.message)
            setShowError(true)
        }

    }

    return (
        <View style={styles.topContent}>
            <TextInput placeholder='Email' onChangeText={(textVal) => { setEmail(textVal) }} />
            <TextInput secureTextEntry placeholder='Password' onChangeText={(textVal) => { setPassword(textVal) }} />
            <Button title='LOGIN' onPress={() => { attemptLogin() }} />

            <AwesomeAlert
                show={showError}
                showProgress={false}
                title="Account creation failed"
                message={errorMessage}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={true}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="Try Again"
                confirmButtonColor='#E53935'
                onConfirmPressed={() => {
                    setShowError(false);
                }}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    topContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});