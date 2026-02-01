import { getAllPosts, Post } from "@/lib/notion";
import Link from "next/link";

export const revalidate = 60;

export const metadata = {
  title: "All Posts | SCBA.Lab",
  description: "Browse all articles and posts",
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function PostCard({ post }: { post: Post }) {
  return (
    <article className="post-card">
      <div className="post-meta">
        <time className="post-date">{formatDate(post.date)}</time>
        {post.tags.length > 0 && (
          <>
            <span>·</span>
            <div className="post-tags">
              {post.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
      <h2 className="post-title">
        <Link href={`/posts/${post.slug}`}>{post.title}</Link>
      </h2>
      {post.description && <p className="post-excerpt">{post.description}</p>}
      <Link href={`/posts/${post.slug}`} className="read-more">
        Read more
      </Link>
    </article>
  );
}

export default async function PostsPage() {
  const posts = await getAllPosts();

  return (
    <section className="container">
      <div className="content-container">
        <div className="hero" style={{ textAlign: "left", padding: "2rem 0", border: "none" }}>
          <h1 className="hero-title">All Posts</h1>
          <p className="hero-subtitle" style={{ margin: 0 }}>
            {posts.length} {posts.length === 1 ? "article" : "articles"} published
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="empty-state">
            <h2>No posts yet</h2>
            <p>
              Check back soon! Make sure your Notion database has some published posts.
            </p>
          </div>
        ) : (
          <div className="posts-grid">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
