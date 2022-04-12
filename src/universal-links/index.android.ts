import { AndroidApplication, Application } from '@nativescript/core';
import { getRegisteredCallback, getUniversalLink, setUniversalLink } from './index-common';
export { getUniversalLink, registerUniversalLinkCallback } from './index-common';

Application.android.on(AndroidApplication.activityNewIntentEvent, (args) => {
    const intent: android.content.Intent = args.activity.getIntent();
    try {
        const data = intent.getData();
        if (data) {
            setUniversalLink(data.toString());
            intent.setData(null);

            const callback = getRegisteredCallback();
            if (callback) {
                callback(getUniversalLink());
            }
        } else {
            setUniversalLink();
        }
    } catch (e) {
        console.error(e);
    }
});
