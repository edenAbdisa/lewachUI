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
export const API_GET_CATEGORY = 'https://liwachapi.herokuapp.com/api/category';
export const API_GET_TYPE = 'https://liwachapi.herokuapp.com/api/type';
export const API_GET_MEMBERSHIP = 'https://liwachapi.herokuapp.com/api/membership';
export const API_GET_USER = 'https://liwachapi.herokuapp.com/api/users';
export const API_GET_SINGLE_USER = 'https://liwachapi.herokuapp.com/api/user';
export const API_GET_USER_LOGOUT = 'https://liwachapi.herokuapp.com/api/user/logout';
export const API_GET_USER_LOGIN = 'https://liwachapi.herokuapp.com/api/user/login';
export const API_GET_USER_COUNT = 'https://liwachapi.herokuapp.com/api/user/count';
export const API_GET_INTERNAL_USER = 'https://liwachapi.herokuapp.com/api/user/internal';
export const API_GET_ORGANIZATION = 'https://liwachapi.herokuapp.com/api/user/organization';
export const API_GET_USER_COUNT_DATE = 'https://liwachapi.herokuapp.com/api/user/countByDate';
export const API_GET_ITEM = 'https://liwachapi.herokuapp.com/api/item';
export const API_GET_ITEM_COUNT_BY_STATUS = 'https://liwachapi.herokuapp.com/api/item/countByStatus';
export const API_GET_SERVICE_COUNT_BY_STATUS = 'https://liwachapi.herokuapp.com/api/service/countByStatus';
export const API_GET_ITEM_COUNT_DATE = 'https://liwachapi.herokuapp.com/api/item/countByDate';
export const API_GET_SERVICE = 'https://liwachapi.herokuapp.com/api/service';
export const API_GET_SERVICE_COUNT_DATE = 'https://liwachapi.herokuapp.com/api/service/countByDate';
export const API_GET_FLAG = 'https://liwachapi.herokuapp.com/api/flag';
export const API_GET_FLAG_COUNT_DATE = 'https://liwachapi.herokuapp.com/api/flag/countByDate';
export const API_GET_REQUEST = 'https://liwachapi.herokuapp.com/api/request';
export const API_GET_REQUEST_COUNT = 'https://liwachapi.herokuapp.com/api/request/count';
export const API_GET_REQUEST_COUNT_DATE = 'https://liwachapi.herokuapp.com/api/request/countByDate';
export const API_GET_ITEMSWAPTYPE = 'https://liwachapi.herokuapp.com/api/itemswaptype';
export const API_GET_SERVICESWAPTYPE = 'https://liwachapi.herokuapp.com/api/serviceswaptype';
export const API_GET_SUBSCRIPTION = 'https://liwachapi.herokuapp.com/api/subscription';
export const API_GET_REPORTTYPE = 'https://liwachapi.herokuapp.com/api/reporttype';
export const API_GET_ADDRESS = 'https://liwachapi.herokuapp.com/api/address';