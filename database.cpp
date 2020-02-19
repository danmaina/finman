#include "database.h"
#include <QMessageBox>
#include <QSqlDatabase>
#include <QSqlDriver>
#include <QSqlError>
#include <QSqlQuery>
#include <QVariant>
#include <QDebug>

DataBase::DataBase()
{
   db = QSqlDatabase::addDatabase("QSQLITE");
   db.setDatabaseName("./finman.db");
   db.open();
}

void DataBase::initialize_database_tables()
{
    // tables: accounts, currencies, exchange_rates, categories, payees, budget, days, months, incomes, expenses, transaction_types

    if (!db.open()) {
            QMessageBox::critical(nullptr, QObject::tr("Cannot open database"),
                QObject::tr("Unable to establish an SQLite database connection.\n"
                            "Click Ok to exit."), QMessageBox::Ok);
            return;
        }

    // Initialize currencies table
    QSqlQuery createCurrenciesTable;

    createCurrenciesTable.exec("CREATE TABLE IF NOT EXISTS currencies("
                               "currency_id INTEGER PRIMARY KEY, "
                               "currency_code VARCHAR, "
                               "currency_name TEXT UNIQUE, "
                               "created_on DATETIME, "
                               "updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL"
                               ")");

    // Initialize exchange_rates table
    QSqlQuery createExchangeRatesTable;

    createExchangeRatesTable.exec("CREATE TABLE IF NOT EXISTS exchangeRates("
                                  "exchange_rate_id INTEGER PRIMARY KEY,"
                                  "base_currency_id INTEGER, "
                                  "exchange_currency_id INTEGER, "
                                  "exchange_rate DECIMAL(10,2), "
                                  "created_on DATETIME, "
                                  "updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, "
                                  "FOREIGN KEY(base_currency_id) REFERENCES currencies(currency_id), "
                                  "FOREIGN KEY(exchange_currency_id) REFERENCES currencies(currency_id)"
                                  ")");



    // Initialize accounts table
    QSqlQuery createAccountsTable;

    createAccountsTable.exec("CREATE TABLE IF NOT EXISTS accounts("
                             "account_id INTEGER PRIMARY KEY, "
                             "account_name TEXT, "
                             "account_number VARCHAR, "
                             "account_balance DECIMAL(10,2), "
                             "account_host_organization_name VARCHAR, "
                             "currency_id INTEGER, "
                             "created_on DATETIME, "
                             "updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, "
                             "FOREIGN KEY(currency_id) REFERENCES currencies(currency_id)"
                             ")");

    // Initialize categories table
    QSqlQuery createCategoriesTable;

    createCategoriesTable.exec("CREATE TABLE IF NOT EXISTS categories("
                          "category_id INTEGER PRIMARY KEY, "
                          "category_name TEXT UNIQUE, "
                          "created_on DATETIME, "
                          "updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL"
                          ")");

    // Initialize payees table
    QSqlQuery createPayeesTable;

    createPayeesTable.exec("CREATE TABLE IF NOT EXISTS payees("
                           "payee_id INTEGER PRIMARY KEY, "
                           "payee_name TEXT UNIQUE, "
                           "created_on DATETIME, "
                           "updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL"
                           ")");

    // Initialize budgets table
    QSqlQuery createBudgetsTable;

    createBudgetsTable.exec("CREATE TABLE IF NOT EXISTS budgets("
                            "budget_id INTEGER PRIMARY KEY, "
                            "category_id INTEGER, "
                            "account_id INTEGER, "
                            "transaction_type_id INTEGER, "
                            "month_id INTEGER, "
                            "amount DECIMAL(10,2), "
                            "month INTEGER, "
                            "created_on DATETIME, "
                            "updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, "
                            "FOREIGN KEY (categrory_id) REFERENCES categories(category_id), "
                            "FOREIGN KEY (account_id) REFERENECES accounts(account_id), "
                            "FOREIGN KEY (transaction_type_id) REFERENECES transaction_types(transaction_type_id), "
                            "FOREIGN KEY (month_id) REFERENCES months(month_id)"
                            ")");

    // Initialize days table
    QSqlQuery createDaysTable;

    createDaysTable.exec("CREATE TABLE IF NOT EXISTS days("
                         "day_id INTEGER PRIMARY KEY, "
                         "day VARCHAR, "
                         "created_on DATETIME, "
                         "updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL"
                         ")");

    // Initialize months table
    QSqlQuery createMonthsTable;

    createMonthsTable.exec("CREATE TABLE IF NOT EXISTS months("
                           "month_id INTEGER PRIMARY KEY, "
                           "month VARCHAR, "
                           "created_on DATETIME, "
                           "updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL"
                           ")");

    // Initialize transaction_types table
    QSqlQuery createTransactionTypesTable;

    createTransactionTypesTable.exec("CREATE TABLE IF NOT EXIST transaction_types("
                                     "transaction_type_id INTEGER PRIMARY KEY,"
                                     "transaction_type VARCHAR UNIQUE"
                                     "created_on DATETIME, "
                                     "updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL"
                                     ")");

    // Initialize transactions table
    QSqlQuery createTransactionsTable;

    createTransactionsTable.exec("CREATE TABLE IF NOT EXISTS transactions("
                                 "transaction_id INTEGER PRIMARY KEY, "
                                 "account_id INTEGER, "
                                 "transaction_type_id INTEGER, "
                                 "amount DECIMAL(10,2), "
                                 "created_on DATETIME, "
                                 "updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, "
                                 "FOREIGN KEY (account_id) REFERENECES accounts(account_id), "
                                 "FOREIGN KEY (transaction_type_id) REFERENCES transaction_types(transaction_type_id)"
                                 ")");

    qDebug()<<"Database Initialized Successfully";

    db.close();

}

int DataBase::check_accounts()
{
    if (!db.open()) {
            QMessageBox::critical(nullptr, QObject::tr("Cannot open database"),
                QObject::tr("Unable to establish an SQLite database connection.\n"
                            "Click Ok to exit."), QMessageBox::Ok);
            return 0;
        }

    QSqlQuery countAccounts;

    countAccounts.exec("SELECT COUNT(*) FROM accounts;");

    int count;

    while(countAccounts.next()) {
       QVariant accountCount  = countAccounts.value(0);
       count = accountCount.toInt();
    }

    return count;

}


