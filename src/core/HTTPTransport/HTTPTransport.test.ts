import { expect, use } from "chai";
import sinonChai from "sinon-chai";
import HTTPTransport from "./HTTPTransport";
import { createSandbox } from "sinon";
import { afterEach } from "mocha";

describe("HTTPTransport", () => {
    use(sinonChai);

    const sandbox = createSandbox();
    const endpoint = "https://jsonplaceholder.typicode.com";
    let http: HTTPTransport;

    beforeEach(() => {
        http = new HTTPTransport(endpoint);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it("should be instance of HTTPTransport", () => {
        expect(http).instanceOf(HTTPTransport);
    });

    it("should GET request correctly", async function () {
        const response = (await http.get("/posts/1")) as string;

        const result = JSON.parse(response).id;

        expect(result).equal(1);
    });

    it("should POST request correctly", async () => {
        const mockData = {
            title: "foo",
            body: "bar",
            userId: 1,
        };

        const response = await http.post<string>("/posts", {
            data: mockData,
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = JSON.parse(response).id;

        expect(result).equal(101);
    });

    it("should PUT request correctly", async () => {
        const mockData = {
            id: 1,
            title: "foo",
            body: "bar",
            userId: 1,
        };

        const response = await http.put<string>("/posts/1", {
            data: mockData,
        });

        const result = JSON.parse(response).id;

        expect(result).equal(1);
    });

    it("should DELETE request correctly", async () => {
        const response = await http.delete<string>("/posts/1");

        const result = JSON.parse(response);

        expect(result).to.deep.equal({});
    });
});
