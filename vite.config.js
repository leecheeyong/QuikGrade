import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [vue(), tailwindcss(),  {
      name: "log-transform",
      transform(code, id) {
        if (id.includes("src")) {
          console.log("✅ Transforming:", id);
        }
        return null;
      },
    },]
});
