"use client";

import { useState, useEffect, useRef } from "react";
import { TocItem } from "@/lib/toc";

interface TableOfContentsProps {
  headings: TocItem[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const tocListRef = useRef<HTMLUListElement>(null);

  // Scroll spy: track which heading is currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -70% 0px",
        threshold: 0,
      }
    );

    // Observe all heading elements
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  // Auto-scroll TOC to show active item
  useEffect(() => {
    if (activeId && tocListRef.current) {
      const activeElement = tocListRef.current.querySelector(`[data-id="${activeId}"]`);
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [activeId]);

  // Smooth scroll to heading when clicked
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
      setIsOpen(false);
    }
  };

  if (headings.length === 0) return null;

  return (
    <>
      {/* Mobile: Collapsible TOC at top */}
      <nav className="toc-mobile" aria-label="Table of contents">
        <button
          className="toc-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <span className="toc-toggle-text">Table of Contents</span>
          <span className={`toc-toggle-icon ${isOpen ? "open" : ""}`}>▼</span>
        </button>

        <div className={`toc-mobile-content ${isOpen ? "open" : ""}`}>
          <ul className="toc-list">
            {headings.map(({ id, text, level }) => (
              <li key={id} className={`toc-item toc-level-${level}`}>
                <button
                  onClick={() => scrollToHeading(id)}
                  className={`toc-link ${activeId === id ? "active" : ""}`}
                  data-id={id}
                >
                  {text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Desktop: Sticky sidebar TOC */}
      <nav className="toc-desktop" aria-label="Table of contents">
        <div className="toc-sidebar">
          <div className="toc-header">On this page</div>
          <ul className="toc-list" ref={tocListRef}>
            {headings.map(({ id, text, level }) => (
              <li key={id} className={`toc-item toc-level-${level}`}>
                <button
                  onClick={() => scrollToHeading(id)}
                  className={`toc-link ${activeId === id ? "active" : ""}`}
                  data-id={id}
                >
                  {text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
