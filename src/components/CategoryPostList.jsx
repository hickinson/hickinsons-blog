import React from 'react';
import { Link } from 'gatsby';
import formatDisplayDate from '../utils/formatDisplayDate';

const formatCategoryLabel = category => {
    const labels = {
        work: 'Work',
        technology: 'Technology',
        ideas: 'Ideas',
        life: 'Life',
    };

    return labels[category] || category;
};

const CategoryPostList = ({
    eyebrow = 'Journal',
    title,
    description,
    posts,
}) => {
    return (
        <section className="space-y-5">
            <div className="max-w-[44rem]">
                <p className="mb-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-site-muted">
                    {eyebrow}
                </p>

                <h3 className="mb-3">
                    {title}
                </h3>

                {description && (
                    <p className="mb-0 text-site-muted">
                        {description}
                    </p>
                )}
            </div>

            <div className="overflow-hidden rounded-soft border border-site-border bg-white">
                {posts.map((post, index) => {
                    const { slug } = post.fields;
                    const {
                        title: postTitle,
                        description: postDescription,
                        post_date,
                        post_category,
                    } = post.frontmatter;
                    const retrospective = Boolean(post.frontmatter.retrospective);

                    return (
                        <article
                            key={slug}
                            className={[
                                'px-4 py-5 md:px-6 md:py-6',
                                index !== posts.length - 1
                                    ? 'border-b border-site-border'
                                    : '',
                            ].join(' ')}
                        >
                            <div className="flex flex-col gap-2">
                                <p className="mb-0 text-[0.8rem] font-medium uppercase tracking-[0.08em] text-site-muted">
                                    {formatDisplayDate(post_date)} · {formatCategoryLabel(post_category)}
                                    {retrospective && (
                                        <> · Retrospective</>
                                    )}
                                </p>

                                <h4 className="mb-0 text-[1.08rem] md:text-[1.18rem] font-semibold leading-[1.2] tracking-[-0.02em] text-site-text">
                                    <Link
                                        to={slug}
                                        className="text-site-text no-underline hover:text-site-accent"
                                    >
                                        {postTitle}
                                    </Link>
                                </h4>

                                {postDescription && (
                                    <p className="mb-0 max-w-reading text-site-muted">
                                        {postDescription}
                                    </p>
                                )}
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
};

export default CategoryPostList;
