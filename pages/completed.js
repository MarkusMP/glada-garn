import Layout from "../components/Layout";
import { API_URL, PER_PAGE } from "../config/index";
import { Row } from "react-bootstrap";
import Item from "../components/Item";
import Pagination from "../components/Pagination";

export default function CompletedPage({ items, total, page }) {
  return (
    <Layout>
      <h1 className="p-3">My Completed Items</h1>
      <Row>
        {items && items.map((item) => <Item key={item.id} data={item} />)}
      </Row>
      <Pagination page={page} total={total} type={`/completed`} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  // fetch completed items
  const res = await fetch(
    `${API_URL}/items?completed.id_contains=1&_limit=${PER_PAGE}&_start=${start}`
  );
  const data = await res.json();

  // fetch
  const completedRes = await fetch(`${API_URL}/completeds/countitems`);
  const completedData = await completedRes.json();

  return {
    props: {
      total: completedData,
      page: +page,
      items: data,
    },
  };
}
