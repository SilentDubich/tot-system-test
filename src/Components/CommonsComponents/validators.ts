export type ErrorType = {
    mail?: string
}

export const mailValidator = (text: string) => {
    let errors: ErrorType = {}
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!reg.test(text)) errors.mail = 'Неправильный формат email'
    return errors
}

