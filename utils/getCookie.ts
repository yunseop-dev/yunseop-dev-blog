import { NextApiRequestCookies } from "next/dist/next-server/server/api-utils";

const getCookie = (key: string, cookiesFromSSR?: NextApiRequestCookies) => {
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

export default getCookie