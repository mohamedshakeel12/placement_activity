import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  TablePagination,
  IconButton,
  Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Info } from '@mui/icons-material';
import { useState } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.success.dark,
  color: theme.palette.common.white,
  fontWeight: 600,
  borderBottom: 'none',
  '&:first-of-type': {
    borderTopLeftRadius: theme.shape.borderRadius,
  },
  '&:last-child': {
    borderTopRightRadius: theme.shape.borderRadius,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
    cursor: 'pointer',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const CustomTable = ({ columns, data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell key={column.id} align={column.align || 'left'}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {column.label}
                    {column.tooltip && (
                      <Tooltip title={column.tooltip}>
                        <IconButton size="small" sx={{ color: 'inherit', ml: 0.5 }}>
                          <Info fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((row, index) => (
              <StyledTableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    {column.render ? column.render(row) : row[column.id]}
                  </TableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          borderTop: '1px solid rgba(224, 224, 224, 1)',
          bgcolor: 'background.paper'
        }}
      />
    </Box>
  );
};

export default CustomTable; 