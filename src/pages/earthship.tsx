import * as React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";

interface NotFoundPageProps {
  data: { site: { siteMetadata: { title: string } } };
  location: { pathname: string };
}

const NotFoundPage = (props: NotFoundPageProps) => {
  const siteTitle = props.data.site.siteMetadata.title;

  return (
    <Layout location={props.location} title={siteTitle}>
      <h1>🦺 Under Construction 🦺</h1>
      <p>This page will be a streamlit dashboard soon.  For now, it is nothing.</p>
    </Layout>
  );
};

export const Head = () => <Seo title="404: Not Found" />;

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
