export const config={
    headers:{
        Authorization: 'Bearer '+localStorage.getItem('token')
    }
};
export const LANDING = '/';
export const SIGNUP = '/signup';
export const SIGNIN = '/signin';
export const SIGN_OUT = '/signin';
export const DASHBOARD = '/dashboard';
export const REPORT = '/report';
export const ACCOUNT = '/account';
export const STATISTICS = '/statistics';
export const FLAGGEDITEMS = '/flaggeditem';
export const MEMBERSHIP = '/membership';
export const MAPBOX = '/mapbox';
export const UTILITIES = '/utilities';
export const PASSWORD_FORGET = '/pw-forget';
export const ADMIN = '/admin';
export const ADMIN_DETAILS = '/admin/:id';
export const API_GET_CATEGORY = '/api/category';
export const API_GET_TYPE = '/api/type';
export const API_GET_MEMBERSHIP = '/api/membership';
export const API_GET_USER = '/api/users';
export const API_GET_USER_LOGOUT = '/api/user/logout';
export const API_GET_USER_LOGIN = '/api/user/login';
export const API_GET_USER_COUNT = '/api/user/count';
export const API_GET_INTERNAL_USER = '/api/user/internal';
export const API_GET_ORGANIZATION = '/api/user/organization';
export const API_GET_USER_COUNT_DATE = '/api/user/countByDate';
export const API_GET_ITEM = '/api/item';
export const API_GET_ITEM_COUNT_BY_STATUS = '/api/item/countByStatus';
export const API_GET_SERVICE_COUNT_BY_STATUS = '/api/service/countByStatus';
export const API_GET_ITEM_COUNT_DATE = '/api/item/countByDate';
export const API_GET_SERVICE = '/api/service';
export const API_GET_SERVICE_COUNT_DATE = '/api/service/countByDate';
export const API_GET_FLAG = '/api/flag';
export const API_GET_FLAG_COUNT_DATE = '/api/flag/countByDate';
export const API_GET_REQUEST = '/api/request';
export const API_GET_REQUEST_COUNT = '/api/request/count';
export const API_GET_REQUEST_COUNT_DATE = '/api/request/countByDate';
export const API_GET_ITEMSWAPTYPE = '/api/itemswaptype';
export const API_GET_SERVICESWAPTYPE = '/api/serviceswaptype';
export const API_GET_SUBSCRIPTION = '/api/subscription';
export const API_GET_REPORTTYPE = '/api/reporttype';
export const API_GET_ADDRESS = '/api/address';