import fs from 'fs';
import path from 'path';
import Service from "./Service";
import { App } from "./app";

export class ConfigManager extends Service {
    protected readonly configDirectory: string;
    protected readonly configFileMain: string;
    public config: any;

    constructor(protected readonly app: App) {
        super(app);
        this.configDirectory = path.join((process.platform === 'win32' ? process.env.APPDATA : process.env.HOME) ?? path.resolve(__dirname), 'lastfm-scrobbler');
        this.configFileMain = path.join(this.configDirectory, 'config.json');
        this.load();
    }

    load() {
        if (!fs.existsSync(this.configDirectory))
            fs.mkdirSync(this.configDirectory);

        if (!fs.existsSync(this.configFileMain)) {
            fs.writeFileSync(this.configFileMain, '{}');
            this.config = {};
        }
        else {
            this.config = JSON.parse(fs.readFileSync(this.configFileMain).toString());
        }
    }
}