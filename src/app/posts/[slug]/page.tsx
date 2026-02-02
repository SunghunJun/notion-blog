import { getPostBySlug, getAllPostSlugs } from "@/lib/notion";
import { calculateReadingTime } from "@/lib/reading-time";
import { extractHeadings, generateSlug, shouldShowToc } from "@/lib/toc";
import TableOfContents from "@/components/TableOfContents";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate static paths
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description || `Read ${post.title} on SCBA.Lab`,
    openGraph: {
      title: post.title,
      description: post.description || `Read ${post.title} on SCBA.Lab`,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
      url: `/posts/${slug}`,
    },
    alternates: {
      canonical: `/posts/${slug}`,
    },
  };
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Helper to extract text from React children
function getTextFromChildren(children: any): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) {
    return children.map(getTextFromChildren).join("");
  }
  if (children?.props?.children) {
    return getTextFromChildren(children.props.children);
  }
  return "";
}

// Custom components for ReactMarkdown with heading IDs
const createMarkdownComponents = () => {
  const seenIds = new Set<string>();

  const generateUniqueId = (text: string): string => {
    let id = generateSlug(text);
    let counter = 1;
    const baseId = id;

    while (seenIds.has(id)) {
      id = `${baseId}-${counter}`;
      counter++;
    }
    seenIds.add(id);
    return id;
  };

  return {
    h1: ({ children }: any) => <h1 className="notion-h1">{children}</h1>,
    h2: ({ children }: any) => {
      const text = getTextFromChildren(children);
      const id = generateUniqueId(text);
      return (
        <h2 id={id} className="notion-h2">
          {children}
        </h2>
      );
    },
    h3: ({ children }: any) => {
      const text = getTextFromChildren(children);
      const id = generateUniqueId(text);
      return (
        <h3 id={id} className="notion-h3">
          {children}
        </h3>
      );
    },
    p: ({ children }: any) => <p className="notion-paragraph">{children}</p>,
    ul: ({ children }: any) => <ul className="notion-list">{children}</ul>,
    ol: ({ children }: any) => (
      <ol className="notion-list-numbered">{children}</ol>
    ),
    li: ({ children }: any) => <li className="notion-list-item">{children}</li>,
    blockquote: ({ children }: any) => (
      <blockquote className="notion-quote">{children}</blockquote>
    ),
    code: ({ inline, children, ...props }: any) =>
      inline ? (
        <code className="notion-inline-code">{children}</code>
      ) : (
        <code {...props}>{children}</code>
      ),
    pre: ({ children }: any) => (
      <pre className="notion-code-block">{children}</pre>
    ),
  };
};

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const readingTime = calculateReadingTime(post.content || "");
  const headings = extractHeadings(post.content || "");
  const showToc = shouldShowToc(post.content || "");
  const markdownComponents = createMarkdownComponents();

  return (
    <article className="container">
      <div className={`post-layout ${showToc ? "with-toc" : ""}`}>
        {/* Desktop TOC - left sidebar (hidden on mobile via CSS) */}
        {showToc && <TableOfContents headings={headings} />}

        <div className="post-main">
          <Link href="/posts" className="back-link">
            Back to all posts
          </Link>

          <header
            className="post-header"
            style={{ textAlign: "left", padding: "0 0 2rem 0" }}
          >
            <div className="post-meta" style={{ justifyContent: "flex-start" }}>
              <time className="post-date">{formatDate(post.date)}</time>
              <span>·</span>
              <span className="reading-time">{readingTime.text}</span>
              {post.tags.length > 0 && (
                <>
                  <span>·</span>
                  <div className="post-tags">
                    {post.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
            <h1 className="post-title">{post.title}</h1>
            {post.description && (
              <p className="post-description">{post.description}</p>
            )}
          </header>

          <div className="post-content notion-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={markdownComponents}
            >
              {post.content || ""}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </article>
  );
}
