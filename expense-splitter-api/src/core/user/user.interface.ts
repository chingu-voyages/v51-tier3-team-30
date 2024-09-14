export interface User {
    id: string;
    username: string;
    firstname: string | null;
    lastname :  string | null;
    email: string | null;
    password_hash: string | null;
    created_at: string | Date;
    updated_at: string | Date;
}

export interface SafeUser extends Omit<User , 'password_hash'>{}
