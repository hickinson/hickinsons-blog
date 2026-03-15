import React, { useMemo, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import CategoryPostList from './CategoryPostList';
import CategoryFilter from './CategoryFilter';

const usePosts = () => {
    const data = useStaticQuery(graphql`
        query {
            allMdx(
                filter: {
                    frontmatter: { post_category: { ne: "non_blog_post" } }
                }
                sort: { frontmatter: { post_date: DESC } }
            ) {
                nodes {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        description
                        post_date(formatString: "DD MMMM YYYY")
                        post_category
                    }
                }
            }
        }
    `);

    return data.allMdx.nodes;
};

const legacyCategoryMap = {
    probabilistic_linkage: 'other',
    energy: 'other',
    quotes_links: 'notes',
};

const normaliseCategory = category => {
    if (!category) return 'other';
    return legacyCategoryMap[category] || category;
};

const filterPosts = (posts, selectedCategory) => {
    if (selectedCategory === 'all') return posts;

    return posts.filter(
        post => normaliseCategory(post.frontmatter.post_category) === selectedCategory
    );
};

const groupPostsByCategory = (posts, includeLatest = false) => {
    let categorizedPosts = posts.reduce((acc, node) => {
        const category = normaliseCategory(node.frontmatter.post_category);
        if (!acc[category]) acc[category] = [];
        acc[category].push(node);
        return acc;
    }, {});

    if (includeLatest) {
        categorizedPosts = {
            latest: posts.slice(0, 3),
            ...categorizedPosts,
        };
    }

    return categorizedPosts;
};

const headerOrder = [
    'latest',
    'data',
    'leadership',
    'systems',
    'building',
    'projects',
    'life',
    'notes',
    'other',
];

const categoryTitles = {
    latest: 'Start here',
    data: 'Data and digital transformation',
    leadership: 'Leadership and organisational culture',
    systems: 'Systems and architecture',
    building: 'Building things',
    projects: 'Projects',
    life: 'Life and discipline',
    notes: 'Notes and references',
    other: 'Other writing',
};

const categoryDescriptions = {
    latest: 'A few recent pieces to begin with.',
    data: 'Writing on data platforms, analytics and transformation.',
    leadership: 'Leadership, organisational culture and change.',
    systems: 'Architecture, engineering thinking and systems design.',
    building: 'Thoughts on creating products, making, and experimentation.',
    projects: 'Updates and reflections on projects being built.',
    life: 'Reflections on discipline, philosophy and personal growth.',
    notes: 'Shorter ideas, references, links and collected thoughts.',
    other: 'Writing that sits outside the main themes.',
};

const PostList = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const allPosts = usePosts();

    const availableCategories = useMemo(() => {
        const found = new Set(
            allPosts.map(post => normaliseCategory(post.frontmatter.post_category))
        );

        return headerOrder.filter(
            category => category !== 'latest' && found.has(category)
        );
    }, [allPosts]);

    const filteredPosts = useMemo(() => {
        return filterPosts(allPosts, selectedCategory);
    }, [allPosts, selectedCategory]);

    const includeLatest = selectedCategory === 'all';

    const postsByCategory = useMemo(() => {
        return groupPostsByCategory(filteredPosts, includeLatest);
    }, [filteredPosts, includeLatest]);

    return (
        <div className="space-y-10 md:space-y-12">
            <div className="rounded-soft border border-site-border bg-site-surface px-4 py-4 md:px-5 md:py-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="mb-1 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-site-muted">
                            Browse
                        </p>
                        <p className="mb-0 text-sm leading-6 text-site-muted">
                            Filter posts by theme, or explore everything.
                        </p>
                    </div>

                    <CategoryFilter
                        categories={availableCategories}
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                    />
                </div>
            </div>

            <div className="space-y-12 md:space-y-14">
                {headerOrder.map(categoryKey => {
                    const posts = postsByCategory[categoryKey];

                    if (!posts || posts.length === 0) return null;

                    return (
                        <CategoryPostList
                            key={categoryKey}
                            categoryKey={categoryKey}
                            posts={posts}
                            categoryTitles={categoryTitles}
                            categoryDescriptions={categoryDescriptions}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default PostList;