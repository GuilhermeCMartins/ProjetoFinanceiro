import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";

import { styled } from "@stitches/react";

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

const Quantity = styled("h4", {
    variants: {
        color: {
            red: {
                color: "red"
            },
            green: {
                color: "green"
            }
        },

    }
})

export {
    TableStyled,
    TableCellStyled,
    TableCellStyledGray,
    TableCellStyledTitle,
    TableRowStyled,
    TitleRow,
    CustomTableContainer,
    Quantity

}