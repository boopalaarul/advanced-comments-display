//type aliases/definitions
export type Comment = {
    id: number,
    username: string,
    timestamp: string,
    text: string,
    replying_to: number | null,
    deleted: boolean
};

export type Credentials = {
    username: string,
    password: string
} | null;