import Layout from "../../components/Layout";
import { API_URL } from "../../config/index";
import { Row, Col } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";

export default function ItemPage({ item }) {
  return (
    <Layout>
      <Link href="/category">
        <a className="btns btns-secondary mt-2">Go Back</a>
      </Link>
      <Row className="mt-5">
        <Col className="d-flex justify-content-center">
          <Image
            src={
              item.image.formats.medium
                ? item.image.formats.medium.url
                : item.image.formats.thumbnail.url
            }
            height={400}
            width={350}
            className="m-auto"
          />
        </Col>
        <Col lg={5} className="mt-2">
          <h1>{item.name}</h1>
          <p>{item.description}</p>
          {item.size && (
            <ul>
              <li>Size: {item.size}</li>
            </ul>
          )}
        </Col>
      </Row>
    </Layout>
  );
}

export async function getServerSideProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/items?slug=${slug}`);

  const item = await res.json();

  return {
    props: {
      item: item[0],
    },
  };
}
