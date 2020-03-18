import sqlite3 from 'sqlite3'

const dbPath = "./finman.db";

const db = new sqlite3.Database(dbPath,
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
        // do your thing
        if (err) {
            console.log("Error Connecting to Database: ", err.message())
        }
        console.log("Connected to the database")
    });

const init = () => {

    // Initialize Tables
    let createCurrenciesQuery = "CREATE TABLE IF NOT EXISTS currencies(" +
        "currency_id INTEGER PRIMARY KEY AUTOINCREMENT, " +
        "currency_name TEXT, " +
        "iso_code TEXT UNIQUE, " +
        "created_at DATETIME, " +
        "updated_at DATETIME DEFAULT CURRENT_TIMESTAMP" +
        ")";

    let createCurrencyRatesQuery = "CREATE TABLE IF NOT EXISTS currencyRates(" +
        "currency_rate_id INTEGER PRIMARY KEY AUTOINCREMENT," +
        "base_currency_id INTEGER, " +
        "compared_currency_id INTEGER, " +
        "rate DECIMAL(15, 2), " +
        "created_at DATETIME, " +
        "updated_at DATETIME DEFAULT CURRENT_TIMESTAMP, " +
        "FOREIGN KEY (base_currency_id) REFERENCES currencies(currency_id), " +
        "FOREIGN KEY (compared_currency_id) REFERENCES currencies(currency_id)" +
        ")";

    let createAccountsQuery = "CREATE TABLE IF NOT EXISTS accounts(" +
        "account_id INTEGER PRIMARY KEY AUTOINCREMENT, " +
        "currency_id INTEGER, " +
        "account_name TEXT UNIQUE, " +
        "amount DECIMAL(15, 2), " +
        "created_at DATETIME, " +
        "updated_at DATETIME DEFAULT CURRENT_TIMESTAMP, " +
        "FOREIGN KEY (currency_id) REFERENCES currencies(currency_id)" +
        ")";

    let createPayeesQuery = "CREATE TABLE IF NOT EXISTS payees(" +
        "payee_id INTEGER PRIMARY KEY AUTOINCREMENT, " +
        "payee_name TEXT UNIQUE, " +
        "created_at DATETIME, " +
        "updated_at DATETIME DEFAULT CURRENT_TIMESTAMP" +
        ")";

    let createCategoryTypesQuery = "CREATE TABLE IF NOT EXISTS categoryTypes(" +
        "category_type_id INTEGER PRIMARY KEY AUTOINCREMENT, " +
        "category_type TEXT UNIQUE," +
        "created_at DATETIME, " +
        "updated_at DATETIME DEFAULT CURRENT_TIMESTAMP" +
        ")";

    let createCategoriesQuery = "CREATE TABLE IF NOT EXISTS categories(" +
        "category_id INTEGER PRIMARY KEY AUTOINCREMENT, " +
        "category_name TEXT UNIQUE, " +
        "category_type_id INTEGER, " +
        "created_at DATETIME, " +
        "updated_at DATETIME DEFAULT CURRENT_TIMESTAMP, " +
        "FOREIGN KEY (category_type_id) REFERENCES categoryTypes(category_type_id)" +
        ")";

    let createTransactionModesQuery = "CREATE TABLE IF NOT EXISTS transactionModes(" +
        "transaction_mode_id INTEGER PRIMARY KEY AUTOINCREMENT, " +
        "transaction_mode TEXT UNIQUE, " +
        "created_at DATETIME, " +
        "updated_at DATETIME DEFAULT CURRENT_TIMESTAMP " +
        ")";

    let createTransactionsQuery = "CREATE TABLE IF NOT EXISTS transactions(" +
        "transaction_id INTEGER PRIMARY KEY AUTOINCREMENT, " +
        "payee_id INTEGER, " +
        "transaction_mode_id INTEGER, " +
        "account_id INTEGER, " +
        "category_id INTEGER, " +
        "currency_id INTEGER, " +
        "amount DECIMAL(15, 2), " +
        "description TEXT, " +
        "created_at DATETIME, " +
        "updated_at DATETIME DEFAULT CURRENT_TIMESTAMP, " +
        "FOREIGN KEY (payee_id) REFERENCES payees(payee_id), " +
        "FOREIGN KEY (transaction_mode_id) REFERENCES transactionModes(transaction_mode_id), " +
        "FOREIGN KEY (account_id) REFERENCES accounts(account_id), " +
        "FOREIGN KEY (category_id) REFERENCES categories(category_id), " +
        "FOREIGN KEY (currency_id) REFERENCES currencies(currency_id) " +
        ")";

    // Populate Tables with default values

    // TODO: Add recurrent transactions
    // TODO: Add budgeting
    // TODO: Add Stocks and investments
    // TODO: Add Asset financial management

    let initQueries = [createCurrenciesQuery, createCurrencyRatesQuery, createAccountsQuery, createTransactionsQuery, createPayeesQuery, createCategoryTypesQuery, createCategoriesQuery, createTransactionModesQuery];

    for (const query of initQueries) {
        db.run(query, [], (err) => {
            if (err) {
                console.error("Error Creating table: ", err.message, "query is: ", query)
            } else {
                console.log("Table was created using query: ", query)
            }
        });
    }

};

export default {init, db};
