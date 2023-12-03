import { PASSWORD_REGEXP } from "./constants"

export const passwordValidator = (password: string): boolean => {
    return PASSWORD_REGEXP.test(password)
}