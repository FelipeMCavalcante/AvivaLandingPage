import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.{js,jsx,ts,tsx}"], // Aplica as regras apenas a esses arquivos
    rules: {
      // Desabilita a regra do uso obrigatório de <Image> do Next.js
      "@next/next/no-img-element": "off",
    },
  },
];

export default eslintConfig;
