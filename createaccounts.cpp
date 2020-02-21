#include "createaccounts.h"
#include "ui_createaccounts.h"

CreateAccounts::CreateAccounts(QWidget *parent) :
    QWidget(parent),
    ui(new Ui::CreateAccounts)
{
    ui->setupUi(this);
}

CreateAccounts::~CreateAccounts()
{
    delete ui;
}
