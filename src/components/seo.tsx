/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";

interface SeoProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

const Seo = (props: SeoProps) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            social {
              twitter
            }
          }
        }
      }
    `
  );

  const metaDescription = props.description || site.siteMetadata.description;
  const defaultTitle = site.siteMetadata?.title;

  return (
    <>
      <title>{defaultTitle ? `${props.title} | ${defaultTitle}` : props.title}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={site.siteMetadata?.social?.github || ``} />
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={metaDescription} />
      {props.children}
    </>
  );
};

export default Seo;
