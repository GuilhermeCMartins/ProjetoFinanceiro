import * as Yup from "yup";

const transactionSchema = Yup.object().shape({
    description: Yup.string().required("A descrição é obrigatória"),
    amount: Yup.number().required("O valor é obrigatório").min(0, "O valor deve ser maior ou igual a 0"),
    categoryId: Yup.string().required("A categoria é obrigatória"),
    type: Yup.string().required("O tipo de transação é obrigatório"),
});


export {
    transactionSchema
}