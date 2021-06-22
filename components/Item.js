import styles from "../styles/Item.module.css";
import { Card, Col } from "react-bootstrap";
import Link from "next/link";

export default function Item({ data }) {
  return (
    <Col>
      <Card
        style={{ width: "16rem" }}
        className={styles.item}
        className="m-auto"
      >
        <Link href={`/items/${data.slug}`}>
          <a>
            <Card.Img
              variant="top"
              src={
                data.image.formats.medium
                  ? data.image.formats.medium.url
                  : data.image.formats.thumbnail.url
              }
              height={200}
            />
          </a>
        </Link>
        <Card.Body>
          <Link href={`/items/${data.slug}`}>
            <a>
              <Card.Title>{data.name}</Card.Title>
            </a>
          </Link>
          <Card.Text>{data.description}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}
