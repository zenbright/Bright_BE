export const LANGUAGE_DEFAULT = 'vi';

export const ERROR_CODE = {
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
    NOT_FOUND_ERROR: 'NOT_FOUND_ERROR',
    UNAUTHORIZED: 'UNAUTHORIZED',
    RATELIMITED: 'RATELIMITED',
    SERVER_MAINTENANCE: 'SERVER_MAINTENANCE',
    NOT_ALLOWED: 'NOT_ALLOWED',
    INSUFFICIENT_PERMISSION: 'INSUFFICIENT_PERMISSION',
    USER_NOT_FOUND: 'USER_NOT_FOUND',
};

export const AUTH_ACTION = ['login', 'signup']

export const CAUTION = {
    DO_NOT_USE: 'DO_NOT_USE',
}

export const PROVIDER = {
    BRIGHT: 'bright',
    GITHUB: 'github',
    GOOGLE: 'google',
}

export const SUCCESS_MESSAGE = 'SUCCESS'

export const EXTERNAL_URL = {
    GITHUB_OAUTH_GET_ACCESSTOKEN: 'https://github.com/login/oauth/access_token',
    GITHUB_OAUTH_GET_USERDATA: 'https://api.github.com/user',
}

// a/A/0 - z/Z/9 & at least 8 characters 
export const PASSWORD_REGEXP = /^[a-zA-Z0-9]{8,}$/