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
    // tables: accounts, currencies, categories, payees, budget, incomes, expenses, transaction_types

    if (!db.open()) {
            QMessageBox::critical(nullptr, QObject::tr("Cannot open database"),
                QObject::tr("Unable to establish an SQLite database connection.\n"
                            "Click Ok to exit."), QMessageBox::Ok);
            return;
        }

    // Initialize currencies table

    // Initialize accounts table
    QSqlQuery createAccountsTable;

    createAccountsTable.exec("CREATE TABLE accounts("
                             "account_id INTEGER, "
                             "account_name VARCHAR, "
                             "account_number VARCHAR, "
                             "account_balance INTEGER, "
                             "account_host_organization_name VARCHAR, "
                             "currency_id INTEGER, "
                             "FOREIGN KEY(currency_id) REFERENCES artist(currencies"
                             ")");

    // Initialize categories table
}


