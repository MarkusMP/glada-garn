import Layout from "../components/Layout";
import { API_URL, PER_PAGE } from "../config/index";
import { Row } from "react-bootstrap";
import Item from "../components/Item";
import Pagination from "../components/Pagination";

export default function PendingPage({ items, total, page }) {
  return (
    <Layout>
      <h1 className="p-3">My Pending Projects</h1>
      <Row>
        {items && items.map((item) => <Item key={item.id} data={item} />)}
      </Row>
      <Pagination page={page} total={total} type={`/pending`} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  // fetch pending items
  const res = await fetch(
    `${API_URL}/items?pendings.id_contains=1&_limit=${PER_PAGE}&_start=${start}`
  );
  const data = await res.json();

  // fetch
  const pendingRes = await fetch(`${API_URL}/pendings/countitems`);
  const pendingData = await pendingRes.json();

  return {
    props: {
      total: pendingData,
      page: +page,
      items: data,
    },
  };
}
