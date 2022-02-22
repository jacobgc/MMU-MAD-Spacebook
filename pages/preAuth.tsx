import { StyleSheet, View, Button } from 'react-native'
import { User } from '../types/user';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackedRootStackParamList } from '../types/pages'
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginResponse } from '../types/responses';

export type UserProfileProps = {
    user: User;
};

type Props = NativeStackScreenProps<StackedRootStackParamList, 'PreAuth'>;
export default function PreAuthPage({ navigation }: Props) {
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@spacebook_current_user')
            if (value !== null) {
                navigation.navigate('Authed')
            }
        } catch (e) {
            console.log('Failed to get @spacebook_current_user')
        }
    }

    getData()

    return (
        <View style={styles.topContent}>
            <Button title='Login' onPress={() => navigation.navigate('Login')} />
            <Button title='Register' onPress={() => navigation.navigate('Register')} />
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