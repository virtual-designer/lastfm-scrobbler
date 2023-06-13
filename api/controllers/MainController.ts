import { Request, Response } from "express";

function get(req: Request, res: Response) {
    return { message: "Server is up." };
}

export default {
    get: ["/", get],
};
