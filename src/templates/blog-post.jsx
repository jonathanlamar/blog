import React from "react"
import Layout from "../components/layout"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import PostPager from "../components/post-pager"
import style from "./blog-post.module.less"
import "katex/dist/katex.min.css"
import "../style/prism-darcula.less"
import loadable from "@loadable/component"
import "@suziwen/gitalk/dist/gitalk.css"

function BlogPost(props) {
  const { title, image, tags } = props.data.markdownRemark.frontmatter
  const { prev, next } = props.pageContext
  const { id } = props.data.markdownRemark

  const comments = () => {
    if (typeof window !== "undefined") {
      const GitalkComponent = loadable(() =>
        import("gitalk/dist/gitalk-component")
      )

      // TODO: This is broken.
      return (
        <GitalkComponent
          options={{
            clientID: process.env.COMMENT_CLIENT_ID,
            clientSecret: process.env.COMMENT_CLIENT_SECRET,
            repo: "blog-comments",
            owner: "jonathanlamar",
            admin: ["jonathanlamar"],
            id: id,
            title: title,
            distractionFreeMode: false,
          }}
        />
      )
    } else {
      // if window does not exist

      return null
    }
  }

  return (
    <Layout>
      <div>
        {image && (
          <Img
            style={{ backgroundColor: "#1e2127" }}
            fluid={image.childImageSharp.fluid}
          />
        )}
        <h1 style={{ backgroundColor: "#1e2127", textAlign: "left" }}>
          {title}
        </h1>
        <div
          dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}
          className={style.markdownBody}
        />
        <div className={style.markdownBody}>
          <br />
          <span>Tagged in </span>
          {tags.map((tag, i) => (
            <a href={`/${tag}`} key={i} style={{ marginLeft: "10px" }}>
              {tag}
            </a>
          ))}
        </div>
        {/* <Share title={title} url={url} pathname={props.location.pathname} /> */}
        <PostPager prev={prev && prev.node} next={next && next.node} />
      </div>
      {/* TODO: Fix the comments component. */}
      {/* <div style={{ marginTop: "6em", paddingBottom: "6em" }}>{comments()}</div> */}
    </Layout>
  )
}

export default BlogPost

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      excerpt
      frontmatter {
        title
        tags
        image {
          childImageSharp {
            resize(width: 1000, height: 420) {
              src
            }
            fluid(maxWidth: 768) {
              ...GatsbyImageSharpFluid
              ...GatsbyImageSharpFluidLimitPresentationSize
            }
          }
        }
      }
    }
  }
`
