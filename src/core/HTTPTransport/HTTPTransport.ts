import { queryString } from "../../utils";

const METHODS = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
};

const API_URL = "https://ya-praktikum.tech/api/v2";

type Options = {
    data?: object;
    headers?: Record<string, string>;
    method: keyof typeof METHODS;
    timeout?: number;
};

type OptionsWithoutMethod = Omit<Options, "method">;


type HttpMethod = <R = unknown>(url: string, options?: OptionsWithoutMethod) => Promise<R>;


export default class HTTPTransport {
    private _url?: string;

    constructor(url?: string) {
        this._url = `${API_URL}${url}`;
    }

    get: HttpMethod = (url, options) => {
        return this._request(
            url,
            { ...options, method: "GET" },
            options?.timeout,
        );
    }

    post: HttpMethod = (url, options) => {
        return this._request(
            url,
            { ...options, method: "POST" },
            options?.timeout,
        );
    }

    put: HttpMethod = (url, options) => {
        return this._request(
            url,
            { ...options, method: "PUT" },
            options?.timeout,
        );
    }

    delete: HttpMethod = (url, options) => {
        return this._request(
            url,
            { ...options, method: "DELETE" },
            options?.timeout,
        );
    }

    private _request = <TResponse = unknown>(
        url: string,
        options: Options,
        timeout: number = 5000,
    ) => {
        const { data, headers, method = "GET" } = options;

        return new Promise<TResponse>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(
                method,
                isGet && data
                    ? `${this._url}${url}${queryString(data)}`
                    : `${this._url}${url}`,
            );

            if (headers) {
                Object.keys(headers).forEach((key) => {
                    xhr.setRequestHeader(key, headers[key]);
                });
            }

            xhr.onload = () => {
                if (xhr.status !== 200) {
					reject(xhr.responseText);
				}
				if (xhr.response === 'OK') {
					resolve(xhr.response as TResponse);
				} else {
					resolve(JSON.parse(xhr.response) as TResponse);
				}
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else {
                const requestData =
                    data instanceof FormData ? data : JSON.stringify(data);
                xhr.send(requestData);
            }
        });
    };
}
