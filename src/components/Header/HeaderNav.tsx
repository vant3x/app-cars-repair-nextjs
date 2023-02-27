import { Button, MenuItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "next/link";

interface Props {
  onClick: () => void;
  pages: { title: string; path: string }[];
}

function HeaderNav({ onClick, pages }: Props) {
  return (
    <>
      {pages.map((page) => (
        <Link href={page.path} key={page.path}>
          <Button
            onClick={onClick}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            {page.title}
          </Button>
        </Link>
      ))}
    </>
  );
}

export default HeaderNav;
