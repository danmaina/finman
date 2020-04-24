import sqlite from "./sqlite";

let db = sqlite.db;

const currencies = () => {

    let query = "SELECT currency_id, currency_name, iso_code FROM currencies";

    let currencies = [];

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error(err.message)
        }

        rows.forEach((row) => {
            currencies.push({currency_id: row.currency_id, currency_name: row.currency_name, iso_code: row.iso_code})
        });
    });

    return currencies;
};

const currencyByISOCode = (isoCode) => {

    let query = "SELECT currency_id, currency_name, iso_code FROM currencies where iso_code = ?";

    let currency = {};

    db.get(query, [isoCode], (err, row) => {
        if (err) {
            console.error(err.message)
        }

        currency = {currency_id: row.currency_id, currency_name: row.currency_name, iso_code: row.iso_code};
    });

    return currency;

};

const accounts = () => {
    let query = "SELECT accounts.account_id, accounts.account_name, currencies.currency_name, currencies.iso_code, accounts.amount " +
        "FROM accounts " +
        "INNER JOIN currencies using(currency_id)";

    let accounts = [];

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error(err.message)
        }

        rows.forEach((row) => {
            accounts.push({
                account_id: row.account_id,
                account_name: row.account_name,
                currency_name: row.currency_name,
                iso_code: row.iso_code,
                amount: row.amount
            })
        });
    });

    return accounts;
};

const createAccount = (accountName, amount, currencyId) => {
    let query = "INSERT INTO accounts(currency_id, account_name, amount, created_at) VALUES(?, ?, ?, ?)";

    let now = new Date().toISOString().slice(0, 19).replace('T', ' ');

    db.run(query, [currencyId, accountName, amount, now], (err, res) => {
        if (err) {
            console.error("Error Creating Account: ", err);
        }

        console.log("Create Account Rows Affected: ", res.rowsAffected);
    });
};

const updateAccountById = (accountName, amount, currencyId, accountId) => {
  let query = "UPDATE accounts SET account_name = ?, amount = ?, currency_id = ? WHERE account_id = ?";

  db.run(query, [accountName, amount, currencyId, accountId], (err, res) => {
     if (err) {
         console.error("Error Updating Account With Id: ", accountId);
     }

     console.log("Updated Account With Id: ", accountId," Response is: ", res);
  });
};

const deleteAccountById = (accountId) => {
    let query = "DELETE FROM accounts WHERE account_id = ?";

    db.run(query, [accountId], (err, res) => {
       if (err) {
           console.error("Error deleting account: ", err);
       }

       console.log("Deleted account with ID: ", accountId, " WIth Result: ", res)
    });
}

const categories = () => {
    let query = "SELECT categories.category_id, categories.category_name, categoryTypes.category_type " +
        "FROM categories " +
        "INNER JOIN categoryTypes USING(category_type_id)";

    let categories = [];

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error(err.message)
        }

        rows.forEach((row) => {
            categories.push({
                category_id: row.category_id,
                category_name: row.category_name,
                category_type: row.category_type
            })
        });
    });

    return categories

};

const payees = () => {
    let query = "SELECT payee_id, payee_name FROM payees";

    let payees = [];

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error(err.message)
        }

        rows.forEach((row) => {
            payees.push({payee_id: row.payee_id, payee_name: row.payee_name})
        });
    });

    return payees;

};

const transactions = (lowerLimit, upperLimit) => {
    let query = "SELECT transactions.transaction_id, transactions.amount, transactions.description, payees.payee_name, transactionModes.transaction_mode_id, accounts.account_name, currencies.currency_name, currencies.iso_code, categories.category_name " +
        "FROM transactions " +
        "INNER JOIN payees USING (payee_id) " +
        "INNER JOIN transactionModes USING(transaction_mode_id) " +
        "INNER JOIN accounts USING(account_id) " +
        "INNER JOIN currencies USING(currency_id) " +
        "INNER JOIN categories USING(category_id) " +
        "ORDER BY 1 DESC LIMIT ?, ?";

    let transactions = [];

    db.all(query, [lowerLimit, upperLimit], (err, rows) => {
        if (err) {
            console.error(err.message)
        }

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
    });

    return transactions;
};

export default {currencies, currencyByISOCode, categories, accounts, createAccount, updateAccountById, deleteAccountById, payees, transactions}
