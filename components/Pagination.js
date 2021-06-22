import Link from "next/link";
import { PER_PAGE } from "../config/index";

export default function Pagination({ page, total, type }) {
  const lastPage = Math.ceil(total / PER_PAGE);
  return (
    <>
      {page > 1 && (
        <Link href={`${type}?page=${page - 1}`}>
          <a className="btns-secondary">Prev</a>
        </Link>
      )}

      {page < lastPage && (
        <Link href={`${type}?page=${page + 1}`}>
          <a className="btns-secondary">Next</a>
        </Link>
      )}
    </>
  );
}
