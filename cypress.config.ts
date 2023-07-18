import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    
    viewportHeight: 1080,
    viewportWidth: 1920,
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
   
  },
});
