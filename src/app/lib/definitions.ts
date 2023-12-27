//contains type aliases/definitions for types returned from database
export type Comment = {
    id: number,
    username: string,
    timestamp: string,
    text: string,
    replying_to: number | null
};