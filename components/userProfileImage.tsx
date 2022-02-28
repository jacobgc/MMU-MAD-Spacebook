import { View } from 'react-native'
import { Avatar } from 'native-base'
import { useEffect, useState } from 'react';
import { getRequestBinary } from '../utils/requests';
import { SpaceBookAPI } from '../classes/SpaceBookAPI';

export type UserProfileImagesProps = {
    userID: number | undefined;
};

export default function UserProfileImage(props: UserProfileImagesProps) {
    let [profileImage, setProfileImage] = useState<string>();

    useEffect(() => {
        async function getImage() {

            if (props.userID != undefined) {
                const api = new SpaceBookAPI()
                const profileImage = await api.userManagement.getProfileImage(props.userID)

                setProfileImage(profileImage)
            }

        }

        getImage()
    }, [props.userID])


    return (
        <View>
            <Avatar bg="purple.600" alignSelf="center" size="2xl" source={{
                uri: profileImage
            }} />

        </View>
    );
}