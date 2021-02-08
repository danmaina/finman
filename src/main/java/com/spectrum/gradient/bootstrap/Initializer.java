package com.spectrum.gradient.bootstrap;

import javafx.scene.Scene;
import javafx.stage.Stage;
import lombok.AllArgsConstructor;
import net.rgielen.fxweaver.core.FxWeaver;
import com.spectrum.gradient.controllers.MainPage;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class Initializer implements ApplicationListener<StageReadyEvent> {

    private final FxWeaver fxWeaver;

    @Override
    public void onApplicationEvent(StageReadyEvent event) {
        Stage stage = event.stage;
        Scene scene = new Scene(
                fxWeaver.loadView(MainPage.class),
                800,
                600
        );
        stage.setScene(scene);
        stage.show();
    }

}
