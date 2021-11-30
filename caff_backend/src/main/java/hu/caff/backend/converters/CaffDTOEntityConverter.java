package hu.caff.backend.converters;

import hu.caff.backend.domain.Caff;
import hu.caff.backend.dto.CaffDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.Objects;
import java.util.stream.Collectors;

@Component
public class CaffDTOEntityConverter implements Converter<CaffDTO, Caff> {

    @Autowired
    ConversionService conversionService;


    @Override
    public Caff convert(CaffDTO caffDTO) {
        Caff caff = Caff.builder().build();
        //TODO COnvertert megírni
        return caff;
    }
}
