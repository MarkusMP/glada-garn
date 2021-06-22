import Layout from "../components/Layout";
import { API_URL, PER_PAGE } from "../config/index";
import { Row } from "react-bootstrap";
import Item from "../components/Item";
import Pagination from "../components/Pagination";

export default function favorites({ items, total, page }) {
  return (
    <Layout>
      <h1 className="p-3">My Favorites</h1>
      <Row>
        {items && items.map((item) => <Item key={item.id} data={item} />)}
      </Row>
      <Pagination page={page} total={total} type={`/favorites`} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  const res = await fetch(
    `${API_URL}/items?favorite.id_contains=1&_limit=${PER_PAGE}&_start=${start}`
  );
  const data = await res.json();

  const resTotal = await fetch(`${API_URL}/favorites/countitems`);
  const dataTotal = await resTotal.json();

  return {
    props: {
      items: data,
      total: dataTotal,
      page: +page,
    },
  };
}
