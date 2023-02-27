import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Tooltip,
  IconButton,
  Chip,
} from "@mui/material";
import { Link } from "@mui/material";
import { useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from '@mui/icons-material/Visibility';
import  { Link as NextLink }  from "next/link";
import { CarDetail } from "./../../interfaces/CarDetail.interface";
import { useRouter } from "next/router";
import appContext from "./../../context/app/appContext";

interface Props {
  rows: CarDetail[];
  emptyRows: number;
  rowsPerPage: number;
  page: number;
  order: "asc" | "desc";
  dense: boolean;
  handleClick: (event: any, id: string) => void;
  orderBy: string;
  isSelected: (id: string) => boolean;
  stableSort: (array: any[], comparator: (a: any, b: any) => number) => any[];
  getComparator: (
    order: "asc" | "desc",
    orderBy: string
  ) => (a: any, b: any) => number;
}

const CarTableBody = ({
  stableSort,
  rows,
  page,
  emptyRows,
  rowsPerPage,
  getComparator,
  order,
  orderBy,
  isSelected,
  dense,
  handleClick,
}: Props) => {
    const AppContext = useContext(appContext);
    const { loading, deleteCarModal, setOpenDeleteCarModal } = AppContext;
  
    const router = useRouter();
  return (
    <>
      <TableBody>
        {stableSort(rows, getComparator(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row, index) => {
            const isItemSelected = isSelected(row._id);
            const labelId = `enhanced-table-checkbox-${index}`;

            return (
              <TableRow
                hover
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row._id}
                selected={isItemSelected}
              >
                <TableCell
                  padding="checkbox"
                  onClick={(event) => handleClick(event, row._id)}
                >
                  <Checkbox
                    color="primary"
                    checked={isItemSelected}
                    inputProps={{
                      "aria-labelledby": labelId,
                    }}
                  />
                </TableCell>
                <TableCell
                  component="th"
                  id={labelId}
                  scope="row"
                  padding="none"
                >
                  <Link
                    variant="body2"
                    component={NextLink}
                    color="primary"
                    href={`/detalle/${row._id}`}
                  >
                    {row.brand} {row.model}
                  </Link>
                </TableCell>
                <TableCell align="center">
                  {new Date(row.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell align="right">{row.owner}</TableCell>
                <TableCell align="right">
                <Chip label= {row.state ? 'Activo' : 'Inactivo'} color="primary" variant={!row.state ? "outlined"  : "filled"}  />

                   </TableCell>
                <TableCell align="center">
                <Tooltip title="Ver detalle">
                    <IconButton onClick={()=> router.push(`/detalle/${row?._id}`)} >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                <Tooltip title="Editar">
                    <IconButton color="info" onClick={()=> router.push(`/editar/${row?._id}`)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton onClick={()=> setOpenDeleteCarModal(row._id, true) } color="primary" sx={{color: '#f50057'}}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
            
                </TableCell>
              </TableRow>
            );
          })}
        {emptyRows > 0 && (
          <TableRow
            style={{
              height: (dense ? 33 : 53) * emptyRows,
            }}
          >
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </TableBody>
    </>
  );
};

export default CarTableBody;
