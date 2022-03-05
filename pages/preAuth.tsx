import { StyleSheet, View, Button } from 'react-native'
import { User } from '../types/user';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackedRootStackParamList } from '../types/pages'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthenticationNavigator } from '../navigators/authenticationNavigator'

export type UserProfileProps = {
    user: User;
};

type Props = NativeStackScreenProps<AuthenticationNavigator, 'PreAuth'>;
export default function PreAuthPage({ route, navigation }: Props) {
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@spacebook_current_user')
            if (value !== null) {
                route.params.setIsAuthed(true)
            } else {
                route.params.setIsAuthed(false)
            }
        } catch (e) {
            console.log('Failed to get @spacebook_current_user')
        }
    }

    getData()

    return (
        <View style={styles.topContent}>
            <Button title='Login' onPress={() => navigation.navigate('Login', { setIsAuthed: route.params.setIsAuthed })} />
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