import Cookies from 'js-cookie';



export const setCookie = (cookiename, cookievalue) => {
    const timestamp = new Date().getTime(); // current time
    const exp = timestamp + (60 * 60 * 24 * 1000 * 5)
    console.log(exp);
    Cookies.set(cookiename, cookievalue, {
        //  domain: process.env.REACT_APP_COOKIE_DOMAIN,
        secure: true,
        path: "/",
        expires: exp,
    })
}

export const getCookie = (cookiename) => {
    return Cookies.get(cookiename);
}

export const removeCookie = (cookiename) => {

    Cookies.remove(cookiename);
    sessionStorage.clear();
    // Cookies.clear();
}