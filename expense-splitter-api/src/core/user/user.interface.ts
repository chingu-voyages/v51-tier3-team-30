
export interface User {
    id: string;
    username: string;
    firstName: string | null;
    lastName :  string | null;
    email: string | null;
    passwordHash: string | null;
    createdAt: string | Date;
    updatedAt: string | Date;
}

export interface SafeUser extends Omit<User , 'passwordHash'>{}



