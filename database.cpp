#include "database.h"
#include <QMessageBox>
#include <QSqlDatabase>
#include <QSqlDriver>
#include <QSqlError>
#include <QSqlQuery>

DataBase::DataBase()
{
   db = QSqlDatabase::addDatabase("QSQLITE");
   db.setDatabaseName("finman.db");
   db.open();
}

void DataBase::initialize_database_tables()
{
    // tables: accounts, currencies, exchange_rates, categories, payees, budget, days, months, incomes, expenses, transaction_typeS

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
                               "currency_name TEXT UNIQUE)");

    // Initialize exchange_rates table
    QSqlQuery createExchangeRatesTable;

    createExchangeRatesTable.exec("CREATE TABLE IF NOT EXISTS exchangeRates("
                                  "exchange_rate_id INTEGER PRIMARY KEY,"
                                  "base_currency_id INTEGER, "
                                  "exchange_currency_id INTEGER, "
                                  "exchange_rate DECIMAL(10,2), "
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
                             "FOREIGN KEY(currency_id) REFERENCES currencies(currency_id)"
                             ")");

    // Initialize categories table
    QSqlQuery createCategoriesTable;

    createCategoriesTable.exec("CREATE TABLE IF NOT EXISTS categories("
                          "category_id INTEGER PRIMARY KEY, "
                          "category_name TEXT UNIQUE"
                          ")");

    // Initialize payees table
    QSqlQuery createPayeesTable;

    createPayeesTable.exec("CREATE TABLE IF NOT EXISTS payees("
                           "payee_id INTEGER PRIMARY KEY, "
                           "payee_name TEXT UNIQUE)");

    // Initialize Budgets table
    QSqlQuery createBudgetsTable;

    createBudgetsTable.exec("CREATE TABLE IF NOT EXISTS budgets("
                            "budget_id INTEGER PRIMARY KEY, "
                            "category_id INTEGER, "
                            "amount DECIMAL(10,2), "
                            "month INTEGER, "
                            "recurrent INTEGER"
                            ")");
}


