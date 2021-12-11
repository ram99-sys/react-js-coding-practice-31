import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteTransaction} = props
  const {title, amount, type, id} = transactionDetails
  const onClickDeleteButton = () => {
    deleteTransaction(id)
  }

  return (
    <li className="history-list-item">
      <p className="data-cell">{title}</p>
      <p className="data-cell">Rs {amount}</p>
      <p className="data-cell">{type}</p>
      <button
        type="button"
        className="delete-button"
        testid="delete"
        onClick={onClickDeleteButton}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete-image"
        />
      </button>
    </li>
  )
}

export default TransactionItem
