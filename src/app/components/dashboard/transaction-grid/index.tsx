import * as React from "react";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import { format } from "date-fns";
import {
  CustomTableContainer,
  Quantity,
  TableCellStyled,
  TableCellStyledGray,
  TableCellStyledTitle,
  TableRowStyled,
  TableStyled,
  TitleRow,
} from "./style";
import { Category, Goal, Transaction } from "@/app/types/walletType";

interface Props {
  wallet: {
    walletId: string;
    balance: number;
    transactions: Transaction[];
    categories: Category[];
    goals: Goal[];
  };
}

const PAGE_SIZE = 3;

const formatDateWallet = (timestamp: any) => {
  const date = new Date(parseInt(timestamp));
  const formattedDate = format(date, "dd/MM/yyyy");
  return formattedDate;
};

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
            <TableCellStyledTitle>Categoria</TableCellStyledTitle>
            <TableCellStyledTitle align="right">Tipo</TableCellStyledTitle>
            <TableCellStyledTitle align="right">Data</TableCellStyledTitle>
            <TableCellStyledTitle align="right">
              Quantidade
            </TableCellStyledTitle>
          </TitleRow>
        </TableHead>
        <TableBody>
          {currentItems.map((tran, index) => (
            <TableRowStyled key={index}>
              <TableCellStyled component="th" scope="row">
                {tran.category.name}
              </TableCellStyled>
              <TableCellStyledGray align="right">
                {tran.type === "deposit" ? "Depósito" : "Saque"}
              </TableCellStyledGray>
              <TableCellStyledGray align="right">
                {formatDateWallet(tran.date)}
              </TableCellStyledGray>
              <TableCellStyled align="right">
                <Quantity color={tran.type === "deposit" ? "green" : "red"}>
                  R$ {tran.amount.toFixed(2)}
                </Quantity>
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
