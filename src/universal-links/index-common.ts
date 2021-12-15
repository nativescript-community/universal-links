import * as urlparse from 'url-parse';

/**
 * Universal link wrapper.
 */
export class UniversalLink {
    public href: string;
    public origin: string;
    public pathname: string;
    public query: {
        [key: string]: string;
    };
    constructor(link: string) {
        const url = urlparse(link, true);

        this.href = url.href;
        this.origin = url.origin;
        this.pathname = url.pathname;
        this.query = url.query;
    }
}

let universalLink: UniversalLink | undefined;

export function setUniversalLink(link: string) {
    universalLink = new UniversalLink(link);
}

export function getUniversalLink() {
    return universalLink;
}

export type AppCallback = (ul: UniversalLink) => void;
export let callback: AppCallback | undefined;
export function registerUniversalLinkCallback(cb: AppCallback) {
    callback = cb;
}
export function getRegisteredCallback() {
    return callback;
}
