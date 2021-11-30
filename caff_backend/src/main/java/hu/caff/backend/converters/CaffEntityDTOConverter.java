package hu.caff.backend.converters;

import hu.caff.backend.domain.Caff;
import hu.caff.backend.dto.CaffDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class CaffEntityDTOConverter implements Converter<Caff, CaffDTO> {

    @Autowired
    ConversionService conversionService;


    @Override
    public CaffDTO convert(Caff caff) {
        //TODO implementálni
       return CaffDTO.builder().build();
    }
}
