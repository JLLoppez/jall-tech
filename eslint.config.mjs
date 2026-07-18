import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

// Next.js 16 removed the `next lint` command entirely, along with the
// `eslint` option in next.config.mjs — linting is now the ESLint CLI's job,
// and @next/eslint-plugin-next defaults to flat config. FlatCompat is the
// standard bridge that lets the legacy `extends: [...]` style config
// (still how eslint-config-next is published) plug into the modern flat
// array format, without needing that package to publish a flat variant.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: ['.next/**', 'node_modules/**', 'src/generated/**']
  }
];

export default eslintConfig;
