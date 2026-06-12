import { createAzurePlaywrightConfig, ServiceOS } from "@azure/playwright";
import { defineConfig } from "@playwright/test";
import { DefaultAzureCredential } from "@azure/identity";
import baseConfig from "./playwright.config";

export default defineConfig(
  baseConfig,
  createAzurePlaywrightConfig(baseConfig, {
    os: ServiceOS.LINUX,
    credential: new DefaultAzureCredential(),
  }),
);
