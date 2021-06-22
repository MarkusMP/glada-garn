import styles from "../styles/Category.module.css";
import Link from "next/link";

export default function Category({ data }) {
  return (
    <div className={styles.category}>
      <ul>
        <li className="p-1">
          <Link href="/category">
            <a className="text-dark p-2 ">All</a>
          </Link>
        </li>
        {data.map((x) => (
          <li key={x.id} className="p-1">
            <Link href={`/category/${x.id}`}>
              <a className="text-dark p-2 ">{x.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
