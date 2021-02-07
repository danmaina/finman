module org.spectrum.gradient {
    requires javafx.controls;
    requires javafx.fxml;

    opens org.spectrum.gradient to javafx.fxml;
    exports org.spectrum.gradient;
}