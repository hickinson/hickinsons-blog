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
                        first_published(formatString: "YYYY-MM-DD")
                        retrospective
                        post_category
                    }
                }
            }
        }
    `);

    return data.allMdx.nodes;
};

const categoryOrder = ['work', 'technology', 'ideas', 'life'];

const categoryTitles = {
    work: 'Work',
    technology: 'Technology',
    ideas: 'Ideas',
    life: 'Life',
};

const categoryDescriptions = {
    work: 'Organisations, leadership, public service and change.',
    technology: 'AI, software, platforms, architecture and technical capability.',
    ideas: 'Books, writing, society, philosophy and thinking.',
    life: 'Family, home, sport, identity and lived experience.',
};

const filterPosts = (posts, selectedCategory) => {
    if (selectedCategory === 'all') return posts;

    return posts.filter(
        post => post.frontmatter.post_category === selectedCategory
    );
};

const PostList = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const allPosts = usePosts();

    const availableCategories = useMemo(() => {
        const found = new Set(
            allPosts.map(post => post.frontmatter.post_category)
        );

        return categoryOrder.filter(category => found.has(category));
    }, [allPosts]);

    const filteredPosts = useMemo(() => {
        return filterPosts(allPosts, selectedCategory);
    }, [allPosts, selectedCategory]);

    const title = selectedCategory === 'all'
        ? 'Latest writing'
        : categoryTitles[selectedCategory];
    const description = selectedCategory === 'all'
        ? 'Essays, notes and working thoughts, newest first.'
        : categoryDescriptions[selectedCategory];

    return (
        <div className="space-y-10 md:space-y-12">
            <div className="rounded-soft border border-site-border bg-site-surface px-4 py-4 md:px-5 md:py-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="mb-1 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-site-muted">
                            Browse
                        </p>
                        <p className="mb-0 text-sm leading-6 text-site-muted">
                            Read chronologically, or filter by broad theme.
                        </p>
                    </div>

                    <CategoryFilter
                        categories={availableCategories}
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                    />
                </div>
            </div>

            <CategoryPostList
                eyebrow={selectedCategory === 'all' ? 'Journal' : 'Category'}
                title={title}
                description={description}
                posts={filteredPosts}
            />
        </div>
    );
};

export default PostList;
