import { BsPencil, BsTrash } from "react-icons/bs";
import CategoryService from "../api/CategoryService";
import DeleteModal from "./modals/DeleteModal";
import TransactionModal from "./modals/TransactionModal";

const categoryService = new CategoryService();

export default function TransactionTable(transactionList, dashboard) {
    const transactions = transactionList.map((transaction, index) => {
        return (
            <tr className="align-middle" key={Math.random()} >
                {transaction.type === "Expense" ?
                    <th scope="row"><div className="text-danger">{transaction.type}</div></th> :
                    <th scope="row"><div className="text-success">{transaction.type}</div></th>}
                <td>{categoryService.getCategoryLabelByName(transaction.category)}</td>
                <td>{Intl.NumberFormat('en-US', { style: "currency", currency: "USD", }).format(transaction.value)}</td>
                <td>{transaction.day}/{transaction.month}/{transaction.year}</td>
                <td width="20%">{transaction.description}</td>
                <td width="256px" align="right">
                    <TransactionModal buttonVariant="secondary me-2" index={index} dashboard={dashboard} type={transaction.type} transaction={transaction} options={categoryService.getAllCategoryNames()} name='Edit transaction'
                        buttonContent={<><BsPencil size={16} /></>} />
                    <DeleteModal buttonVariant="secondary me-2" transaction={transaction} dashboard={dashboard} options={categoryService.getAllCategoryNames()}
                        buttonContent={<><BsTrash size={16} /></>} />
                </td>
            </tr>
        )
    });

    return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Type</th>
                        <th scope="col">Category</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Date</th>
                        <th scope="col">Description</th>
                        <th scope="col" ></th>
                    </tr>
                </thead>
                <tbody>
                    {transactions}
                </tbody>
            </table>
    );
}