const METHODS = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
};

type Options = {
    data?: Document | XMLHttpRequestBodyInit | null | undefined;
    headers?: Record<string, string>;
    method: keyof typeof METHODS;
    timeout?: number;
};

type OptionsWithoutMethod = Omit<Options, "method">;

type HTTPResponse = Promise<XMLHttpRequest>;

export default class HTTPTransport {
    get(url: string, options?: OptionsWithoutMethod): HTTPResponse {
        return this._request(
            url,
            { ...options, method: "GET" },
            options?.timeout,
        );
    }

    post(url: string, options: OptionsWithoutMethod): HTTPResponse {
        return this._request(
            url,
            { ...options, method: "POST" },
            options?.timeout,
        );
    }

    put(url: string, options: OptionsWithoutMethod): HTTPResponse {
        return this._request(
            url,
            { ...options, method: "PUT" },
            options?.timeout,
        );
    }

    delete(url: string, options: OptionsWithoutMethod): HTTPResponse {
        return this._request(
            url,
            { ...options, method: "DELETE" },
            options?.timeout,
        );
    }

    private _request(
        url: string,
        options: Options,
        timeout: number = 5000,
    ): HTTPResponse {
        const { data, headers, method = "GET" } = options;

        return new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(method, isGet ? `${url}${data}` : url);

            if (headers) {
                Object.keys(headers).forEach((key) => {
                    xhr.setRequestHeader(key, headers[key]);
                });
            }

            xhr.onload = () => {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    }
}
