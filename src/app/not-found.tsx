import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container">
      <div className="content-container">
        <div className="empty-state" style={{ paddingTop: "4rem" }}>
          <h1 style={{ fontSize: "6rem", marginBottom: "1rem", opacity: 0.2 }}>404</h1>
          <h2>Page Not Found</h2>
          <p style={{ marginBottom: "2rem" }}>
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/" className="read-more">
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
