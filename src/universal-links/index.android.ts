import { AndroidApplication, Application } from '@nativescript/core';
import { getRegisteredCallback, getUniversalLink, setUniversalLink } from './index-common';
export { setUniversalLink, getUniversalLink, registerUniversalLinkCallback } from './index-common';

let currentIntent: android.content.Intent;

export function getUniversalLinkIntent() {
    return currentIntent;
}

Application.android.on(AndroidApplication.activityNewIntentEvent, (args) => {
    const intent: android.content.Intent = args.activity.getIntent();
    try {
        const data = intent.getData();
        if (!data) {
            return; // nothing to do
        }
        currentIntent = intent;
        setUniversalLink(data.toString());
        const callback = getRegisteredCallback();
        if (callback) {
            callback(getUniversalLink(), currentIntent);
        }
    } catch (e) {
        console.error(e);
    }
});

Application.android.on(AndroidApplication.activityDestroyedEvent, (args) => {
    const intent: android.content.Intent = args.activity.getIntent();
    const data = intent.getData();

    if (data) {
        currentIntent = null;
        intent.setData(null);
        setUniversalLink();
    }
});
