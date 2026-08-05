const { createFilePath } = require("gatsby-source-filesystem");

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions;

    createTypes(`
        type MdxFrontmatter {
            first_published: Date @dateformat
            retrospective: Boolean
        }
    `);
};

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions;

    if (node.internal.type === "Mdx") {
        const slug = createFilePath({ node, getNode });
        createNodeField({
            node,
            name: "slug",
            value: slug,
        });
    }
};
