import React, { useState, useMemo, useEffect } from 'react';
import { useStaticQuery, graphql, navigate } from 'gatsby';
import QuoteCard from './QuoteCard';
import LinkCard from './LinkCard';

const contentTypes = ['Quote', 'Link', 'Podcast'];

const getIsoDateOnly = dateString => {
  if (!dateString) return null;
  return dateString.substring(0, 10);
};

const QuotesLinks = () => {
  const [selectedTypes, setSelectedTypes] = useState(new Set(contentTypes));
  const [selectedTags, setSelectedTags] = useState(new Set());
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const typesParam = params.get('types');
    const tagsParam = params.get('tags');
    const dateParam = params.get('date');

    setSelectedTypes(
      typesParam ? new Set(typesParam.split(',')) : new Set(contentTypes)
    );
    setSelectedTags(
      tagsParam ? new Set(tagsParam.split(',')) : new Set()
    );
    setSelectedDate(
      dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam) ? dateParam : null
    );
  }, []);

  const updateURL = (types, tags, date) => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams();

    if (!(contentTypes.every(type => types.has(type)))) {
      if (types.size > 0) params.set('types', Array.from(types).join(','));
    }

    if (tags.size > 0) params.set('tags', Array.from(tags).join(','));
    if (date) params.set('date', date);

    const search = params.toString();
    navigate(
      `${window.location.pathname}${search ? '?' + search : ''}`,
      { replace: true }
    );
  };

  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/links_quotes_markdown/" } }
        sort: { frontmatter: { date: DESC } }
      ) {
        nodes {
          html
          frontmatter {
            type
            title
            author
            url
            date
            tags
          }
        }
      }
    }
  `);

  const allTags = useMemo(() => {
    const tags = new Set();
    data.allMarkdownRemark.nodes.forEach(node => {
      node.frontmatter.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [data]);

  const toggleType = type => {
    setSelectedTypes(previous => {
      const next = new Set(previous);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      if (next.size === 0) next.add(type);
      updateURL(next, selectedTags, selectedDate);
      return next;
    });
  };

  const toggleTag = tag => {
    setSelectedTags(previous => {
      const next = new Set(previous);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      updateURL(selectedTypes, next, selectedDate);
      return next;
    });
  };

  const selectDate = date => {
    const nextDate = date ? getIsoDateOnly(date) : null;
    setSelectedDate(nextDate);
    updateURL(selectedTypes, selectedTags, nextDate);
  };

  const filteredNodes = data.allMarkdownRemark.nodes.filter(node => {
    if (!node.frontmatter?.type) return false;

    const displayType = node.frontmatter.type.charAt(0).toUpperCase()
      + node.frontmatter.type.slice(1);
    const typeMatches = selectedTypes.has(displayType);
    const tagMatches = selectedTags.size === 0
      || node.frontmatter.tags?.some(tag => selectedTags.has(tag));
    const dateMatches = !selectedDate
      || getIsoDateOnly(node.frontmatter.date) === selectedDate;

    return typeMatches && tagMatches && dateMatches;
  });

  const renderContent = node => {
    const cardProps = {
      frontmatter: node.frontmatter,
      html: node.html,
      onDateClick: selectDate,
    };

    return node.frontmatter.type === 'quote'
      ? <QuoteCard {...cardProps} />
      : <LinkCard {...cardProps} />;
  };

  const buttonClassName = active => [
    'rounded-pill border px-3 py-1.5 text-sm font-medium transition-colors duration-150',
    active
      ? 'border-site-text bg-site-text text-site-bg'
      : 'border-site-border bg-site-bg text-site-muted hover:text-site-text',
  ].join(' ');

  return (
    <div className="space-y-6">
      <div className="rounded-soft border border-site-border bg-site-surface px-4 py-4 md:px-5">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="mr-1 text-sm font-medium text-site-muted">Type</span>
            {contentTypes.map(type => (
              <button
                key={type}
                type="button"
                onClick={() => toggleType(type)}
                aria-pressed={selectedTypes.has(type)}
                className={buttonClassName(selectedTypes.has(type))}
              >
                {type}
              </button>
            ))}
          </div>

          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="mr-1 text-sm font-medium text-site-muted">Theme</span>
              {allTags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  aria-pressed={selectedTags.has(tag)}
                  className={buttonClassName(selectedTags.has(tag))}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {selectedDate && (
            <div className="flex flex-wrap items-center gap-2 text-sm text-site-muted">
              <span>Saved on {selectedDate}</span>
              <button
                type="button"
                onClick={() => selectDate(null)}
                className="font-semibold text-site-text underline underline-offset-4"
              >
                Clear date
              </button>
            </div>
          )}
        </div>
      </div>

      {filteredNodes.length > 0 ? (
        <div>
          {filteredNodes.map((node, index) => (
            <div key={`${node.frontmatter.url || node.frontmatter.title}-${index}`}>
              {renderContent(node)}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-site-muted">No items match the current filters.</p>
      )}
    </div>
  );
};

export default QuotesLinks;
