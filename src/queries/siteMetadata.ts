import { useStaticQuery, graphql } from "gatsby";

export interface SiteMetadataQueryResult {
  title: string;
  description: string;
  author: {
    name: string;
    summary: string;
  };
  social: {
    github: string;
    linkedin: string;
    strava: string;
  };
}

export const querySiteMetadata: () => SiteMetadataQueryResult = () => {
  const res = useStaticQuery(graphql`
    query SiteMetadataQuery {
      site {
        siteMetadata {
          title
          description
          author {
            name
            summary
          }
          social {
            github
            linkedin
            strava
          }
        }
      }
    }
  `);

  return res.site.siteMetadata;
};
