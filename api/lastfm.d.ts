declare module "lastfm" {
    export class LastFmNode {
        constructor(object: { api_key: string; secret: string; useragent?: string }) {}
        session(options: any): any {}
    }
}
