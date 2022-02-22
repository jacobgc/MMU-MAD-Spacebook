export type StackedRootStackParamList = {
    PreAuth: undefined;
    Login: undefined;
    Register: undefined;
    Authed: undefined;
};

export type TabbedRootStackParamList = {
    Feed: undefined;
    Profile: { userID: number };
};