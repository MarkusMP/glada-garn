import Layout from "../../components/Layout";
import Item from "../../components/Item";
import { API_URL, PER_PAGE } from "../../config/index";
import Category from "../../components/Category";
import Pagination from "../../components/Pagination";
import { Col, Row } from "react-bootstrap";

export default function CategoryPage({ items, categories, page, total }) {
  return (
    <Layout>
      <Row>
        <Col lg="2">
          <Category data={categories} />
        </Col>
        <Col lg="10">
          <Row>
            {items && items.map((item) => <Item key={item.id} data={item} />)}
          </Row>
          <Pagination page={page} total={total} type="/category" />
        </Col>
      </Row>
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  //  Fetch total/count

  const totalRes = await fetch(`${API_URL}/items/count`);
  const total = await totalRes.json();

  // Fetch items
  const res = await fetch(
    `${API_URL}/items?_limit=${PER_PAGE}&_start=${start}`
  );
  const items = await res.json();

  // Fetch Catogires

  const resCategories = await fetch(`${API_URL}/categories`);
  const categories = await resCategories.json();

  return {
    props: {
      items,
      page: +page,
      total,
      categories: categories.map((category) => ({
        id: category.id,
        name: category.name,
      })),
    },
  };
}
