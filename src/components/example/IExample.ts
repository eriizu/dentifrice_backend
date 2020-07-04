export interface IExample {
    name: {
        user: string;
        nick: string;
    };
    discordId: string;
    profile: {
        picture: string;
        bio: string;
    };
    hash: string;
    lock: boolean;
}
