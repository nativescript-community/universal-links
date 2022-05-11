let universalLink: string;

export function setUniversalLink(link?: string) {
    universalLink = link != null ? link : undefined;
}

export function getUniversalLink() {
    return universalLink;
}

export type AppCallback = (link: string) => void;
export let callback: AppCallback | undefined;
export function registerUniversalLinkCallback(cb: AppCallback) {
    callback = cb;
}
export function getRegisteredCallback() {
    return callback;
}
