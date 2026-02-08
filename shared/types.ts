export interface UserProfile {
    name: string;
    avatar: string;
    role: string;
}

export type ActiveView = "home" | "chat" | "profile" | "landing";
