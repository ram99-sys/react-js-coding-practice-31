import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import TransactionItem from '../TransactionItem'

import './index.css'

import MoneyDetails from '../MoneyDetails'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
    transactionsList: [],
    balance: 0,
    income: 0,
    expenses: 0,
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeTypeInput = event => {
    this.setState({optionId: event.target.value})
  }

  addIncome = () => {
    const {amountInput} = this.state
    const integerAmount = parseInt(amountInput)
    // console.log(income, balance, expenses, integerAmount)
    this.setState(prevState => ({balance: prevState.balance + integerAmount}))

    this.setState(prevState => ({income: prevState.income + integerAmount}))
  }

  addExpenses = () => {
    const {amountInput} = this.state
    const integerAmount = parseInt(amountInput)
    // console.log(income, balance, expenses, integerAmount)
    this.setState(prevState => ({balance: prevState.balance - integerAmount}))
    this.setState(prevState => ({expenses: prevState.expenses + integerAmount}))
  }

  addTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    // console.log(optionId, titleInput, amountInput)
    const optionType = transactionTypeOptions.find(
      eachOption => eachOption.optionId === optionId,
    )
    // console.log(optionType)
    const {displayText} = optionType
    const newTransaction = {
      id: uuidv4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }
    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))

    if (optionId === 'INCOME') {
      this.addIncome()
    } else {
      this.addExpenses()
    }
  }

  deleteIncome = amount => {
    // const {balance, income, expenses} = this.state
    // console.log(amount)
    // console.log(typeof amount)
    // console.log(balance, income, expenses)
    this.setState(prevState => ({balance: prevState.balance - amount}))
    this.setState(prevState => ({income: prevState.income - amount}))
  }

  deleteExpenses = amount => {
    // const {balance, income, expenses} = this.state
    // console.log(amount)
    // console.log(balance, income, expenses)
    this.setState(prevState => ({balance: prevState.balance + amount}))
    this.setState(prevState => ({expenses: prevState.expenses - amount}))
  }

  deleteTransaction = id => {
    console.log(id)
    const {transactionsList} = this.state
    const deletingObject = transactionsList.find(
      eachTransaction => eachTransaction.id === id,
    )
    console.log(deletingObject)
    const {amount, type} = deletingObject
    console.log(amount, type)
    if (type === 'Income') {
      this.deleteIncome(amount)
    } else {
      this.deleteExpenses(amount)
    }
    const newTransactionList = transactionsList.filter(
      eachTransaction => eachTransaction.id !== id,
    )
    this.setState({transactionsList: newTransactionList})
  }

  render() {
    const {
      transactionsList,
      optionId,
      balance,
      expenses,
      income,
      titleInput,
      amountInput,
    } = this.state
    const totalBalance = balance
    const totalExpenses = expenses
    const totalIncome = income

    return (
      <div className="app-container">
        <div className="money-manager-container">
          <h1 className="heading">Hi, Richard</h1>
          <p className="text">
            Welcome back to your{' '}
            <span className="money-manager-text">Money Manager</span>
          </p>
        </div>
        <MoneyDetails
          totalBalance={totalBalance}
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
        />

        <div className="transactions-container">
          <div className="add-transaction-container">
            <form onSubmit={this.addTransaction}>
              <h1 className="add-transaction-heading">Add Transaction</h1>
              <label htmlFor="title" className="title">
                TITLE
              </label>
              <br />
              <input
                type="text"
                id="title"
                placeholder="TITLE"
                className="input-field"
                onChange={this.onChangeTitleInput}
                value={titleInput}
              />
              <br />
              <label htmlFor="amount">AMOUNT</label>
              <br />
              <input
                type="text"
                id="amount"
                className="number-field"
                placeholder="AMOUNT"
                value={amountInput}
                onChange={this.onChangeAmountInput}
              />
              <br />
              <label htmlFor="type">TYPE</label>
              <br />
              <select
                className="select-field"
                id="type"
                value={optionId}
                onChange={this.onChangeTypeInput}
              >
                {transactionTypeOptions.map(eachTransactionType => (
                  <option
                    key={eachTransactionType.optionId}
                    value={eachTransactionType.optionId}
                  >
                    {eachTransactionType.displayText}
                  </option>
                ))}
              </select>
              <br />
              <button className="button" type="submit">
                Add
              </button>
            </form>
          </div>
          <div className="transaction-item-container">
            <h1 className="history-heading">History</h1>
            <div className="transactions-history-container">
              <ul className="table-header-container">
                <li className="header-list-items">
                  <p className="header-cell">Title</p>
                  <p className="header-cell cell-sizing">Amount</p>
                  <p className="header-cell">Type</p>
                </li>
                {transactionsList.map(eachTransaction => (
                  <TransactionItem
                    key={eachTransaction.id}
                    transactionDetails={eachTransaction}
                    deleteTransaction={this.deleteTransaction}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
