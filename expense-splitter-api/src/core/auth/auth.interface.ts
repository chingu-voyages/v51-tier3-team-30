



export interface AuthResult {
    access_token: string
}

export interface OauthUserInput {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    providerAccountId: string;
    provider: string;
    picture?: string;
}
