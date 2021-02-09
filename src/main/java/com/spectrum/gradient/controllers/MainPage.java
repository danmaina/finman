package com.spectrum.gradient.controllers;

import javafx.fxml.FXML;
import javafx.scene.layout.AnchorPane;
import net.rgielen.fxweaver.core.FxmlView;
import org.springframework.stereotype.Component;

@Component
@FxmlView("MainPage.fxml")
public class MainPage {

    @FXML
    AnchorPane overviewPane;

    @FXML
    AnchorPane reportsPane;

    @FXML
    AnchorPane budgetPane;

    @FXML
    AnchorPane settingsPane;

    @FXML
    public void showOverviewPane() {
        overviewPane.setVisible(true);
        reportsPane.setVisible(false);
        budgetPane.setVisible(false);
        settingsPane.setVisible(false);
    }

    @FXML
    public void showBudgetPane() {
        overviewPane.setVisible(false);
        budgetPane.setVisible(true);
        reportsPane.setVisible(false);
        settingsPane.setVisible(false);
    }

    @FXML
    public void showReportsPane() {
        overviewPane.setVisible(false);
        budgetPane.setVisible(false);
        reportsPane.setVisible(true);
        settingsPane.setVisible(false);
    }

    @FXML
    public void showSettingsPane() {
        overviewPane.setVisible(false);
        budgetPane.setVisible(false);
        reportsPane.setVisible(false);
        settingsPane.setVisible(true);
    }

}
