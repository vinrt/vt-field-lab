import { useEffect, useMemo, useState } from "react";
import { BookIcon } from "../../components/ui/Icons";
import { books, type BookReference } from "../../content/books";

const subjectFilters = [
  "Foundations",
  "Mathematics",
  "Quantum Physics",
  "Relativity",
  "Mechanics",
  "Cosmology",
  "Waves",
  "Time",
];

const levelLabels: Record<BookReference["level"], string> = {
  beginner: "Beginner",
  popular: "Popular",
  undergraduate: "Undergraduate",
  advanced: "Advanced",
};

export function BooksPage() {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"recommended" | "title" | "author" | "level">("recommended");

  useEffect(() => {
    document.title = "Books — VT Field Lab";
  }, []);

  const filteredBooks = useMemo(() => {
    const visibleBooks = selectedSubjects.length === 0
      ? [...books]
      : books.filter((book) => book.area.some((area) => selectedSubjects.includes(area)));

    return visibleBooks.sort((first, second) => {
      if (sortBy === "title") return first.title.localeCompare(second.title);
      if (sortBy === "author") return first.author.localeCompare(second.author);
      if (sortBy === "level") return first.level.localeCompare(second.level);
      return books.indexOf(first) - books.indexOf(second);
    });
  }, [selectedSubjects, sortBy]);

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((current) => (
      current.includes(subject)
        ? current.filter((item) => item !== subject)
        : [...current, subject]
    ));
  };

  return (
    <main className="page content-page books-page">
      <div className="page-width">
        <header className="books-library-header">
          <div>
            <span className="books-title-row"><BookIcon /> All books</span>
            <p>Browse the full library.</p>
          </div>
          <label className="book-sort-control">
            <span>Sort by:</span>
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value as typeof sortBy)}>
              <option value="recommended">Recommended</option>
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="level">Level</option>
            </select>
          </label>
        </header>

        <div className="books-browser">
          <aside className="book-filter-panel" aria-label="Book filters">
            <h2>Filter by</h2>
            <strong>Subject</strong>
            <div className="book-filter-list">
              {subjectFilters.map((subject) => (
                <label key={subject}>
                  <input
                    type="checkbox"
                    checked={selectedSubjects.includes(subject)}
                    onChange={() => toggleSubject(subject)}
                  />
                  <span>{subject}</span>
                </label>
              ))}
            </div>
            {selectedSubjects.length > 0 && (
              <button type="button" onClick={() => setSelectedSubjects([])}>
                Clear filters
              </button>
            )}
          </aside>

          <section className="books-result-panel" aria-label="Book results">
            <div className="books-result-toolbar">
              <span>{filteredBooks.length} books</span>
              <div aria-hidden="true">
                <button type="button" className="is-active">▦</button>
                <button type="button">☰</button>
              </div>
            </div>
            <div className="book-grid book-grid--browser">
              {filteredBooks.map((book) => (
                <article className="book-card book-card--simple" key={book.title}>
                  <div className="book-meta"><span>{levelLabels[book.level]}</span><span>{book.area[0]}</span></div>
                  <h2>{book.title}</h2>
                  <h3>{book.author}</h3>
                  <p>{book.description}</p>
                  <div className="book-tags" aria-label={`Subjects for ${book.title}`}>
                    {book.area.slice(0, 3).map((area) => <span key={area}>{area}</span>)}
                  </div>
                  {book.relatedSimulationIds?.includes("projectile-motion") && (
                    <span className="related-label">Pairs with Projectile motion</span>
                  )}
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
