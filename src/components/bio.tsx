/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            github
            linkedin
          }
        }
      }
    }
  `);

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata.author;
  const social = data.site.siteMetadata.social;

  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/profile-pic.png"
        width={60}
        height={60}
        quality={95}
        alt="Profile picture"
      />
      <p>
        Written by <strong>{author.name}</strong>: {author?.summary}
      </p>
      <div className="bio-social">
        <a target="_blank" rel="nofollow noopener noreferrer" href={`https://github.com/${social?.github}`}>
          <FaGithub color="#FFFFFF" size="30" />
        </a>
        <a target="_blank" rel="nofollow noopener noreferrer" href={`https://www.linkedin.com/in/${social.linkedin}`}>
          <FaLinkedin color="#3077B0" size="30" />
        </a>
      </div>
    </div>
  );
};

export default Bio;
