import * as React from "react";
import { Link, graphql } from "gatsby";
import "katex/dist/katex.min.css";

import Bio from "../components/bio";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { GatsbyImage } from "gatsby-plugin-image";
import { BlogPost } from "../queries/postTypes";
import { querySiteMetadata } from "../queries/siteMetadata";

interface BlogPostTemplateProps {
  data: {
    previous: BlogPost;
    next: BlogPost;
    markdownRemark: BlogPost;
  };
  location: { pathname: string };
}
const BlogPostTemplate = (props: BlogPostTemplateProps) => {
  const siteMetadata = querySiteMetadata();
  const siteTitle = siteMetadata.title;

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
