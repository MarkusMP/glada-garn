import Layout from "../../components/Layout";
import Item from "../../components/Item";
import { API_URL, PER_PAGE } from "../../config/index";
import Category from "../../components/Category";
import Pagination from "../../components/Pagination";

import { Col, Row } from "react-bootstrap";

export default function CategoryByIdPage({
  items,
  categories,
  page,
  total,
  id,
}) {
  return (
    <Layout>
      <Row>
        <Col lg="2">
          <Category data={categories} />
        </Col>
        <Col lg="10">
          <Row>
            {items.length !== 0 ? (
              items.map((item) => <Item key={item.id} data={item} />)
            ) : (
              <div className="m-4">
                <h3>No Items in this category</h3>
              </div>
            )}
          </Row>
          <Pagination page={page} total={total} type={`/category/${id}`} />
        </Col>
      </Row>
    </Layout>
  );
}

export async function getServerSideProps({
  params: { id },
  query: { page = 1 },
}) {
  // Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  // Fetch categories items
  const res = await fetch(
    `${API_URL}/items?categories.id_contains=${id}&_limit=${PER_PAGE}&_start=${start}`
  );
  const items = await res.json();

  // Fetch categories
  const resCategories = await fetch(`${API_URL}/categories`);
  const categories = await resCategories.json();

  return {
    props: {
      page: +page,
      id,
      total: categories[--id].items.length,
      items: items,
      categories: categories.map((category) => ({
        id: category.id,
        name: category.name,
      })),
    },
  };
}
