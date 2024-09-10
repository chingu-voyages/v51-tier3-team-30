export interface User {
    id: string;
    username: string;
    email: string;
    password_hash: string;
    created_at: string;
    updated_at: string;
}

export interface SafeUser extends Omit<User , 'password_hash'>{}
