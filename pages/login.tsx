import { StyleSheet, View, Text, TextInput } from 'react-native'
import { User } from '../types/user';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { RootStackParamList } from '../types/pages';


export type UserProfileProps = {
    user: User;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;
export default function LoginPage({ navigation }: Props) {

    let [email, setEmail] = useState<string>('');
    let [password, setPassword] = useState<string>('');

    return (
        <View style={styles.topContent}>
            <TextInput placeholder='Email' onChangeText={(textVal) => { setEmail(textVal) }} />
            <TextInput secureTextEntry placeholder='Password' onChangeText={(textVal) => { setPassword(textVal) }} />
            <Text>LOGIN</Text>
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