//constants and standard object types for submit modes
export const defaultMode = "toplevel"
export const replyMode = "reply"
export const editMode = "edit"
export const removeMode = "remove"

export type SubmitModeAction = {
    mode: string,
    target?: number,
    text?: string
}