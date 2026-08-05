const publicationMetadata = {
    '/the_hard_bit_after_starting/': {
        first_published: '2026-07-29',
        retrospective: true,
    },
    '/when_a_prototype_becomes_a_service/': {
        first_published: '2026-07-29',
        retrospective: true,
    },
    '/the_house_on_both_sides_of_the_ledger/': {
        first_published: '2026-07-29',
        retrospective: true,
    },
    '/what_do_we_mean_by_far_right/': {
        first_published: '2026-07-29',
        retrospective: true,
    },
    '/not_conditioned_for_the_distance/': {
        first_published: '2026-07-29',
        retrospective: true,
    },
    '/what_an_interview_makes_you_admit/': {
        first_published: '2026-07-30',
        retrospective: true,
    },
    '/building_for_an_organisation_that_will_disappear/': {
        first_published: '2026-07-30',
        retrospective: true,
    },
};

const normaliseSlug = value => {
    if (!value) return '';

    const withoutQuery = String(value).split(/[?#]/)[0];
    const withLeadingSlash = withoutQuery.startsWith('/')
        ? withoutQuery
        : `/${withoutQuery}`;

    return withLeadingSlash.endsWith('/')
        ? withLeadingSlash
        : `${withLeadingSlash}/`;
};

const getPublicationMetadata = ({ slug = '', frontmatter = {} } = {}) => {
    const stored = publicationMetadata[normaliseSlug(slug)] || {};
    const hasRetrospectiveFlag =
        typeof frontmatter.retrospective === 'boolean';

    return {
        firstPublished:
            frontmatter.first_published ||
            stored.first_published ||
            frontmatter.post_date ||
            null,
        retrospective: hasRetrospectiveFlag
            ? frontmatter.retrospective
            : Boolean(stored.retrospective),
    };
};

module.exports = {
    publicationMetadata,
    normaliseSlug,
    getPublicationMetadata,
};
