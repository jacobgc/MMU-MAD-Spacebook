export type StackedRootStackParamList = {
    PreAuth: undefined;
    Login: undefined;
    Register: undefined;
    Authed: undefined;
};

export type TabbedRootStackParamList = {
    ProfileNavigator: { userID: number };
    Search: undefined;
};

export type SearchProfileParamList = {
    SearchProfileNavigator: { userID: number }
    Profile: { userID: number }
}

export type StackedTabbedParamList = {
    Profile: { userID: number }
    AccountSettings: { userID: number, updateTrigger: React.Dispatch<React.SetStateAction<boolean>> };
}
