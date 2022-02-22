import { View } from 'react-native'
import { Avatar } from 'native-base'
import { useState } from 'react';
import { getRequestBinary } from '../utils/requests';

export type UserProfileImagesProps = {
    userID: string | undefined;
};

export default function UserProfileImage(props: UserProfileImagesProps) {
    let [profileImage, setProfileImage] = useState<string>();

    if (props.userID != null) {
        async function getImage() {
            const blob = await getRequestBinary(`http://localhost:3333/api/1.0.0/user/${props.userID}/photo`, true) as string
            console.log(blob)
            setProfileImage(blob)
        }

        if (profileImage == null) {
            getImage()
        }
    }

    return (
        <View>
            <Avatar bg="purple.600" alignSelf="center" size="2xl" source={{
                uri: profileImage
            }} />

        </View>
    );
}