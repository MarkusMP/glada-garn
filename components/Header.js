import styles from "../styles/Header.module.css";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>Glada Garn</a>
        </Link>
      </div>

      <nav className={open ? styles.mobile : ""}>
        <ul>
          <li>
            <Link href="/category">
              <a>Categories</a>
            </Link>
          </li>
          <li>
            <Link href="/favorites">
              <a>Favorites</a>
            </Link>
          </li>
          <li>
            <Link href="/completed">
              <a>Completed Projects</a>
            </Link>
          </li>
          <li>
            <Link href="/pending">
              <a>Pending Projects</a>
            </Link>
          </li>
        </ul>
      </nav>
      <div
        className={styles.burger}
        onClick={() => setOpen((prevOpen) => !prevOpen)}
      >
        <FaBars />
      </div>
    </header>
  );
}
