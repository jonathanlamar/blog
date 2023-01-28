import * as React from "react";
import { graphql, Link } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { querySiteMetadata } from "../queries/siteMetadata";
import { AllBlogPosts } from "../queries/postTypes";

export interface BlogIndexProps {
  data: { allMarkdownRemark: AllBlogPosts };
  location: { pathname: string };
}

const BlogIndex = (props: BlogIndexProps) => {
  const siteMetadata = querySiteMetadata();
  const siteTitle = siteMetadata.title;
  const posts = props.data.allMarkdownRemark.nodes;

  return (
    <Layout location={props.location} title={siteTitle}>
      <Bio />
      <div>
        <p>
          My name is Jon. Until recent layoffs affected my team, I was a machine learning engineer at Amazon Go. I did
          my PhD in math and try to keep at the cutting edge of mathematically interesting tech. This blog has some
          notes and examples of things I find interesting.
        </p>
        <p>
          <a
            target="_blank"
            rel="nofollow noopener noreferrer"
            href={"https://docs.google.com/document/d/1HRPhJzLCK69-h0tc22iNU4CZwHQK8tO6HE9-17IMY54/edit?usp=sharing"}
          >
            Here is my resume{" "}
          </a>
          if you are interested in my background or want to hire me.
        </p>
      </div>
      <h2>Posts</h2>
      <ol style={{ listStyle: `none` }}>
        {posts.map((post) => {
          const title = post.frontmatter.title || post.fields.slug;

          return (
            <li key={post.fields.slug}>
              <article className="post-list-item" itemScope itemType="http://schema.org/Article">
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          );
        })}
      </ol>
    </Layout>
  );
};

export default BlogIndex;

export const Head = () => <Seo title="All posts" />;

export const pageQuery = graphql`
  {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          image {
            childImageSharp {
              gatsbyImageData(width: 200)
            }
          }
          description
        }
      }
    }
  }
`;
