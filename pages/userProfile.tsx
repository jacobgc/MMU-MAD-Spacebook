import { StyleSheet, View, Image, Text } from 'react-native'
import UserProfileImage from '../components/userProfileImage';
import { User } from '../types/user';

export type UserProfileProps = {
    user: User;
};

export default function UserProfilePage(props: UserProfileProps) {
    return (
        <View>
            <View style={styles.topContent}>
                <UserProfileImage sourceURI={props.user.profilePictureURI} />
                <Text style={styles.profileNameText}>{props.user.firstName} {props.user.lastName}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    topContent: {
        flex: 1,
        alignItems: 'center'
    },
    profileNameText: {
        fontSize: 32
    }
});