#ifndef FIRST_START_H
#define FIRST_START_H

#include <QDialog>

namespace Ui {
class First_Start;
}

class First_Start : public QDialog
{
    Q_OBJECT

public:
    explicit First_Start(QWidget *parent = nullptr);
    ~First_Start();

private slots:
    void on_openDBButton_clicked();

    void on_newDatabaseButton_clicked();

private:
    Ui::First_Start *ui;
};

#endif // FIRST_START_H
