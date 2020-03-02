#include "first_start.h"
#include "ui_first_start.h"
#include "newaccount.h"
#include "database.h"
#include <QMessageBox>

First_Start::First_Start(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::First_Start)
{
    ui->setupUi(this);
}

First_Start::~First_Start()
{
    delete ui;
}

void First_Start::on_openDBButton_clicked()
{
    // TODO: Open SQLite database file from computer
    QString path = "path_to_db";//todo open path
    // TODO: Check that the database is a finman sqlite database
    DataBase db;

    if (db.open_new_database(path)) {
        //todo open the database and use it to display the overview page
    } else {
        QMessageBox::critical(nullptr, QObject::tr("Cannot Open The Selected Database"),
            QObject::tr("Unable to Establish an SQLite Database Connection.\n"
                        "Click Ok To Exit."), QMessageBox::Ok);
    }

    // TODO: if true? download the database to local folder and display the overview page on the home page : Show error.
}

void First_Start::on_newDatabaseButton_clicked()
{
    // Navigate user to create an account
    NewAccount *newAccount = new NewAccount();
    newAccount->show();

    this->close();

}
