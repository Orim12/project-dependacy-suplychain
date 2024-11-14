import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools'
import svg from '@poppanator/sveltekit-svg'
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
    server: {
        port: 5000,
    },
    plugins: [
        imagetools(),
        svg({
            svgoOptions: {
                multipass: true,
            },
        }),
        sveltekit(),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                    @import '@src/scss/mixins.scss';
                    @import '@src/scss/variables.scss';
                `,
            },
        },
    }
})