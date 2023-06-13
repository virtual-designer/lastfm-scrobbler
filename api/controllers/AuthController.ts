import { Request, Response } from "express";

// const lastfm = new LastFmNode({
//     secret: process.env.API_SECRET!,
//     api_key: process.env.API_KEY!,
// });

function post(req: Request, res: Response) {
    const url = `http://www.last.fm/api/auth/?api_key=${process.env.API_KEY}`;

    return { message: "Not implemented." };
}

export default {
    post: ["/auth", post],
};
