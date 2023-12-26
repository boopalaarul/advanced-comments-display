//contains type aliases/definitions for types returned from database
export type Comment = {
    id: number,
    username: string,
    timestamp: Date,
    text: string,
    replying_to: number
}