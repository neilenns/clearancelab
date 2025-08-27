import type { Route } from "next";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownProperties {
  children: string;
}

const Markdown = ({ children }: MarkdownProperties) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ href, children }) => (
          <Link
            className="text-[var(--color-primary)] underline"
            href={(href ?? "#") as Route}
            target="_blank"
            rel="noreferrer noopener"
          >
            {children}
          </Link>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;
