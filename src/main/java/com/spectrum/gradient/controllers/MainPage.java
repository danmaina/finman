package com.spectrum.gradient.controllers;

import javafx.fxml.FXML;
import javafx.scene.control.TableCell;
import javafx.scene.control.TableColumn;
import javafx.scene.layout.AnchorPane;
import javafx.scene.paint.Color;
import javafx.util.Callback;
import net.rgielen.fxweaver.core.FxmlView;
import org.springframework.stereotype.Component;


@Component
@FxmlView("MainPage.fxml")
public class MainPage {

    @FXML
    AnchorPane overviewPane;

    @FXML
    AnchorPane budgetPane;

    @FXML
    AnchorPane accountsPane;

    @FXML
    AnchorPane categoriesPane;

    @FXML
    AnchorPane payeesPane;

    @FXML
    AnchorPane reportsPane;

    @FXML
    AnchorPane settingsPane;

    @FXML
    public void showOverviewPane() {
        overviewPane.setVisible(true);
        budgetPane.setVisible(false);
        accountsPane.setVisible(false);
        categoriesPane.setVisible(false);
        payeesPane.setVisible(false);
        reportsPane.setVisible(false);
        settingsPane.setVisible(false);
    }

    @FXML
    public void showBudgetPane() {
        overviewPane.setVisible(false);
        budgetPane.setVisible(true);
        accountsPane.setVisible(false);
        categoriesPane.setVisible(false);
        payeesPane.setVisible(false);
        reportsPane.setVisible(false);
        settingsPane.setVisible(false);
    }

    @FXML
    public void showAccountsPane() {
        overviewPane.setVisible(false);
        budgetPane.setVisible(false);
        accountsPane.setVisible(true);
        categoriesPane.setVisible(false);
        payeesPane.setVisible(false);
        reportsPane.setVisible(false);
        settingsPane.setVisible(false);
    }

    @FXML
    public void showCategoriesPane() {
        overviewPane.setVisible(false);
        budgetPane.setVisible(false);
        accountsPane.setVisible(false);
        categoriesPane.setVisible(true);
        payeesPane.setVisible(false);
        reportsPane.setVisible(false);
        settingsPane.setVisible(false);
    }

    @FXML
    public void showPayeesPane() {
        overviewPane.setVisible(false);
        budgetPane.setVisible(false);
        accountsPane.setVisible(false);
        categoriesPane.setVisible(false);
        payeesPane.setVisible(true);
        reportsPane.setVisible(false);
        settingsPane.setVisible(false);
    }

    @FXML
    public void showReportsPane() {
        overviewPane.setVisible(false);
        budgetPane.setVisible(false);
        accountsPane.setVisible(false);
        categoriesPane.setVisible(false);
        payeesPane.setVisible(false);
        reportsPane.setVisible(true);
        settingsPane.setVisible(false);
    }

    @FXML
    public void showSettingsPane() {
        overviewPane.setVisible(false);
        budgetPane.setVisible(false);
        accountsPane.setVisible(false);
        categoriesPane.setVisible(false);
        payeesPane.setVisible(false);
        reportsPane.setVisible(false);
        settingsPane.setVisible(true);
    }

}
