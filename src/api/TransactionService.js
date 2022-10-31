export default class TransactionService {

  getBalance() {
    let total = 0;
    if (localStorage.getItem('initialValue') !== null) {
      total = +localStorage.getItem('initialValue');
    }
    // eslint-disable-next-line array-callback-return
    this.getAllTransactions().map(transaction => {
      transaction.type === "Income" ? total += transaction.value : total -= transaction.value;
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

  getAllTransactions = () => {
    if (localStorage.getItem('transactions') === null) {
      return [];
    }
    return JSON.parse(localStorage.getItem('transactions'));
  }

  getCurrentMonthTransactions() {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    const filteredTransactionList = this.getAllTransactions().filter(
      transaction => (transaction.year === currentYear) && (transaction.month === currentMonth)
    );

    return filteredTransactionList;
  }

  deleteTransaction = (transaction) => {
    let newTransactionList = this.getAllTransactions().filter(object =>
      object.value !== transaction.value ||
      object.category !== transaction.category ||
      object.type !== transaction.type ||
      object.day !== transaction.day);
    localStorage.setItem('transactions', JSON.stringify(newTransactionList));
  }

  insertTransaction = (transaction) => {
    let transactionList = this.getAllTransactions();
    transactionList.unshift(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactionList));
  }

  insertTransactionOnIndex = (transaction, index) => {
    let transactionList = this.getAllTransactions();
    transactionList.splice(index, 1, transaction);
    localStorage.setItem('transactions', JSON.stringify(transactionList));
  }

  generateMockData() {
    localStorage.setItem("transactions", JSON.stringify([
      {
        "type": "Expense",
        "category": "Meals",
        "value": 20.80,
        "year": 2022,
        "month": 10,
        "day": 25,
        "description": "pizza"
      },
      {
        "type": "Income",
        "category": "Investment",
        "value": 500,
        "year": 2022,
        "month": 10,
        "day": 23,
        "description": "bitcoin"
      },
      {
        "type": "Expense",
        "category": "Clothing",
        "value": 500,
        "year": 2022,
        "month": 10,
        "day": 22,
        "description": "nike t shirt and jacket"
      },
      {
        "type": "Income",
        "category": "Sale",
        "value": 600,
        "year": 2022,
        "month": 10,
        "day": 21,
        "description": "sold my old shoes"
      },
      {
        "type": "Expense",
        "category": "Mobility",
        "value": 200,
        "year": 2022,
        "month": 10,
        "day": 20,
        "description": "gas"
      },
      {
        "type": "Income",
        "category": "Gambling",
        "value": 300,
        "year": 2022,
        "month": 10,
        "day": 15,
        "description": "palmeiras game"
      },
      {
        "type": "Expense",
        "category": "Bills",
        "value": 300,
        "year": 2022,
        "month": 10,
        "day": 14,
        "description": "credit card bill"
      },
      {
        "type": "Income",
        "category": "Salary",
        "value": 1000,
        "year": 2022,
        "month": 10,
        "day": 7,
        "description": "september salary"
      },
      {
        "type": "Expense",
        "category": "Entertainment",
        "value": 20,
        "year": 2022,
        "month": 10,
        "day": 5,
        "description": "movie"
      },
      {
        "type": "Income",
        "category": "Gift",
        "value": 50,
        "year": 2022,
        "month": 10,
        "day": 2,
        "description": "birthday gift"
      }]))
    localStorage.setItem("initialValue", "3000");
  }
}