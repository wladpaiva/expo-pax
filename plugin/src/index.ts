import {
  ConfigPlugin,
  withAndroidManifest,
  withDangerousMod,
} from "@expo/config-plugins";
import fs from "fs";
import path from "path";

const withPaxLibrary: ConfigPlugin = (config) => {
  config = withAndroidManifestPermission(config);
  config = copyLibDeviceConfig(config);
  return config;
};

// TODO: Not needed?
// const withAndroidGradle: ConfigPlugin = (config) => {
//   return withAppBuildGradle(config, (config) => {
//     if (config.modResults.language === "groovy") {
//       const buildGradle = config.modResults.contents;

//       // Check if ndk configuration already exists
//       if (
//         !buildGradle.includes("ndk {") &&
//         !buildGradle.includes('abiFilters "armeabi-v7a"')
//       ) {
//         // Add ndk configuration
//         const defaultConfigBlock = buildGradle.match(
//           /defaultConfig\s*{[\s\S]*?}/
//         )?.[0];

//         const updatedDefaultConfigBlock = defaultConfigBlock?.replace(
//           /defaultConfig\s*{/,
//           `defaultConfig {
//           ndk {
//               abiFilters "armeabi-v7a"
//           }`
//         );

//         if (defaultConfigBlock && updatedDefaultConfigBlock) {
//           config.modResults.contents = buildGradle.replace(
//             defaultConfigBlock,
//             updatedDefaultConfigBlock
//           );
//         }
//       }
//     }
//     return config;
//   });
// };

const withAndroidManifestPermission: ConfigPlugin = (config) => {
  return withAndroidManifest(config, (config) => {
    const androidManifest = config.modResults;
    if (!androidManifest.manifest["uses-permission"]) {
      androidManifest.manifest["uses-permission"] = [];
    }

    if (
      androidManifest.manifest["uses-permission"].find(
        (permission) =>
          permission.$["android:name"] === "com.pax.permission.PRINTER"
      )
    ) {
      return config;
    }

    androidManifest.manifest["uses-permission"].push({
      $: {
        "android:name": "com.pax.permission.PRINTER",
      },
    });
    return config;
  });
};

const copyLibDeviceConfig: ConfigPlugin = (config) => {
  return withDangerousMod(config, [
    "android",
    async (config) => {
      const sourceDir = path.resolve(__dirname, "../jniLibs");
      const targetDir = path.resolve(
        config.modRequest.platformProjectRoot,
        "app/src/main/jniLibs"
      );

      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      const copyRecursively = (src: string, dest: string) => {
        if (!fs.existsSync(src)) return;

        const stats = fs.statSync(src);
        if (!stats.isDirectory()) {
          fs.copyFileSync(src, dest);
          return;
        }

        if (!fs.existsSync(dest)) {
          fs.mkdirSync(dest);
        }

        fs.readdirSync(src).forEach((childItemName) => {
          copyRecursively(
            path.join(src, childItemName),
            path.join(dest, childItemName)
          );
        });
      };

      copyRecursively(sourceDir, targetDir);

      return config;
    },
  ]);
};

export default withPaxLibrary;
