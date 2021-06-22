import { Carousel, Image } from "react-bootstrap";
import Link from "next/link";

export default function CarouselComp({ data }) {
  return (
    <Carousel pause="hover" className="bg-dark">
      {data &&
        data.map((item) => (
          <Carousel.Item key={item.id}>
            <Link href={`/items/${item.slug}`}>
              <a>
                <Image
                  src={item.image.formats.thumbnail.url}
                  alt={item.name}
                  fluid
                  className="d-flex justify-content-center"
                />
                <Carousel.Caption className="carousel-caption">
                  <h2>{item.name}</h2>
                </Carousel.Caption>
              </a>
            </Link>
          </Carousel.Item>
        ))}
    </Carousel>
  );
}
