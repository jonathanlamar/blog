import * as React from "react";
import { Link } from "gatsby";

interface LayoutProps {
  location: { pathname: string };
  title: string;
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = props.location.pathname === rootPath;
  let header;

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{props.title}</Link>
      </h1>
    );
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {props.title}
      </Link>
    );
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{props.children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  );
};

export default Layout;
