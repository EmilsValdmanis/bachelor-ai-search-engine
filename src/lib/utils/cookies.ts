export const setCookie = (name: string, value: string, days: number = 30) => {
    const currentDate = new Date();
    currentDate.setTime(currentDate.getTime() + 1000 * 60 * 60 * 24 * days);
    const expires = `expires=${currentDate.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
};

export function deleteCookie(name: string) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}

export const getCookie = (name: string) => {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split("=");
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
};
