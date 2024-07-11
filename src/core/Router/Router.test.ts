import { expect, use } from "chai";
import sinonChai from "sinon-chai";
import Router from "./Router";
import { createSandbox } from "sinon";
import { afterEach } from "mocha";
import { Block, type BlockProps } from "../Block";
import { Route } from "./Route";

describe("Router", () => {
    use(sinonChai);
    const sandbox = createSandbox();

    class TestBlock extends Block {
        constructor(props: BlockProps) {
            super({ ...props });
        }
    }

    class NotFound extends Block {
        constructor(props: BlockProps) {
            super({ ...props });
        }

        render() {
            return this.compile("<div>{{{errorText}}}</div>", this._props);
        }
    }

    // const clock = useFakeTimers();

    const testRouter = new Router("body");

    before(() => {
        testRouter.use("/page1", TestBlock as typeof Block);
        testRouter.use("/page2", TestBlock as typeof Block);
        testRouter.use("/not-found", NotFound as typeof Block);
        testRouter.start();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it("should create a Router instance", () => {
        expect(testRouter).to.be.instanceOf(Router);
    });

    it("should create a new route", () => {
        testRouter.use("/test", TestBlock as typeof Block);
        const route = testRouter.getRoute("/test");
        expect(route).instanceOf(Route);
    });

    it("should call the use method once and use method with the correct arguments", () => {
        const useSpy = sandbox.spy(testRouter, "use");

        testRouter.use("/test", TestBlock as typeof Block);

        expect(useSpy.calledOnce).to.be.true;
        expect(useSpy.calledWith("/test", TestBlock)).to.be.true;
    });

    it("should find the route with matching pathname", () => {
        const path = "/test";
        testRouter.use(path, TestBlock as typeof Block);

        const route = testRouter.getRoute(path);

        const result = route?.match(path);

        expect(result).to.be.true;
    });

    it("should return true for not found when specifying a non-existent route", () => {
        const path = "/test";
        const errorPath = "/not-found";

        testRouter.use(path, TestBlock as typeof Block);

        const route = testRouter.getRoute("/non-existing");

        const result = route?.match(errorPath);

        expect(result).to.be.true;
    });
});
