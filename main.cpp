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

    // Use the database to determine which page to show
    if (db.check_accounts() > 0) {
        // Show Home page
        h.show();
    } else {
        // Show start up page
        f.show();
    }
    return a.exec();
}
