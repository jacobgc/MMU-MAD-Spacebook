import { StyleSheet, View, Button } from 'react-native'
import UserProfileImage from '../components/userProfileImage';
import { User } from '../types/user';
import { TypedNavigator } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';


export type UserProfileProps = {
    user: User;
};

type Props = NativeStackScreenProps<RootStackParamList, 'PreAuth'>;
export default function PreAuthPage({ navigation }: Props) {
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