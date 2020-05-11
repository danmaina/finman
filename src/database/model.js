import sqlite from "./sqlite";

let modelConn = sqlite.db;

let currencies = () => {

    let query = "SELECT currency_id, currency_name, iso_code FROM currencies";

    let currencies = [];

    modelConn.all(query, [], (err, rows) => {
        if (err) {
            console.error(err.message)
        }

        if (typeof rows !== 'undefined'){
            rows.forEach((row) => {
                currencies.push({currency_id: row.currency_id, currency_name: row.currency_name, iso_code: row.iso_code})
            });
        }
    });

    return currencies;
};

let currencyByISOCode = (isoCode) => {

    let query = "SELECT currency_id, currency_name, iso_code FROM currencies where iso_code = ?";

    let currency = {};

    modelConn.get(query, [isoCode], (err, row) => {
        if (err) {
            console.error(err.message)
        }

        if (typeof row !== 'undefined'){
            currency = {currency_id: row.currency_id, currency_name: row.currency_name, iso_code: row.iso_code};
        }
    });

    return currency;

};

let accounts = () => {
    let query = "SELECT accounts.account_id, accounts.account_name, currencies.currency_name, currencies.iso_code, accounts.amount " +
        "FROM accounts " +
        "INNER JOIN currencies using(currency_id)";

    let accounts = [];

    modelConn.all(query, [], (err, rows) => {
        if (err) {
            console.error(err.message)
        }

        if (typeof rows !== 'undefined'){
            rows.forEach((row) => {
                accounts.push({
                    account_id: row.account_id,
                    account_name: row.account_name,
                    currency_name: row.currency_name,
                    iso_code: row.iso_code,
                    amount: row.amount
                })
            });
        }
    });

    return accounts;
};

let createAccount = (accountName, amount, currencyId) => {
    let query = "INSERT INTO accounts(currency_id, account_name, amount, created_at) VALUES(?, ?, ?, ?)";

    let now = new Date().toISOString().slice(0, 19).replace('T', ' ');

    modelConn.run(query, [currencyId, accountName, amount, now], (err, res) => {
        if (err) {
            console.error("Error Creating Account: ", err);
        }

        console.log("Create Account Rows Affected: ", res.rowsAffected);
    });
};

let updateAccountById = (accountName, amount, currencyId, accountId) => {
    let query = "UPDATE accounts SET account_name = ?, amount = ?, currency_id = ? WHERE account_id = ?";

    modelConn.run(query, [accountName, amount, currencyId, accountId], (err, res) => {
        if (err) {
            console.error("Error Updating Account With Id: ", accountId);
        }

        console.log("Updated Account With Id: ", accountId, " Response is: ", res);
    });
};

let deleteAccountById = (accountId) => {
    let query = "DELETE FROM accounts WHERE account_id = ?";

    modelConn.run(query, [accountId], (err, res) => {
        if (err) {
            console.error("Error deleting account: ", err);
        }

        console.log("Deleted account with ID: ", accountId, " WIth Result: ", res)
    });
}

let categories = () => {
    let query = "SELECT c.category_id, c.category_name, ct.category_type " +
        "FROM categories c " +
        "INNER JOIN categoryTypes ct USING(category_type_id) ORDER BY ct.category_type";

    let categories = [];

    modelConn.all(query, [], (err, rows) => {
        if (err) {
            console.error(err.message)
        }

        if (typeof rows !== 'undefined'){
            rows.forEach((row) => {
                categories.push({
                    category_id: row.category_id,
                    category_name: row.category_name,
                    category_type: row.category_type
                })
            });
        }
    });

    return categories

};

let payees = () => {
    let query = "SELECT payee_id, payee_name FROM payees";

    let payees = [];

    modelConn.all(query, [], (err, rows) => {
        if (err) {
            console.error(err.message)
        }

        if (typeof rows !== 'undefined'){
            rows.forEach((row) => {
                payees.push({payee_id: row.payee_id, payee_name: row.payee_name})
            });
        }
    });

    return payees;

};

let transactions = (lowerLimit, upperLimit) => {
    let query = "SELECT transactions.transaction_id, transactions.amount, transactions.description, payees.payee_name, transactionModes.transaction_mode_id, accounts.account_name, currencies.currency_name, currencies.iso_code, categories.category_name " +
        "FROM transactions " +
        "INNER JOIN payees USING (payee_id) " +
        "INNER JOIN transactionModes USING(transaction_mode_id) " +
        "INNER JOIN accounts USING(account_id) " +
        "INNER JOIN currencies USING(currency_id) " +
        "INNER JOIN categories USING(category_id) " +
        "ORDER BY 1 DESC LIMIT ?, ?";

    let transactions = [];

    modelConn.all(query, [lowerLimit, upperLimit], (err, rows) => {
        if (err) {
            console.error(err.message)
        }

        if (typeof rows !== 'undefined'){
            rows.forEach((row) => {
                transactions.push({
                    transaction_id: row.transaction_id,
                    amount: row.amount,
                    description: row.description,
                    payee_name: row.payee_name,
                    transaction_mode_id: row.transaction_mode_id,
                    account_name: row.account_name,
                    currency_name: row.currency_name,
                    iso_code: row.iso_code,
                    category_name: row.category_name
                })
            });
        }
    });

    return transactions;
};

export default {
    currencies,
    currencyByISOCode,
    categories,
    accounts,
    createAccount,
    updateAccountById,
    deleteAccountById,
    payees,
    transactions
}
