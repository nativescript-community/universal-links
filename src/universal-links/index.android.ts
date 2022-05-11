import { AndroidApplication, Application } from '@nativescript/core';
import { getRegisteredCallback, getUniversalLink, setUniversalLink } from './index-common';
export { getUniversalLink, registerUniversalLinkCallback } from './index-common';

Application.android.on(AndroidApplication.activityNewIntentEvent, (args) => {
    const intent: android.content.Intent = args.activity.getIntent();
    try {
        const data = intent.getData();
        if (!data) {
            return; // nothing to do
        }

        setUniversalLink(data.toString());
        const callback = getRegisteredCallback();
        if (callback) {
            callback(getUniversalLink());
        }
    } catch (e) {
        console.error(e);
    }
});

Application.android.on(AndroidApplication.activityDestroyedEvent, (args) => {
    const intent: android.content.Intent = args.activity.getIntent();
    const data = intent.getData();

    if (data) {
        intent.setData(null);
        setUniversalLink();
    }
});
