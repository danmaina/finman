#include <QSqlDatabase>
#ifndef DATABASE_H
#define DATABASE_H

class DataBase
{
public:
    DataBase();
    void initialize_database_tables();
    int check_accounts();

    bool open_new_database(QString path);
private:

    QSqlDatabase db;
};

#endif // DATABASE_H
