export interface CustomerProps {
    id: string;
    name: string;
    email: string;
    image_url: string;
}

export interface User {
    name: string;
    email: string;
}

export interface UserPayload extends User {
    password: string | null;
}

export interface UserDBEntry extends User {
    id: string;
}
