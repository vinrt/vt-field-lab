import { useEffect } from "react";
import { BookIcon } from "../../components/ui/Icons";
import { books } from "../../content/books";

export function BooksPage() {
  useEffect(() => {
    document.title = "Books — VT Field Lab";
  }, []);

  return (
    <main className="page content-page books-page">
      <div className="page-width">
        <header className="content-hero">
          <span className="eyebrow">The field library</span>
          <h1>Books worth keeping close.</h1>
          <p>A small, intentional shelf for strengthening intuition, learning the mathematics, and going beyond each simulation.</p>
        </header>
        <div className="book-grid">
          {books.map((book, index) => (
            <article className="book-card" key={book.title}>
              <div className="book-cover" aria-hidden="true">
                <BookIcon />
                <span>VT / {String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="book-card-content">
                <div className="book-meta"><span>{book.level}</span><span>{book.area[0]}</span></div>
                <h2>{book.title}</h2>
                <h3>{book.author}</h3>
                <p>{book.description}</p>
                {book.relatedSimulationIds?.includes("projectile-motion") && (
                  <span className="related-label">Pairs with Projectile motion</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
