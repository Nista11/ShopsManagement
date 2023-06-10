import App from "../app";
import TransactionsHome from "./transactionsHome";

class OwnTransactions extends TransactionsHome {
    constructor(props) {
        super(props);
        this.apiAfterPageString = '/' + App.getCurrentUserStatic().getUsername();
    }
}

export default OwnTransactions;