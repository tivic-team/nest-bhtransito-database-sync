type UrlProps = {
    protocol: string;
    host: string;
    port: number;
    context?: string;
    baseApi?: string;
    route?: string;
    login?: {
        user: string;
        password: string;
    };
    queries?: Record<string, string>;
};

export class UrlUtil {
    public static build({
        host,
        protocol,
        port,
        baseApi,
        context,
        route,
        queries,
        login,
    }: UrlProps): string {
        let url = `${protocol}://`;
        login && (url += `${login.user}:${login.password}@`);
        host && (url += host);
        port && (url += `:${port}`);
        context && (url += `/${context}`);
        baseApi && (url += `/${baseApi}`);
        route && (url += `/${route}`);

        if (queries) {
            const queriesKeys = Object.keys(queries);
            if (queriesKeys.length > 0) {
                url += "?";
                queriesKeys.forEach((key, index) => {
                    url += `${key}=${queries[key]}`;
                    if (index < queriesKeys.length - 1) {
                        url += "&";
                    }
                });
            }
        }

        return url;
    }
}
