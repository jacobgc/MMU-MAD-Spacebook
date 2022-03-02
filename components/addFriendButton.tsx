import { Button } from "native-base";
import { useEffect, useState } from "react";
import { SpaceBookAPI } from "../classes/SpaceBookAPI";

export type addFriendButtonProps = {
    userID: number;
    disabled: boolean;
    setShowError: React.Dispatch<React.SetStateAction<boolean>>;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>
};


export default function AddFriendButton(props: addFriendButtonProps) {
    let [submitting, setSubmitting] = useState<boolean>();
    let [disabled, setDisabled] = useState<boolean>(false);
    let [buttonText, setButtonText] = useState<string>("Add Friend");

    const api = new SpaceBookAPI()

    useEffect(() => {
        // Disable once if the props say to, then hand over to state
        if (props.disabled) {
            setDisabled(true)
            setButtonText("Friends")
        }
    });

    async function addFriend() {
        setSubmitting(true)
        try {
            const response = await api.friendManagement.addFriend(props.userID)

            if (response == "A request has already been submitted. Check your friend requests.") {

                setButtonText("Already Added")
            } else {
                setButtonText("Added")
            }

            setDisabled(true)
            setSubmitting(false)

        } catch (error) {
            console.error("Error adding friend")
            const err = error as Error
            props.setErrorMessage(err.message)
            props.setShowError(true)
            setSubmitting(false)
        }
    }

    return (
        <Button isDisabled={disabled} onPress={() => addFriend()} isLoading={submitting}>
            {buttonText}
        </Button>
    )
}