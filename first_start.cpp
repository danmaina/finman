#include "first_start.h"
#include "ui_first_start.h"

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
    // TODO: Open SQLite database from computer
    // TODO: Check that the database is a finman sqlite database
    // TODO: if true? download the database to local folder and display the overview page on the home page : Show error.
}

void First_Start::on_newDatabaseButton_clicked()
{
    // TODO: Navigate user to create accounts
    // TODO: Once created successfully display overview page on the home page.
}
