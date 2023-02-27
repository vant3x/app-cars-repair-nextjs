import { useCallback, useContext } from "react";
import { styled } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";

import SearchIcon from "@mui/icons-material/Search";
import { InputBase } from "@mui/material";
import { Theme } from "@mui/material";
import axiosClient from './../../config/axios';
import appContext from "../../context/app/appContext";
import { AppContextType } from "../../interfaces/AppContextType";

interface Props {
  theme: Theme;
}

const Search = styled("div")(({ theme }: Props) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }: Props) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "18ch",
      "&:focus": {
        width: "22ch",
      },
    },
  },
}));

const SearchBarComponent = () => {

  // context de la app
  const AppContext = useContext<AppContextType>(appContext);
  const { carsSearched, setCarsSearched } = AppContext;

    const debounce = (func: Function) => {
      let timer: NodeJS.Timeout | null;
      return (...args: any[]) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          timer = null;
          func(...args);
        }, 500);
      };
    };

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const search = e.target.value;
      const searchRes = await axiosClient.get(`/api/cars/search?query=${search}`);
      setCarsSearched(searchRes.data);
    };

    const optimizedFnSearch = useCallback(debounce(handleSearch), []);

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon sx={{ cursor: "pointer" }} />
      </SearchIconWrapper>
      <StyledInputBase
        onChange={(e) => optimizedFnSearch(e)}
        placeholder="Buscar auto"
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  );
};

export default SearchBarComponent;
