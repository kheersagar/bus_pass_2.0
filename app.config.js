import 'dotenv/config';

export default {
  "expo": {
    "name": "Show Bus Pass",
    "slug": "Show-Bus-Pass",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.Bus Pass",
      "buildNumber": "1.0.0"
    },
    "android": {
      "package": "com.sagarrrr.ShowBusPass",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "apiKey": process.env.apiKey,
      "authDomain": process.env.authDomain,
      "projectId": process.env.projectId,
      "storageBucket": process.env.storageBucket,
      "messagingSenderId": process.env.messagingSenderId,
      "appId": process.env.appId,
      "eas": {
        "projectId": "c833b6ec-265a-48af-a9e2-31c2f932a669",
      }
    }
  }
}
