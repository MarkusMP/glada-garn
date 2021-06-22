import Layout from "../components/Layout";
import Carousel from "../components/Carousel";
import Item from "../components/Item";
import { API_URL } from "../config/index";
import { Row } from "react-bootstrap";

export default function HomePage({ itemsCarousel, itemsFav, itemsComplete }) {
  return (
    <Layout>
      <Carousel data={itemsCarousel} />

      <div className="mt-4">
        <Row>
          <h1 className="pl-3">Recently Favorited Items</h1>
          {itemsFav &&
            itemsFav.map((item) => <Item key={item.id} data={item} />)}
        </Row>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/items?_limit=3`);
  const data = await res.json();

  const resFav = await fetch(
    `${API_URL}/items?favorite.id_contains=1&_limit=3`
  );
  const dataFav = await resFav.json();

  const resComplete = await fetch(
    `${API_URL}/items?completed.id_contains=1&_limit=3`
  );
  const dataComplete = await resComplete.json();

  return {
    props: {
      itemsComplete: dataComplete,
      itemsFav: dataFav,
      itemsCarousel: data,
    },
  };
}
