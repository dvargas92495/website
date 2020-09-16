export type Data = {
  site: {
    siteMetadata: {
      title: string;
    };
  };
  allMarkdownRemark: {
    edges: {
      node: {
        excerpt: string;
        frontmatter: {
          title: string;
          date: string;
          description: string;
          tags: string;
        };
        fields: {
          slug: string;
        };
      };
    }[];
  };
};
