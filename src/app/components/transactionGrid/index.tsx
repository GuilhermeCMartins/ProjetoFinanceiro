import { styled } from "@stitches/react";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";

type Transaction = {
  id: string;
  description: string;
  amount: number;
  category: Category;
  type: string;
};

type Category = {
  id: string;
  name: string;
};

type Goal = {
  id: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
};

interface Props {
  wallet: {
    walletId: string;
    balance: number;
    transactions: Transaction[];
    categories: Category[];
    goals: Goal[];
  };
}

const TableStyled = styled(Table, {
  borderCollapse: "collapse",
  width: "100%",
});

const TableCellStyled = styled(TableCell, {
  borderBottom: "1px solid #ECECEC",
  "&:last-child": {
    borderRight: "none",
  },
  padding: "8px",
});

const TableCellStyledGray = styled(TableCell, {
  color: "#C7C7C7",
  padding: "10px",
});

const TableCellStyledTitle = styled(TableCell, {
  borderBottom: "none",
  color: "#AEAEAE",
  fontWeight: "400",
  marginBottom: 0,
  padding: "5px",
});

const TableRowStyled = styled(TableRow, {
  "&:last-child td": {
    borderBottom: "1px solid #ECECEC",
  },
});

const TitleRow = styled(TableRow, {
  borderBottom: "none",
});

const CustomTableContainer = styled(TableContainer, {
  boxShadow: "none",
  width: "90%",
  margin: "0 auto",
});

const PAGE_SIZE = 3;

const TransactionGrid = ({ wallet }: Props) => {
  const [page, setPage] = React.useState(0);
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const startIndex = page * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentItems = wallet.transactions.slice(startIndex, endIndex);

  return (
    <CustomTableContainer>
      <TableStyled aria-label="simple table">
        <TableHead>
          <TitleRow>
            <TableCellStyledTitle>Receiver</TableCellStyledTitle>
            <TableCellStyledTitle align="right">Type</TableCellStyledTitle>
            <TableCellStyledTitle align="right">Date</TableCellStyledTitle>
            <TableCellStyledTitle align="right">Amount</TableCellStyledTitle>
          </TitleRow>
        </TableHead>
        <TableBody>
          {currentItems.map((tran, index) => (
            <TableRowStyled key={index}>
              <TableCellStyled component="th" scope="row">
                {tran.description}
              </TableCellStyled>
              <TableCellStyledGray align="right">
                {tran.type === "deposit" ? "Depósito" : "Saque"}
              </TableCellStyledGray>
              <TableCellStyledGray align="right">
                {tran.category.name}
              </TableCellStyledGray>
              <TableCellStyled align="right">
                {tran.type === "deposit" ? (
                  <h4 style={{ color: "green" }}>
                    R$ {tran.amount.toFixed(2)}
                  </h4>
                ) : (
                  <h4 style={{ color: "red" }}>R$ {tran.amount.toFixed(2)}</h4>
                )}
              </TableCellStyled>
            </TableRowStyled>
          ))}
        </TableBody>
      </TableStyled>
      <TablePagination
        component="div"
        count={wallet.transactions.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={PAGE_SIZE}
        rowsPerPageOptions={[PAGE_SIZE]}
      />
    </CustomTableContainer>
  );
};

export default TransactionGrid;
