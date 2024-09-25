// @ts-expect-error - Not an issue.
import Prism from 'prismjs';
import React, { useEffect, useRef, useState } from 'react';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import Image from '../../components/common/Image';
import 'prismjs/themes/prism-tomorrow.css';

// Only import the languages we need to reduce bundle size.
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

type MDXRendererProps = {
  content: string;
};

type CodeBlockProps = {
  children: string;
  className: string;
};

type InlineCodeProps = {
  children: string;
};

const CodeBlock = ({ children, className }: CodeBlockProps) => {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [children]);

  const language = className ? className.replace(/language-/, '') : 'javascript';

  return (
    <pre>
      <code ref={codeRef} className={`language-${language}`}>
        {children}
      </code>
    </pre>
  );
};

const InlineCode = ({ children }: InlineCodeProps) => {
  return (
    <code className="rounded-lg bg-[#0d1117] p-2 text-sm">
      {children}
    </code>
  );
};

const components = { Image, pre: CodeBlock, code: InlineCode };

const MDXRenderer = ({ content }: MDXRendererProps) => {
  const [MDXContent, setMDXContent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!content) return;

    const parseMDX = async () => {
      try {
        const contentWithoutImports = content.replace(/import.*?from.*?[\r\n]/g, '');

        const module = await evaluate(contentWithoutImports, {
          ...runtime,
          // @ts-expect-error - Not an issue.
          useMDXComponents: () => components,
        });

        const Content = module.default as React.ComponentType;

        setMDXContent(() => Content);
      } catch (err) {
        console.error('Error parsing MDX:', err);
        setError('Failed to parse MDX content');
      }
    };

    parseMDX();
  }, [content]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!MDXContent) {
    return <div className="text-gray-500">Loading MDX content...</div>;
  }

  return <MDXContent />;
};

export default MDXRenderer;