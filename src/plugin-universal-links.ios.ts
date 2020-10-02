
import { Application } from "@nativescript/core";
import {
  setUniversalLink,
  getRegisteredCallback,
  getUniversalLink
} from "./plugin-universal-links.common";

export {
  getUniversalLink,
  registerUniversalLinkCallback
} from "./plugin-universal-links.common";

@NativeClass()
class CustomUIApplicationDelegate extends UIResponder
  implements UIApplicationDelegate {
  public static ObjCProtocols = [UIApplicationDelegate];
}

// setup app delegate
let delegate = Application.ios.delegate;
if (!delegate) {
  delegate = Application.ios.delegate = CustomUIApplicationDelegate;
}

/**
 * Add delegate method handler, but also preserve any existing one.
 */
function addDelegateHandler(
  classRef: Function,
  methodName: string,
  handler: Function
) {
  const crtHandler = classRef.prototype[methodName];
  classRef.prototype[methodName] = function() {
    const args = Array.from(arguments);
    if (crtHandler) {
      const result = crtHandler.apply(this, args);
      args.push(result);
    }

    return handler.apply(this, args);
  };
}

addDelegateHandler(
  delegate,
  "applicationContinueUserActivityRestorationHandler",
  (_application: UIApplication, userActivity: NSUserActivity) => {
    try {
      if (userActivity.activityType === NSUserActivityTypeBrowsingWeb) {
        setUniversalLink(userActivity.webpageURL.absoluteString);
        const callback = getRegisteredCallback();
        if (callback) callback(getUniversalLink());
      }

      return true;
    } catch (error) {
      return false;
    }
  }
);
