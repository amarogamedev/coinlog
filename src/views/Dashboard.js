import React from "react";
import CategoryService from "../api/CategoryService";
import { Card, Col, Row, Stack } from "react-bootstrap";
import { Chart } from "react-google-charts";

import { BsCashCoin, BsCart2, BsCoin, BsCalendar4Week, BsJournalBookmark, BsFunnel, BsPencil, BsTrash, BsPlusLg } from "react-icons/bs";

import TransactionModal from "../components/TransactionModal";
import FilterModal from "../components/FilterModal";
import DeleteModal from "../components/DeleteModal";

let initialValue = 3000

let transactionList = [
    {
        type: 'Expense',
        category: 'Meals',
        value: 20.80,
        year: '2022',
        month: '10',
        day: '25',
        description: 'pizza'
    },
    {
        type: 'Income',
        category: 'Investment',
        value: 500,
        year: '2022',
        month: '10',
        day: '25',
        description: 'bitcoin'
    },
    {
        type: 'Expense',
        category: 'Clothing',
        value: 150,
        year: '2022',
        month: '10',
        day: '25',
        description: 'nike t shirt'
    },
    {
        type: 'Income',
        category: 'Sale',
        value: 40,
        year: '2022',
        month: '10',
        day: '25',
        description: 'sold my old shoes'
    },
    {
        type: 'Expense',
        category: 'Mobility',
        value: 50,
        year: '2022',
        month: '10',
        day: '25',
        description: 'gas'
    },
    {
        type: 'Income',
        category: 'Gambling',
        value: 100,
        year: '2022',
        month: '10',
        day: '25',
        description: 'palmeiras game'
    },
    {
        type: 'Expense',
        category: 'Bills',
        value: 300,
        year: '2022',
        month: '10',
        day: '25',
        description: 'credit card bill'
    },
    {
        type: 'Income',
        category: 'Salary',
        value: 1500,
        year: '2022',
        month: '10',
        day: '25',
        description: 'paytrack'
    },
    {
        type: 'Expense',
        category: 'Entertainment',
        value: 20,
        year: '2022',
        month: '10',
        day: '25',
        description: 'movie'
    },
    {
        type: 'Income',
        category: 'Gift',
        value: 50,
        year: '2022',
        month: '10',
        day: '25',
        description: 'birthday gift'
    }
]

export default class Dashboard extends React.Component {

    constructor() {
        super();
        this.categoryService = new CategoryService();
    }

    getBalance() {
        let total = initialValue;
        // eslint-disable-next-line array-callback-return
        transactionList.map(transaction => {
            transaction.type === 'Income' ? total += transaction.value : total -= transaction.value;
        });
        return total;
    }

    getCurrentMonthBalance(type) {
        let total = 0;
        // eslint-disable-next-line array-callback-return
        this.getCurrentMonthTransactions().map(transaction => {
            if (transaction.type === type) {
                total += transaction.value;
            }
        });
        return total;
    }

    getCurrentMonthTransactions() {
        const today = new Date();
        const currentMonth = (today.getMonth() + 1).toString();
        const currentYear = today.getFullYear().toString();

        const filteredTransactionList = transactionList.filter(
            transaction => (transaction.year === currentYear) && (transaction.month === currentMonth)
        );

        return filteredTransactionList;
    }

    getTransactionTable() {
        //substituir esse parametro por um get all transactions
        const transactions = transactionList.map(transaction => {
            return (
                <tr>
                    {transaction.type === 'Expense' ?
                        <th scope="row"><div className="text-danger">{transaction.type}</div></th> :
                        <th scope="row"><div className="text-success">{transaction.type}</div></th>}
                    <td>{this.categoryService.getCategoryLabelByName(transaction.category)}</td>
                    <td>{Intl.NumberFormat('en-US', {
                        style: "currency",
                        currency: "USD",
                    }).format(transaction.value)}</td>
                    <td>{transaction.day}/{transaction.month}/{transaction.year}</td>
                    <td>{transaction.description}</td>
                    <td>
                        <Stack direction="horizontal" gap={2}>
                            <TransactionModal buttonVariant="secondary" options={this.categoryService.getAllCategoryNames()} name='Edit transaction' buttonContent={
                                <>
                                    <BsPencil size={16} /> &nbsp;&nbsp;Edit
                                </>
                            } />
                            <DeleteModal buttonVariant="secondary" options={this.categoryService.getAllCategoryNames()} buttonContent={
                                <>
                                    <BsTrash size={16} /> &nbsp;&nbsp;Delete
                                </>
                            } />
                        </Stack>
                    </td>
                </tr>
            )
        });
        return transactions;
    }

    getMonthOverviewChart(type) {
        const filteredTransactionList = this.getCurrentMonthTransactions().filter(
            transaction => (transaction.type === type)
        );

        const transactions = filteredTransactionList.map(transaction => {
            return (
                [transaction.category, transaction.value]
            )
        });

        transactions.splice(0, 0, ['Category', 'Amount'])
        return transactions;
    }

    render() {
        return (
            <div>
                <Card>
                    <Card.Header><div className="text-body fs-4 fw-bold"><BsCoin />
                        &nbsp;&nbsp;&nbsp;Current balance: {Intl.NumberFormat('en-US', {
                            style: "currency",
                            currency: "USD",
                        }).format(this.getBalance())}</div></Card.Header>
                    <Card.Body>
                        <div className="d-flex align-items-center me-5 mb-2">
                            <div className="container">
                                {//<div className="text">Weekly cash flow</div>
                                    //<div className="text mb-2">Texto Texto Texto Texto </div>
                                }
                                <div className="d-grid gap-2">
                                    <TransactionModal buttonVariant="secondary mb-2" options={this.categoryService.getAllCategoryNames()} name='New transaction' buttonContent={
                                        <>
                                            <BsPencil size={16} /> &nbsp;&nbsp;Edit initial value
                                        </>
                                    } />
                                </div>
                                <Stack direction="horizontal" gap={2}>
                                    <TransactionModal buttonVariant="success w-100" options={this.categoryService.getAllCategoryNames()} name='New transaction' type='Income' buttonContent={
                                        <>
                                            <BsCashCoin size={16} /> &nbsp;&nbsp;Add new income
                                        </>
                                    } />
                                    <TransactionModal buttonVariant="danger w-100" options={this.categoryService.getAllCategoryNames()} name='New transaction' type='Expense' buttonContent={
                                        <>
                                            <BsCart2 size={16} /> &nbsp;&nbsp;Add new expense
                                        </>
                                    } />
                                </Stack>
                            </div>
                            <div className="container">
                                Welcome to CoinLog! This is a student project made by Luis Fellipe Amaro where you can manage your finances.
                                The data is saved locally on your browser and can be deleted on the settings.
                            </div>
                        </div>
                    </Card.Body >
                </Card >
                <br />
                <Card>
                    <Card.Header><div className="text-body fs-4 fw-bold"><BsCalendar4Week />&nbsp;&nbsp;&nbsp;This month's overview</div></Card.Header>
                    <div className="d-flex justify-content-center p-2 mt-4">
                        <div className="w-50" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <div className="text-success me-5">+ Earnings: {Intl.NumberFormat('en-US', {
                                style: "currency",
                                currency: "USD",
                            }).format(this.getCurrentMonthBalance('Income'))}
                            </div>
                            <Chart
                                chartType="PieChart"
                                width="auto"
                                height="256px"
                                data={this.getMonthOverviewChart('Income')}
                                options={{
                                    pieHole: 0.4,
                                    colors: ["#2fb380", "#54edd5", "#54a9ed", "#5455ed", "#a854ed", "#ed549e", "#ed5459", "#ed9154", "#f4bd61"],
                                    fontName: 'Inter',
                                    backgroundColor: { fill: 'transparent' }
                                }}
                            />
                        </div>
                        <div className="w-50" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <div className="text-danger me-5">- Expenses: {Intl.NumberFormat('en-US', {
                                style: "currency",
                                currency: "USD",
                            }).format(this.getCurrentMonthBalance('Expense'))}
                            </div>
                            < Chart
                                chartType="PieChart"
                                width="auto"
                                height="256px"
                                data={this.getMonthOverviewChart('Expense')}
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
                        <Row>
                            <Col>
                                <div className="text-body fs-4 fw-bold"><BsJournalBookmark />&nbsp;&nbsp;&nbsp;Transactions</div>
                            </Col>
                            <Col style={{ display: 'flex', justifyContent: 'right' }}>
                                <Stack direction="horizontal" gap={2}>
                                    <TransactionModal buttonVariant="secondary" options={this.categoryService.getAllCategoryNames()} name='New transaction' buttonContent={
                                        <>
                                            <BsPlusLg size={16} /> &nbsp;&nbsp;Add new
                                        </>
                                    } />
                                    <FilterModal buttonVariant="secondary" options={this.categoryService.getAllCategoryNames()} buttonContent={
                                        <>
                                            <BsFunnel size={16} /> &nbsp;&nbsp;Filter
                                        </>
                                    } />
                                </Stack>
                            </Col>
                        </Row>
                    </Card.Header>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Type</th>
                                <th scope="col">Category</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Date</th>
                                <th scope="col">Description</th>
                                <th scope="col">Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.getTransactionTable()}
                        </tbody>
                    </table>
                </Card>
            </div >
        )
    }
}