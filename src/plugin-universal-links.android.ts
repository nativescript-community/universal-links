/// <reference path="./node_modules/tns-platform-declarations/android.d.ts" />
import { Application, AndroidApplication } from "@nativescript/core";
import {
  setUniversalLink,
  getUniversalLink,
  getRegisteredCallback
} from "./plugin-universal-links.common";
export {
  getUniversalLink,
  registerUniversalLinkCallback
} from "./plugin-universal-links.common";

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
