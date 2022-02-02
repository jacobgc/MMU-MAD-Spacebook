import { StyleSheet, View, Image } from 'react-native'

export type UserProfileImagesProps = {
    sourceURI: string;
};


export default function UserProfileImage(props: UserProfileImagesProps) {
    return (
        <View>
            <Image
                source={{ uri: props.sourceURI }}
                style={styles.profileImage}
            ></Image>
        </View>
    );
}

const styles = StyleSheet.create({
    profileImage: {
        borderRadius: 400 / 2,
        height: 200,
        width: 200
    },
});