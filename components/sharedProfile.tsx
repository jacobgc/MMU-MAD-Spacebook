import { View } from 'react-native'
import { User } from "../types/user";
import { Box, Center, Avatar, Text } from 'native-base'
import UserProfileImage from './userProfileImage';
import { userInfoResponse } from '../types/responses';

export type sharedProfileProps = {
    user: userInfoResponse | undefined;
};

export function SharedProfile(props: sharedProfileProps) {
    return (
        <View>
            <Box p="2" bg="primary.500" _text={{
                fontSize: "md",
                fontWeight: "medium",
                color: "warmGray.50",
                letterSpacing: "lg"
            }} shadow={2}>
                <Center>
                    <UserProfileImage userID={props.user?.user_id} />
                    <Text fontSize="6xl">{props.user?.first_name} {props.user?.last_name}</Text>
                </Center>
            </Box>
        </View>
    )
}