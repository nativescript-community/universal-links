/// <reference path="../node_modules/tns-platform-declarations/android.d.ts" />

import * as application from "tns-core-modules/application";
import {
  setUniversalLink,
  getUniversalLink,
  getRegisteredCallback
} from "./plugin-universal-links.common";
export {
  getUniversalLink,
  registerUniversalLinkCallback
} from "./plugin-universal-links.common";

application.android.on(
  application.AndroidApplication.activityNewIntentEvent,
  args => {
    const intent: android.content.Intent = args.activity.getIntent();
    try {
      const data = intent.getData();
      if (!data) return; // nothing to do

      setUniversalLink(data.toString());
      const callback = getRegisteredCallback();
      if (callback) callback(getUniversalLink());
    } catch (e) {
      console.error(e);
    }
  }
);
