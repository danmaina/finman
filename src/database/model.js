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
            currencies.push(row)
        });
    });

    return currencies;
};

const currencyByISOCode = (isoCode) => {

    let query = "SELECT currency_id, currency_name FROM currencies where isoCode = ?";

    let currency = '';

    db.get(query, [isoCode], (err, row) => {
        if (err) {
            console.error(err.message)
        }

        currency = row;
    });

    return currency;

};

const accounts = () => {
    let query = "SELECT a.account_id, a.account_name, c.currency_name, c.iso_code, a.amount FROM accounts a INNER JOIN currencies c using(currency_id)";

    let accounts = [];

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error(err.message)
        }

        rows.forEach((row) => {
            accounts.push(row)
        });
    });

    return accounts
};

const categories = () => {
    let query = "SELECT c.category_id, c.category_name, ct.category_type categories c INNER JOIN categoryTypes ct using(category_type_id)";

    let categories = [];

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error(err.message)
        }

        rows.forEach((row) => {
            categories.push(row)
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
            payees.push(row)
        });
    });

    return payees;

};

const transactions = (lowerLimit, upperLimit) => {
    let query = "SELECT t.transaction_id, t.amount, t.description, p.payee_name, tm.transaction_mode_id, ac.account_name, cu.currency_name, cu.iso_code, ca.category_name FROM transactions ORDER BY 1 DESC LIMIT ?, ?";

    let transactions = [];

    db.all(query, [lowerLimit, upperLimit], (err, rows) => {
        if (err) {
            console.error(err.message)
        }

        rows.forEach((row) => {
            transactions.push(row)
        });
    });

    return transactions;
};

export default {currencies, currencyByISOCode, categories, accounts, payees, transactions}
