export interface Auth {
    id: number;
    fullName: string;
    email: string;
    password: string;

    balance: number;

    phone: string;
    city: string;
    age: number;
    pointOfDate: string[];
    info: string;
    avatar: string;
    familyStatus: string;
    children: string;
    sex: boolean;

    gallery: string[];
    vip: boolean;

    height?: number;
    weight?: number;
    ownAparts?: Boolean;
    ownCar?: Boolean;


    badHabits?: Boolean;

    smoking?: boolean;
    alcohol?: boolean;
    drugs?: boolean;
    gambling?: boolean;


    moneyCondition?: Boolean;
    education?: String;
    orientation?: Boolean;
    religion?: string;
    typeOfAppearance?: string;
    zodiac?: string;
    eastYear?: string;
    languages?: string[];
}