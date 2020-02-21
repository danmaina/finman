#ifndef CREATEACCOUNTS_H
#define CREATEACCOUNTS_H

#include <QWidget>

namespace Ui {
class CreateAccounts;
}

class CreateAccounts : public QWidget
{
    Q_OBJECT

public:
    explicit CreateAccounts(QWidget *parent = nullptr);
    ~CreateAccounts();

private:
    Ui::CreateAccounts *ui;
};

#endif // CREATEACCOUNTS_H
