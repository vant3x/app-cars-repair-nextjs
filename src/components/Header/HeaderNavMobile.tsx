import * as React from "react";
import { MenuItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import Link from "next/link";

interface Props {
  handleCloseNavMenu: () => void;
  handleOpenNavMenu: (e: React.MouseEvent<HTMLElement>) => void;
  anchorElNav: HTMLElement;
  pages: { title: string; path?: string }[];
}

function HeaderNavMobile({
  handleCloseNavMenu,
  handleOpenNavMenu,
  anchorElNav,
  pages,
}: Props) {
  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          {pages.map((page) => page.path && (
                    <Link href={page.path} key={page.path}>
                    <MenuItem key={page.path} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page.title}</Typography>
                    </MenuItem>
                  </Link>
          ))}
        </Menu>
      </Box>
    </>
  );
}

export default HeaderNavMobile;
