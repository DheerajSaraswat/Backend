const BASE_URL = "http://localhost:8000/api/v1";


export const user = {
    REGISTER_API : BASE_URL + "/users/register",
    LOGIN_API : BASE_URL + "/users/login",
    LOGOUT_API : BASE_URL + "/users/logout",
    CHANGE_PASSWORD_API : BASE_URL + "/users/update-pass",
    CURRENT_USER_API : BASE_URL + "/users/currentUser",
    UPDATE_ACCOUNT_API : BASE_URL + "/users/update-account",
    UPDATE_AVATAR_API : BASE_URL + "/users/update-avatar",
    PROFILE_DETAIL_API : BASE_URL + "/users/ch",
    WATCH_HISTORY_API : BASE_URL + "/users/watchHistory"
}
