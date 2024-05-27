export interface Matching {
    users: User[]
}

export interface User {
    fullName: string;
    email: string;
    password: string;

    phone: string;
    location: string;
    age: number;
    pointOfDate: string[];
    info: string;
    avatar: string;
    familyStatus: string;
    children: boolean;
    sex: boolean;

    gallery: string[];
    vip: boolean;
}