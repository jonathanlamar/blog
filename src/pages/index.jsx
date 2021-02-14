import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"
import Me from "../images/me.jpg"
import ThisBlog from "../images/this-blog.png"
import Resume from "../images/resume.jpg"
import style from "./index.module.less"
import { FaGithub, FaLinkedin } from "react-icons/fa"

const IndexPage = () => {
  return (
    <Layout>
      <h1 style={{ textAlign: "center", marginTop: "80px" }}>Portfolio</h1>
      <SEO title="Home" keywords={["jonalarm"]} />
      <div className={style.card}>
        <div className={style.post}>
          <div className={style.cover}>
            <a
              target="_blank"
              rel="nofollow noopener noreferrer"
              href={"https://www.linkedin.com/in/jonathanplamar/"}
            >
              <img
                src={Me}
                height="200px"
                width="200px"
                style={{ borderRadius: "50%" }}
                alt="Me"
              />
            </a>
          </div>
          <div className={style.content}>
            <span>
              My name is Jon. I am a software engineer and occasional data
              scientist. I did my PhD in math and try to keep at the cutting
              edge of mathy tech. This blog has some notes and examples of
              things I find intersting.
            </span>
            <div className={style.list}>
              <ul>
                <li>
                  <a
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    href={"https://github.com/jonathanlamar"}
                  >
                    <FaGithub color="#FFFFFF" size="30" />
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    href={"https://www.linkedin.com/in/jonathanplamar/"}
                  >
                    <FaLinkedin color="#3077B0" size="30" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={style.card}>
        <div className={style.post}>
          <div className={style.cover}>
            <a
              target="_blank"
              rel="nofollow noopener noreferrer"
              href={
                "https://drive.google.com/file/d/1vcuV6Kx7vCAX0oF_5KJiQDE5Bhxjfbzb/view?usp=sharing"
              }
            >
              <img src={Resume} height="150px" width="225px" alt="blog" />
            </a>
          </div>
          <div className={style.content}>
            <span>
              Here is my resume if you are interested in my background or want
              to hire me.
            </span>
          </div>
        </div>
      </div>
      <div className={style.card}>
        <div className={style.post}>
          <div className={style.cover}>
            <a
              target="_blank"
              rel="nofollow noopener noreferrer"
              href={"https://github.com/jonathanlamar/blog"}
            >
              <img src={ThisBlog} height="150px" width="225px" alt="blog" />
            </a>
          </div>
          <div className={style.content}>
            <span>
              was forked from a tech youtuber named Christian Chiarulli. His
              original version of the blog can be found
              <b>
                {" "}
                <a href="https://github.com/ChristianChiarulli/blog">here</a>
              </b>
              .
            </span>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default IndexPage
