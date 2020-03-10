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
        "rate DECIMAL(10, 2), " +
        "created_at DATETIME, " +
        "updated_at DATETIME DEFAULT CURRENT_TIMESTAMP, " +
        "FOREIGN KEY (base_currency_id) REFERENCES currencies(currency_id), " +
        "FOREIGN KEY (compared_currency_id) REFERENCES currencies(currency_id)" +
        ")";

    let createAccountsQuery = "CREATE TABLE IF NOT EXISTS accounts(" +
        "account_id INTEGER PRIMARY KEY AUTOINCREMENT, " +
        "currency_id INTEGER, " +
        "account_name TEXT UNIQUE, " +
        "amount DECIMAL(10, 2), " +
        "created_at DATETIME, " +
        "updated_at DATETIME DEFAULT CURRENT_TIMESTAMP, " +
        "FOREIGN KEY (currency_id) REFERENCES currencies(currency_id)" +
        ")";

    let initQueries = [createCurrenciesQuery, createCurrencyRatesQuery, createAccountsQuery];

    for (const query of initQueries) {
        db.run(query, [], (err) => {
            if (err) {
                console.log("Error Creating table: ", err.message, "query is: ", query)
            } else {
                console.log("Table was created using query: ", query)
            }
        });
    }

    db.close((err) => {
        if (err) {
            console.log("Error closing Db Connection: ", err.message())
        }
    });

};

export default {init, db};
