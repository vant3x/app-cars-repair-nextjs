import { useState, useEffect, useContext, MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ElectricCarIcon from "@mui/icons-material/ElectricCar";
import Link from "next/link";
import { useRouter } from "next/router";
import HeaderNav from "./HeaderNav";
import HeaderNavMobile from "./HeaderNavMobile";
import SearchBarComponent from "./SearchBar";
import authContext from "../../context/auth/authContext";
import appContext from "../../context/app/appContext";
import { AuthContextType } from "../../interfaces/AuthContextType";

function HeaderAppBar() {
  const router = useRouter();

  const AuthContext = useContext<AuthContextType>(authContext);
  const { user, userAuthtenticate } = AuthContext;

  const AppContext = useContext(appContext);
  const { resetState } = AppContext;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      userAuthtenticate();
    } else {
    }
  }, []);

  const pages = [
    { title: "Ver Carros", path: "/" },
    { title: "Nuevo  carro", path: "/nuevo-carro" },
    { title: "Gestionar Carros", path: "/gestionar-carros" },
  ];

  const logout = () => {
    handleCloseUserMenu();
    localStorage.removeItem("token");
    router.push("/login");
  };

  const settings = [
    { title: "Cuenta", onClick: () => handleCloseUserMenu() },
    { title: "Cerrar Sesión", onClick: () => logout() },
  ];

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavClick = () => {
    handleCloseNavMenu();
    resetState();
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href={"/"}>
            <ElectricCarIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
          </Link>
          <Link href={"/"}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              onClick={() => resetState()}
              sx={{
                mr: 4,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              QCode Cars
            </Typography>
          </Link>
          {anchorElNav !== null && (
            <HeaderNavMobile
              pages={pages}
              handleCloseNavMenu={handleNavClick}
              anchorElNav={anchorElNav}
              handleOpenNavMenu={handleOpenNavMenu}
            />
          )}

          <Link href={"/"}>
            <ElectricCarIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />
          </Link>
          <Link href={"/"}>
            <Typography
              variant="h5"
              noWrap
              component="a"
              onClick={() => resetState()}
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              QCode Cars
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <HeaderNav pages={pages} onClick={handleNavClick} />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              position: "relative",
              right: "90px",
            }}
          >
            <SearchBarComponent />
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Abrir opciones">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Alejandro Velasquez" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.title} onClick={setting.onClick}>
                  <Typography textAlign="center">{setting.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default HeaderAppBar;
