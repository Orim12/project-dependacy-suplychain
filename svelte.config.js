import adapter from '@sveltejs/adapter-node'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path, { dirname } from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),
    kit: {
        adapter: adapter(),
        inlineStyleThreshold: 1024 * 5, // 1kb * X, When CSS is small load it inline for better First Contentful Paint
        version: {
            name: Date.now().toString(),
        },
        alias: {
            '@src': path.resolve('./src'),
            '@util': path.resolve('/src/util'),
            '@utils': path.resolve('./src/lib/0_utils'),
            '@atoms': path.resolve('./src/lib/1_atoms'),
            '@molecules': path.resolve('./src/lib/2_molecules'),
            '@organisms': path.resolve('./src/lib/3_organisms'),
            '@templates': path.resolve('./src/lib/4_templates'),
            '@stores': path.resolve('./src/stores'),
            '@assets': path.resolve('./src/assets'),
            '@services': path.resolve('./src/services'),
        },
    }
}

export default config
