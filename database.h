#include <QSqlDatabase>
#ifndef DATABASE_H
#define DATABASE_H

class DataBase
{
public:
    DataBase();

private:
    void initialize_database_tables();

    QSqlDatabase db;
};

#endif // DATABASE_H
