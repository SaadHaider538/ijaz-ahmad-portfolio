import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, BookOpen, Search } from 'lucide-react';
import { insights, insightCategories } from '../insightsData';
import '../insights.css';

function ArticleCard({ article }) {
  return (
    <article className="insight-card">
      <div className="insight-card-top"><BookOpen size={24} aria-hidden="true" /><span>{article.category}</span></div>
      <h3><Link to={`/insights/${article.slug}`}>{article.title}</Link></h3>
      <p>{article.summary}</p>
      <Link className="insight-read" to={`/insights/${article.slug}`} aria-label={`Read article: ${article.title}`}>
        Read article <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </article>
  );
}

export function InsightsPreview() {
  return (
    <section className="insight-area insight-preview" id="insights">
      <div className="container">
        <div className="insight-preview-heading">
          <div><p className="insight-kicker">Knowledge & perspective</p><h2>Insights & Publications</h2><p>Practical perspectives on audit, tax, governance and financial management.</p></div>
          <Link className="button button--navy" to="/insights">Explore All Insights <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
        <div className="insight-grid">{insights.slice(0, 3).map((article) => <ArticleCard key={article.slug} article={article} />)}</div>
      </div>
    </section>
  );
}

export default function Insights() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const query = search.trim().toLowerCase();
  const filtered = insights.filter((article) => (category === 'All' || article.category === category) &&
    [article.title, article.summary, article.category, ...article.sections.map((section) => `${section.title} ${section.paragraphs.join(' ')} ${(section.bullets || []).join(' ')}`)].join(' ').toLowerCase().includes(query));

  return (
    <div className="insight-area">
      <section className="insight-hero">
        <div className="container">
          <nav className="insight-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Insights</span></nav>
          <p className="insight-kicker">Knowledge & perspective</p>
          <h1>Insights & Publications</h1>
          <p>Explore practical guidance and professional perspectives on financial reporting, taxation, assurance, governance and business management.</p>
        </div>
      </section>
      <section className="insight-library">
        <div className="container">
          <div className="insight-controls">
            <label className="insight-search"><span>Search articles</span><span className="insight-search-field"><Search size={18} aria-hidden="true" /><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by topic or keyword" /></span></label>
            <div className="insight-filters" role="group" aria-label="Filter by topic">
              {['All', ...insightCategories].map((item) => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
            </div>
          </div>
          <p className="insight-count" role="status">{filtered.length} {filtered.length === 1 ? 'article' : 'articles'} found</p>
          {filtered.length ? <div className="insight-grid">{filtered.map((article) => <ArticleCard key={article.slug} article={article} />)}</div> : (
            <div className="insight-empty"><h2>No matching articles</h2><p>Try another keyword or clear the filters.</p><button type="button" className="button button--navy" onClick={() => { setSearch(''); setCategory('All'); }}>Clear filters</button></div>
          )}
        </div>
      </section>
    </div>
  );
}

export function InsightDetail({ article }) {
  const related = insights.filter((item) => item.slug !== article.slug).slice(0, 3);
  return (
    <div className="insight-area">
      <header className="insight-hero">
        <div className="container">
          <nav className="insight-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span aria-hidden="true">/</span><Link to="/insights">Insights</Link><span aria-hidden="true">/</span><span aria-current="page">Article</span></nav>
          <p className="insight-kicker">{article.category} · Professional guidance</p>
          <h1>{article.title}</h1><p>{article.summary}</p>
        </div>
      </header>
      <div className="container insight-reading-layout">
        <article className="insight-content">
          <Link className="insight-read" to="/insights"><ArrowLeft size={16} aria-hidden="true" /> All insights</Link>
          {article.sections.map((section) => <section key={section.title}><h2>{section.title}</h2>{section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</section>)}
          <p className="insight-disclaimer">This article provides general educational information and is not a substitute for advice tailored to your circumstances. Confirm current statutory and regulatory requirements before acting.</p>
        </article>
        <aside className="insight-aside"><p className="insight-kicker">Professional support</p><h2>Discuss your requirements</h2><p>Contact us for assistance relevant to your organisation and circumstances.</p><Link className="button button--navy" to="/contact">Contact Us <ArrowRight size={16} aria-hidden="true" /></Link></aside>
      </div>
      <section className="insight-related"><div className="container"><p className="insight-kicker">Continue reading</p><h2>More insights</h2><div className="insight-grid">{related.map((item) => <ArticleCard key={item.slug} article={item} />)}</div></div></section>
    </div>
  );
}
