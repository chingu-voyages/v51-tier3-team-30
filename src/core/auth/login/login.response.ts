export interface SignInResponse {
    user: {
        username: string;
        id: string;
    };
    access_token: string;
    refresh_token: string;
}
