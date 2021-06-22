import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import { Container } from "react-bootstrap";

export default function Layout({ title, keywords, description, children }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <Header />

      <Container>{children}</Container>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "Glada Garn | Cross stitch diary",
  description: "Find my items and cross-stitch",
  keywords: "cross-stitch, whool, stitch",
};
