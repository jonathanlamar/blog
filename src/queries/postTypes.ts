import { IGatsbyImageData } from "gatsby-plugin-image";

export interface BlogPost {
  id: string;
  excerpt: string;
  html: string;
  frontmatter: {
    title: string;
    date: string;
    description?: string;
    image: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
    };
  };
  fields: {
    slug: string;
  };
}

export interface AllBlogPosts {
  nodes: BlogPost[];
}
