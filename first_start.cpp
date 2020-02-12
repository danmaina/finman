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
