import { env } from 'process';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import publicationMetadataModule from './src/data/publicationMetadata.cjs';

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const { getPublicationMetadata } = publicationMetadataModule;
const siteUrl = env.URL || `https://hickinsons.blog`;

const config = {
  pathPrefix: "",
  flags: {
    FAST_DEV: true,
    PARALLEL_SOURCING: true,
    DEV_SSR: true
  },
  siteMetadata: {
    title: `hickinsons.blog`,
    description: `A blog about data and digital transformation, leadership, systems, building, projects, life, and making sense of a noisy world.`,
    siteUrl,
    twitterUsername: `@hickinsons`,
    image: `/og-default.png`,
  },
  plugins: [
    "gatsby-plugin-postcss",
    `gatsby-plugin-sharp`,
      {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `hickinsons.blog`,
      short_name: `hickinsons`,
      start_url: `/`,
      background_color: `#faf8f3`,
      theme_color: `#2f5d50`,
      display: `minimal-ui`,
      icon: `src/images/icon.png`,
      include_favicon: true,
      legacy: true,
    },
  },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkMath],
          rehypePlugins: [[rehypeKatex, { strict: 'ignore' }]],
        },
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
              withWebp: true,
              quality: 80,
              loading: "lazy"
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Inter:400,500,600,700,800`],
        display: 'swap'
      }
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["G-94373ZKHEE"],
        gtagConfig: {
          anonymize_ip: true,
        },
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: "mdx",
        path: "./src/mdx/"
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: "images",
        path: "./src/images/"
      }
    },
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `./src/mdx/`,
      },
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `
        {
          allMdx {
            edges {
              node {
                frontmatter {
                  title
                  post_date
                  first_published
                  retrospective
                  description
                }
                fields {
                  slug
                }
              }
            }
          }
        }
        `,
        resolveSiteUrl: () => siteUrl,
        resolvePages: ({ allMdx: { edges: allMdxPages } }) => {
          const mdxPages = allMdxPages.map(({ node }) => ({
            path: node.fields.slug,
            frontmatter: node.frontmatter
          }));

          return [
            ...mdxPages,
            {
              path: "/quotes-links/",
              frontmatter: {},
            },
          ];
        },
        serialize: ({ path, frontmatter }) => {
          const publication = getPublicationMetadata({
            slug: path,
            frontmatter,
          });

          return {
            url: path,
            lastmod: publication.firstPublished || frontmatter.post_date,
          };
        },
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.nodes
                .filter(node => node.frontmatter.post_category !== "non_blog_post")
                .map(node => {
                  const publication = getPublicationMetadata({
                    slug: node.fields.slug,
                    frontmatter: node.frontmatter,
                  });

                  return {
                    title: node.frontmatter.title,
                    description: node.frontmatter.description,
                    date: publication.firstPublished,
                    url: `${site.siteMetadata.siteUrl}${node.fields.slug}`,
                    guid: `${site.siteMetadata.siteUrl}${node.fields.slug}`,
                  };
                })
                .sort((a, b) => new Date(b.date) - new Date(a.date));
            },
            query: `
            {
              allMdx(filter: {frontmatter: {post_category: {ne: "non_blog_post"}}}) {
                nodes {
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    description
                    post_date
                    first_published
                    retrospective
                    post_category
                  }
                }
              }
            }
            `,
            output: "/rss.xml",
            title: "hickinsons.blog | Writing on data, leadership, systems and building",
          },
        ],
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: "links_quotes",
        path: "./src/links_quotes_markdown/"
      }
    },
  ]
};

export default config;
