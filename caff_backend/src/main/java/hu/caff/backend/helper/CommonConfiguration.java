package hu.caff.backend.helper;

import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CommonConfiguration {

    @Bean
    @ConditionalOnMissingBean
    public YamlPropertySourceFactory yamlPropertySourceFactory(){
        return new YamlPropertySourceFactory();
    }
}
