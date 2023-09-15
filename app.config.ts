import "dotenv/config";
import { ConfigContext, ExpoConfig } from "@expo/config";

const packageJson = require("./package.json");

function getConfigForCurrentEnv() {
  return {
    appIdentifier: "com.ml.mobile.camera.template.dev",
    imagesPath: "./assets/images",
    iosGoogleServicesFile: "./assets/config/dev/GoogleService-Info.plist",
    //androidGoogleServicesFile: "./assets/config/dev/google-services.json",
  };
}

const envConfig = getConfigForCurrentEnv();

function appConfig({ config }: ConfigContext): Partial<ExpoConfig> {
  return {
    ...config,
    version: packageJson.version,
    platforms: ["ios", "android"],
    orientation: "portrait",
    icon: `${envConfig.imagesPath}/icon.png`,
    userInterfaceStyle: "light",
    splash: {
      image: `${envConfig.imagesPath}/splash.png`,
      resizeMode: "contain",
      backgroundColor: "#002C41",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    jsEngine: "hermes",
    scheme: "mlcamera",
    ios: {
      icon: `${envConfig.imagesPath}/icon.png`,
      supportsTablet: false,
      bundleIdentifier: envConfig.appIdentifier,
      googleServicesFile: envConfig.iosGoogleServicesFile,
      infoPlist: {
        NSAllowsArbitraryLoads: true,
        CFBundleAllowMixedLocalizations: true,
        ITSAppUsesNonExemptEncryption: false,
        NSCameraUsageDescription:
          "we use the camera to take and upload monitoring photos to the app",
      },
    },
    android: {
      versionCode: 8,
      adaptiveIcon: {
        foregroundImage: `${envConfig.imagesPath}/adaptive-icon.png`,
        backgroundColor: "#fff",
      },
      package: envConfig.appIdentifier,
      // googleServicesFile: envConfig.androidGoogleServicesFile,
      permissions: ["CAMERA", "PHOTOS", "STORAGE", "RECEIVE_BOOT_COMPLETED"],
    },
    plugins: [
      [
        "expo-build-properties",
        {
          android: {
            compileSdkVersion: 33,
            targetSdkVersion: 33,
            minSdkVersion: 21,
            buildToolsVersion: "33.0.0",
            kotlinVersion: "1.8.0", // needed for snapper build and detox
            enableProguardInReleaseBuilds: false,
            disableAutomaticComponentCreation: true, // gradle 8

            // needed for snapper background fetch
            // https://docs.expo.dev/versions/latest/sdk/build-properties/
            // newArchEnabled: false,
            // flipper: '0.164.0',
          },
          ios: {
            deploymentTarget: "13.0",
            // needed for firebase
            //useFrameworks: "static",
            // newArchEnabled: true,
            // flipper: false,
          },
        },
      ],
    ],
    extra: {
      apiEnv: process.env.API_ENV,
    },
  };
}

export default appConfig;
