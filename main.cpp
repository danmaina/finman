#include "homepage.h"
#include "first_start.h"

#include <QApplication>

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);
    First_Start f;
    HomePage h;

    //Todo: Check if we have a previously loaded profile, then load the correct UI widget

    h.show();
    return a.exec();
}
