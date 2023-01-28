/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { FaGithub, FaLinkedin, FaStrava } from "react-icons/fa";
import { querySiteMetadata } from "../queries/siteMetadata";

const Bio = () => {
  const siteMetadata = querySiteMetadata();
  const author = siteMetadata.author;
  const social = siteMetadata.social;

  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/profile-pic.png"
        width={90}
        height={90}
        quality={95}
        alt="Profile picture"
      />
      <div className="bio-about">
        <p>
          Written by <strong>{author.name}</strong>: {author?.summary}
        </p>
        <div className="bio-social">
          <div>
            <a target="_blank" rel="nofollow noopener noreferrer" href={`https://github.com/${social?.github}`}>
              <FaGithub color="#FFFFFF" size="30" />
            </a>
          </div>
          <div>
            <a
              target="_blank"
              rel="nofollow noopener noreferrer"
              href={`https://www.linkedin.com/in/${social.linkedin}`}
            >
              <FaLinkedin color="#3077B0" size="30" />
            </a>
          </div>
          <div>
            <a
              target="_blank"
              rel="nofollow noopener noreferrer"
              href={`https://www.strava.com/athletes/${social.strava}`}
            >
              <FaStrava color="#FC4800" size="30" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bio;
