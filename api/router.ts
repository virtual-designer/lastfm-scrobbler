import { Request, Response, Router } from "express";

const router = Router();

export class CustomResponseObject {
    constructor(
        public readonly content: string | object = "",
        public readonly headers: Record<string, string> = {},
        public readonly status = 200
    ) {}
}

export type CustomResponse = CustomResponseObject | object | string;

function handleResponse(res: Response, customRes: CustomResponse) {
    if (typeof customRes === "string") {
        res.status(200).send(customRes);
        return;
    }

    if (customRes instanceof CustomResponseObject) {
        const tmp = res.status(customRes.status);

        for (const header in customRes.headers) {
            tmp.header(header, customRes.headers[header]);
        }

        tmp.send(customRes.content);
        return;
    }

    res.status(200).json(customRes);
}

function pushRouteFromArray(meta: any, key: string) {
    if (!meta[key]) {
        return;
    }

    const [route, callback, ...middleware]: [string, Function, ...Function[]] = meta[key];
    return (router[key as keyof typeof router] as Function)(route, ...middleware, async (req: Request, res: Response) => {
        const response = await callback(req, res);

        if (!res.headersSent) {
            handleResponse(res, response);
        }
    });
}

export function loadController(meta: any) {
    if (!meta) {
        return;
    }

    pushRouteFromArray(meta, "get");
    pushRouteFromArray(meta, "post");
    pushRouteFromArray(meta, "put");
    pushRouteFromArray(meta, "patch");
    pushRouteFromArray(meta, "delete");
}

require("./routes");

export default router;
