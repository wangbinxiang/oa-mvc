/**
 * @param
 * account 账号
 * password 加密密码
 * hash
 */
export interface ISignIn {
    cellphone: string;
    password: string;
    // hash: string;
}

/**
 * phone 账号
 * code 加密密码
 * password 密码
 * rePassword 确认密码
 * hash
 */
export interface IRegister {
    phone: string | number;
    code: string;
    password: string;
    hash: string;
}

/**
 * phone 账号
 * code 加密密码
 * password 密码
 * rePassword 确认密码
 * hash
 */
export interface IForget {
    phone: string | number;
    code: string;
    password: string;
    hash: string;
}