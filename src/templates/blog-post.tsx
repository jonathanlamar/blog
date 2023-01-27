import * as React from "react";
import { Link, graphql } from "gatsby";
import "katex/dist/katex.min.css";

import Bio from "../components/bio";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";

// TODO: I shouldn't have to redeclare types over and over again.
interface BlogPost {
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

interface Site {
  siteMetadata?: {
    title: string;
  };
}

interface BlogPostTemplateProps {
  data: {
    previous: BlogPost;
    next: BlogPost;
    site: Site;
    markdownRemark: BlogPost;
  };
  location: { pathname: string };
}
const BlogPostTemplate = (props: BlogPostTemplateProps) => {
  const siteTitle = props.data.site.siteMetadata?.title || `Title`;

  return (
    <Layout location={props.location} title={siteTitle}>
      <article className="blog-post" itemScope itemType="http://schema.org/Article">
        <header>
          <GatsbyImage
            image={props.data.markdownRemark.frontmatter.image.childImageSharp.gatsbyImageData}
            alt={siteTitle}
          />
          <h1 itemProp="headline">{props.data.markdownRemark.frontmatter.title}</h1>
          <p>{props.data.markdownRemark.frontmatter.date}</p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }} itemProp="articleBody" />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {props.data.previous && (
              <Link to={props.data.previous.fields.slug} rel="prev">
                ← {props.data.previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {props.data.next && (
              <Link to={props.data.next.fields.slug} rel="next">
                {props.data.next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  );
};

interface HeadProps {
  data: {
    markdownRemark: BlogPost;
  };
}

export const Head = (props: HeadProps) => {
  return (
    <Seo
      title={props.data.markdownRemark.frontmatter.title}
      description={props.data.markdownRemark.frontmatter.description || props.data.markdownRemark.excerpt}
    />
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!, $previousPostId: String, $nextPostId: String) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        image {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
