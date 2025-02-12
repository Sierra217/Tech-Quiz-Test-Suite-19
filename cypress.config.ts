import { defineConfig } from "cypress";
import customViteConfig from './vite.config'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
      viteConfig: customViteConfig,
    },
    specPattern: "cypress/component/**/*.cy.{js,ts,jsx,tsx}",
  },
});
module.exports = {
  projectId: "pjz4ro",
  // ...rest of the Cypress project config
}