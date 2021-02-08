package com.spectrum.gradient.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@ConfigurationProperties("com.spectrum.gradient")
@Configuration
@Getter
@Setter
public class ApplicationConfigs {

    private Integer appHeight;
    private Integer appWidth;

}
