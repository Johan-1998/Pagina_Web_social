import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        base: "18px"
      }
    }
  },
  plugins: []
} satisfies Config;