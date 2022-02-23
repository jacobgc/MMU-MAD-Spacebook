export type StackedRootStackParamList = {
    PreAuth: undefined;
    Login: undefined;
    Register: undefined;
    Authed: undefined;
};

export type TabbedRootStackParamList = {
    Feed: undefined;
    ProfileNavigator: { userID: number };
};

export type StackedTabbedParamList = {
    Profile: { userID: number }
    AccountSettings: { userID: number, updateTrigger: React.Dispatch<React.SetStateAction<boolean>> };
}