import { NextApiRequestCookies } from "next/dist/next-server/server/api-utils";

export const setCookie = (name: string, value: string) => {
    document.cookie = `${name}=${value}`;
}

export const removeCookie = (name: string): void => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

export const getCookie = (key: string, cookiesFromSSR?: NextApiRequestCookies) => {
    if (typeof window === 'undefined') {
        return cookiesFromSSR?.[key] ?? "";
    }
    const cookies: any = (document?.cookie
        ?.split?.(";")
        ?.map?.((val) => val.split("="))
        ?.reduce?.(
            (acc, curr) => ({
                ...acc,
                [curr[0].trim()]: curr[1],
            }),
            {}
        ));
    return cookies?.[key] ?? "";
}
