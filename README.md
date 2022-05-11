<!-- ⚠️ This README has been generated from the file(s) "blueprint.md" ⚠️--><!-- ⚠️ This README has been generated from the file(s) "blueprint.md" ⚠️-->
<!--  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      DO NOT EDIT THIS READEME DIRECTLY! Edit "bluesprint.md" instead.
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! -->
<h1 align="center">@nativescript-community/universal-links</h1>
<p align="center">
		<a href="https://npmcharts.com/compare/@nativescript-community/universal-links?minimal=true"><img alt="Downloads per month" src="https://img.shields.io/npm/dm/@nativescript-community/universal-links.svg" height="20"/></a>
<a href="https://www.npmjs.com/package/@nativescript-community/universal-links"><img alt="NPM Version" src="https://img.shields.io/npm/v/@nativescript-community/universal-links.svg" height="20"/></a>
	</p>

<p align="center">
  <b>Universal links (IOS) and App Links (Android) support for NativeScript.</b></br>
  <sub><sub>
</p>

<br />


When a user clicks a link to a website, it opens in the default web browser (Safari/Chrome). Universal linking allows your app to open instead of the web browser.

Apple calls this _Universal Links_ and Google calls it _App Links_, but they mean the same thing.

| <img src="https://raw.githubusercontent.com/nativescript-community/universal-links/master/images/demo-ios.gif" height="500" /> | <img src="https://raw.githubusercontent.com/nativescript-community/universal-links/master/images/demo-android.gif" height="500" /> |
| --- | ----------- |
| iOS Demo | Android Demo |


[](#table-of-contents)


[](#table-of-contents)

## Table of Contents

* [Installation](#installation)
* [Implementing Universal Links](#implementing-universal-links)
	* [iOS](#ios)
	* [Android](#android)
* [Usage](#usage)
* [Demos and Development](#demos-and-development)
	* [Setup](#setup)
	* [Build](#build)
	* [Demos](#demos)
* [Questions](#questions)


[](#installation)


[](#installation)

## Installation
Run the following command from the root of your project:

`ns plugin add @nativescript-community/universal-links`


[](#implementing-universal-links)


[](#implementing-universal-links)

## Implementing Universal Links

Both iOS (9.0 and newer) and Android (all versions) provide good APIs for universal linking.

### iOS

Apple introduced a new deep linking API in iOS 9.0 called “Universal Links”. It provides a better user experience than the hacky deep linking options that existed in iOS 8.0 and below.

First step is to add a file to the root of your website called `apple-app-site-association`. This is a JSON file and it looks like this:

```javascript
{
    "applinks": {
        "apps": [],
        "details": [
            {
                "appID": "TEAM_ID.BUNDLE_ID", // ex: "9JA89QQLNQ.com.apple.wwdc"
                "paths": [ "/blog/*"]
            }
        ]
    }
}
```

- This file will be downloaded automatically by every single user that installs or upgrades your iOS app.
- It **_MUST_** be served over HTTPS with a valid SSL certificate. If you need to test this, I recommend using https://ngrok.io.
- This file is only fetched once when the user first installs or upgrades the app. It must live on your website before your app is released. This also means that you can’t add new deep linking url patterns to your app until you push out a new app update to force users to refresh the file.
- I suggest using this [Apple App Site Association (AASA) Validator](https://branch.io/resources/aasa-validator/) to confirm your `apple-app-site-association` is correct.

Check out [Apples' docs](https://developer.apple.com/library/archive/documentation/General/Conceptual/AppSearch/UniversalLinks.html#//apple_ref/doc/uid/TP40016308-CH12-SW2) for more info.

Next, you need to add the Associated Domains to your IOS project, either using XCode or manually adding the following code to your `App_Resources/IOS/app.entitlements` file. Please note the `applinks:` prefix, it won't work without it.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.developer.associated-domains</key>
    <array>
      <string>applinks:www.example.com</string>
    </array>
  </dict>
</plist>
```

### Android

In Android, universal linking is implemented using Intent Filters. By adding a BROWSABLE intent filter, you are saying that your app can be started by a user clicking on a website url.

You don't need any server side changes for Android, only modify your app to add the Intent Filter.
Add this code to your `App_Resources/Android/src/main/AndroidManifest.xml` file:

```xml
<activity
    android:name="com.tns.NativeScriptActivity"
    android:label="@string/title_activity_kimera" >

    <!-- Add this new section to your Activity -->
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />

        <!-- Handle urls starting with "https://www.example.com/blog" -->
        <data android:scheme="https"
              android:host="www.example.com"
              android:pathPrefix="/blog" />
    </intent-filter>
</activity>
```


[](#usage)


[](#usage)

## Usage

Call the `registerUniversalLinkCallback` somewhere in the startup of your app. This Angular example puts it in the AppComponent's ngOnInit method to provide a callback method which will receive an Universal Link object every time your app is opened by a website link:

```js
import { Component, OnInit } from "@angular/core";
import { registerUniversalLinkCallback } from "@nativescript-community/universal-links";

@Component({
  selector: "my-app",
  template: "<page-router-outlet></page-router-outlet>"
})
export class AppComponent {
  constructor() {}

  ngOnInit() {
    registerUniversalLinkCallback(ul => {
      // use the router to navigate to the screen
    });
  }
}
```

The universal link object has the following structure:

```JSON
{
  "href": "https://www.example.com/blog?title=welcome",
  "origin": "https://www.example.com",
  "pathname": "/blog",
  "query": "?title=welcome"
}
```

There is also a `getUniversalLink()` method that will return the last universal link which opened the app. This is useful in scenarios where your app is protected by a login screen. Check if the user is authenticated and then navigate to the desired path.

```js
import { getUniversalLink } from "nativescript-plugin-universal-links";

const ul = getUniversalLink();
```



[](#demos-and-development)


[](#demos-and-development)

## Demos and Development


### Setup

To run the demos, you must clone this repo **recursively**.

```
git clone https://github.com/@nativescript-community/universal-links.git --recursive
```

**Install Dependencies:**
```bash
npm i # or 'yarn install' or 'pnpm install'
```

**Interactive Menu:**

To start the interactive menu, run `npm start` (or `yarn start` or `pnpm start`). This will list all of the commonly used scripts.

### Build

```bash
npm run build

npm run build.angular # or for Angular
```

### Demos

```bash
npm run demo.[ng|react|svelte|vue].[ios|android]

npm run demo.svelte.ios # Example
```

[](#questions)


[](#questions)

## Questions

If you have any questions/issues/comments please feel free to create an issue or start a conversation in the [NativeScript Community Discord](https://nativescript.org/discord).
