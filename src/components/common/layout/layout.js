import React from "react";
import Navbar from "../header/navbar";
import { Helmet } from "react-helmet";
import Footer from "../footer/footer";
import './layout.css'

const PublicLayout = (props) => {
  const { title, headerClassName, children } = props;
  const PageTitle = `WeatherPortal ${title ? "- " + title : ""}`;
  return (
    <React.StrictMode>
      <Helmet>
        <title>{PageTitle}</title>
      </Helmet>
      <Navbar />
      <main className="main_body">{children}</main>
      <Footer/>
    </React.StrictMode>
  );
};

export default PublicLayout;
