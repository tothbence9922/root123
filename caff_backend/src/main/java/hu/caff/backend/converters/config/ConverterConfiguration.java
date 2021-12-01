package hu.caff.backend.converters.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.core.convert.converter.ConverterRegistry;

import java.util.List;

@Configuration
public class ConverterConfiguration {

    @Bean
    @SuppressWarnings("rawtypes")
    public ConverterRegistry entityConversionService(List<Converter> converters, ConverterRegistry converterRegistry){
        for (Converter converter : converters) {
            converterRegistry.addConverter(converter);
        }

        return converterRegistry;
    }

}
