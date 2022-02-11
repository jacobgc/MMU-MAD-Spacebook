import { StyleSheet, View, Text, TextInput, Button } from 'react-native'
import { User } from '../types/user';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { RootStackParamList } from '../types/pages';
import postRequestJSON from '../utils/postRequest';
import AwesomeAlert from 'react-native-awesome-alerts';



export type UserProfileProps = {
    user: User;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;
export default function RegisterPage({ navigation }: Props) {

    let [email, setEmail] = useState<string>('');
    let [password, setPassword] = useState<string>('');
    let [confirmPassword, setConfirmPassword] = useState<string>('');
    let [firstName, setFirstName] = useState<string>('');
    let [lastName, setLastName] = useState<string>('');

    let [showSuccess, setShowSuccess] = useState<boolean>(false)
    let [showError, setShowError] = useState<boolean>(false)

    let [errorMessage, setErrorMessage] = useState<string>('')

    async function register() {

        console.log("Register")

        // TODO validation

        try {
            await postRequestJSON('http://localhost:3333/api/1.0.0/user', {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password
            })

            setShowSuccess(true)

        } catch (error: any) {

            console.log(error)

            if (error.message.includes('Possibly duplicate entry')) {
                setErrorMessage('Provided email already has an account')
            } else if (error.message.includes('email must be valid and password greater than 5 characters')) {
                setErrorMessage('Email must be valid and password must be greater than 5 characters')
            } else {
                setErrorMessage("An unknown error occurred")
            }

            setShowError(true)
        }

    }

    function goToLogin() {
        navigation.navigate('Login')
    }

    return (
        <View style={styles.topContent}>

            <TextInput placeholder='First Name' onChangeText={(textVal) => { setFirstName(textVal) }} />
            <TextInput placeholder='Last Name' onChangeText={(textVal) => { setLastName(textVal) }} />
            <TextInput placeholder='Email' onChangeText={(textVal) => { setEmail(textVal) }} />
            <TextInput secureTextEntry placeholder='Password' onChangeText={(textVal) => { setPassword(textVal) }} />
            <TextInput secureTextEntry placeholder='Confirm Password' onChangeText={(textVal) => { setConfirmPassword(textVal) }} />

            <Button title='Register' onPress={register} />


            <AwesomeAlert
                show={showSuccess}
                showProgress={false}
                title="Account Created"
                message="An account has been created, please log in to continue"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="Okay"
                onConfirmPressed={() => {
                    goToLogin();
                }}
            />

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