import react from '@vitejs/plugin-react';

import { exec } from 'node:child_process';
import path from 'path';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { defineConfig } from 'vite';

export function pushBuild() {
	return {
		name: 'yalc-push',
		closeBundle: async () => {
			exec('dts-bundle-generator --config dts.config.ts', (response, error) => {
				if (error) console.error(error);
				exec('npx yalc push', (response, error) => (error ? console.error(error) : null));
			});
		},
	};
}

export default defineConfig(({ mode }) => {
	const plugins = mode !== 'production' ? [react(), pushBuild()] : [react()];

	return {
		base: './',
		build: {
			sourcemap: true,
			lib: {
				entry: path.resolve(__dirname, 'src/index.tsx'),
				name: 'Scrollspy',
				formats: ['es', 'cjs'],
				fileName: format => `index.${format}.js`,
			},
			rollupOptions: {
				external: ['react', 'react-dom'],
				output: {
					globals: {
						react: 'React',
						'react-dom': 'ReactDOM',
						'react/jsx-runtime': 'react/jsx-runtime',
					},
				},
				plugins: [peerDepsExternal()],
			},
		},
		plugins,
		resolve: {
			alias: {
				src: path.resolve(__dirname, '/src'),
				utils: path.resolve(__dirname, '/src/utils'),
			},
		},
	};
});
