import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkGfm from 'remark-gfm';

export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [
        remarkFrontmatter,
        remarkMdxFrontmatter,
        remarkGfm,
      ],
    }),
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
      routes(defineRoutes) {
        return defineRoutes((route) => {
          route('/about', 'routes/about/about.tsx');
          route('/blog', 'routes/blog/blog.tsx');
          route('/blog/:id', 'routes/blog/blogPost.tsx');
          route('/contributors', 'routes/contributors/contributors.tsx');
          route('/downloads', 'routes/downloads/downloadsIndex.tsx');
          route('/downloads/:id', 'routes/downloads/downloadsList.tsx');
          route('/downloads/:id/:subid', 'routes/downloads/downloadsSingle.tsx');
          route('/downloads/shoko-server', 'routes/downloads/downloadsSingle.tsx', { id: 'shoko-server' });
          route('*', 'routes/404.tsx', { id: '404' });
        });
      },
    }),
    tsconfigPaths(),
  ],
});