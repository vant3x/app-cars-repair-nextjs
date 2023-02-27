export interface AuthContextType {
    message: string;
    auth: boolean;
    login: (user: any) => void;
    signup: (user: any) => void;
    userAuthtenticate: () => void;
    logout: () => void;
    errorSession: {
        error: boolean;
        statusCode: number | null;
    };
    token?: string;
    signupStatus: number | null;
    user: {
        firstname?: string;
        lastname?: string;
        email: string;
        password: string;
    }
}