import { Application, AndroidApplication } from "@nativescript/core";
import {
  setUniversalLink,
  getUniversalLink,
  getRegisteredCallback
} from "./universal-links-common";
export {
  getUniversalLink,
  registerUniversalLinkCallback
} from "./universal-links-common";

Application.android.on(
  AndroidApplication.activityNewIntentEvent,
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

