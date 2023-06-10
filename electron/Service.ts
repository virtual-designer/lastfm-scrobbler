import { App } from "./app";

export default abstract class Service {
    public constructor(protected app: App) {}
}