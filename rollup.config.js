import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default {
    input: './src/index.ts',
    output: [
        {
            name: 'safe-selectors',
            file: pkg.browser,
            format: 'umd'
        },
        {
            file: pkg.main,
            format: 'cjs'
        },
        {
            file: pkg.module,
            format: 'es'
        }
    ],
    plugins: [typescript(), terser()]
}