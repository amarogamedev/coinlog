import React from "react";
import CategoryService from "../api/CategoryService";
import TransactionService from '../api/TransactionService';

import { Card, Stack } from "react-bootstrap";
import { Chart } from "react-google-charts";

import { BsCashCoin, BsCart2, BsCoin, BsCalendar4Week, BsJournalBookmark, BsPencil, BsCardList } from "react-icons/bs";

import TransactionTable from "../components/TransactionTable";
import TransactionModal from "../components/modals/TransactionModal";
import InitialValueModal from "../components/modals/InitialValueModal";
import MockDataModal from "../components/modals/MockDataModal";

export default class Dashboard extends React.Component {

    state = {
        transactionList: [],
    }

    constructor() {
        super();
        this.categoryService = new CategoryService();
        this.transactionService = new TransactionService();
        this.state.transactionList = this.transactionService.getAllTransactions();
    }

    updateData = () => {
        this.forceUpdate();
        this.setState({ transactionList: this.transactionService.getAllTransactions() });
    };

    MonthOverviewChart(type) {
        const filteredTransactionList = this.transactionService.getCurrentMonthTransactions().filter(
            transaction => (transaction.type === type)
        );

        const transactions = filteredTransactionList.map(transaction => {
            return (
                [transaction.category, parseFloat(transaction.value)]
            )
        });

        transactions.splice(0, 0, ['Category', 'Amount'])
        return transactions;
    }

    render() {
        return (
            <div>
                <MockDataModal dashboard={this} />
                <Stack direction="horizontal" gap={4}>
                    <Card style={{width:"60%", minHeight:"200px"}}>
                        <Card.Header><div className="text-body fs-4 fw-bold"><BsCoin />
                            &nbsp;&nbsp;&nbsp;Control panel</div></Card.Header>
                        <Card.Body>
                            <div className="d-flex align-items-center mb-2">
                                <div className="container">
                                    Current balance: <b>{Intl.NumberFormat('en-US', { style: "currency", currency: "USD", })
                                    .format(this.transactionService.getBalance(this.state.transactionList))}</b>
                                    <div className="d-grid gap-2" style={{marginTop:"8px"}}>
                                        <InitialValueModal dashboard={this} buttonVariant="secondary mb-2" buttonContent={<><BsPencil size={16} /> &nbsp;&nbsp;Edit initial value</>} />
                                    </div>
                                    <Stack direction="horizontal" gap={2}>
                                        <TransactionModal buttonVariant="success w-100" name='New income' type="Income" index={null} dashboard={this}
                                            options={this.categoryService.getAllCategoryNames()}
                                            buttonContent={<><BsCashCoin size={16} /> &nbsp;&nbsp;Add new income</>} />
                                        <TransactionModal buttonVariant="danger w-100" name='New expense' type="Expense" index={null} dashboard={this}
                                            options={this.categoryService.getAllCategoryNames()}
                                            buttonContent={<><BsCart2 size={16} /> &nbsp;&nbsp;Add new expense</>} />
                                    </Stack>
                                </div>
                            </div>
                        </Card.Body >
                    </Card >
                    <Card style={{minHeight:"230px"}}>
                        <Card.Header><div className="text-body fs-4 fw-bold"><BsCardList />&nbsp;&nbsp;&nbsp;About </div></Card.Header>
                        <Card.Body>
                            <div className="d-flex align-items-center mb-2">
                                <div className="container w-100">
                                    Welcome to CoinLog! This is a student project made by Luis Fellipe Amaro where you can manage your finances.
                                    The data is saved locally on your browser and can be deleted on the settings
                                </div>
                            </div>
                        </Card.Body >
                    </Card >
                </Stack>
                <br />
                <Card>
                    <Card.Header><div className="text-body fs-4 fw-bold"><BsCalendar4Week />&nbsp;&nbsp;&nbsp;This month's overview</div></Card.Header>
                    <div className="d-flex justify-content-center p-2 mt-4">
                        <div className="w-50" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
                            <div className="text-success me-5">+ Earnings: {Intl.NumberFormat('en-US', { style: "currency", currency: "USD", })
                                .format(this.transactionService.getCurrentMonthBalance("Income"))}
                            </div>
                            <Chart chartType="PieChart" width="auto" height="256px" data={this.MonthOverviewChart("Income")}
                                options={{
                                    pieHole: 0.4,
                                    colors: ["#2fb380", "#54edd5", "#54a9ed", "#5455ed", "#a854ed", "#ed549e", "#ed5459", "#ed9154", "#f4bd61"],
                                    fontName: 'Inter',
                                    backgroundColor: { fill: 'transparent' }
                                }} />
                        </div>
                        <div className="w-50" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
                            <div className="text-danger me-5">- Expenses: {Intl.NumberFormat('en-US', { style: "currency", currency: "USD", })
                                .format(this.transactionService.getCurrentMonthBalance("Expense"))}
                            </div>
                            < Chart chartType="PieChart" width="auto" height="256px" data={this.MonthOverviewChart("Expense")}
                                options={{
                                    pieHole: 0.4,
                                    colors: ["#f4bd61", "#ed9154", "#ed5459", "#ed549e", "#a854ed", "#5455ed", "#54a9ed", "#54edd5", "#2fb380"],
                                    fontName: 'Inter',
                                    backgroundColor: { fill: 'transparent' }
                                }}
                            />
                        </div>
                    </div>
                </Card >
                <br />
                <Card>
                    <Card.Header>
                        <div className="text-body fs-4 fw-bold"><BsJournalBookmark />&nbsp;&nbsp;&nbsp;Transactions</div>
                    </Card.Header>
                    {TransactionTable(this.state.transactionList, this)}
                </Card>
            </div >
        )
    }
}