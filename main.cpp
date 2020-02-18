#include "homepage.h"
#include "first_start.h"
#include "database.h"

#include <QApplication>

int main(int argc, char *argv[])
{

    QApplication a(argc, argv);
    First_Start f;
    HomePage h;

    //Todo: Check if we have a previously loaded profile, then load the correct UI widget

    // Initialize db
    DataBase db;
    db.initialize_database_tables();

    // TODO: Use the database to determine which page to show

    // Show the home page
    h.show();

    return a.exec();
}
