package hu.caff.backend.converters.comment;

import hu.caff.backend.domain.Caff;
import hu.caff.backend.dto.CaffDTO;
import hu.caff.backend.dto.CommentDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class CaffEntityDTOConverter implements Converter<Caff, CaffDTO> {

    @Autowired
    ConversionService conversionService;

    @Override
    public CaffDTO convert(Caff caff) {
       return CaffDTO.builder()
               .id(caff.getId())
               .userId(caff.getUserId())
               .comments(caff.getComments()
                       .stream().map(comment ->
                       conversionService.convert(comment, CommentDTO.class))
                       .collect(Collectors.toList()))
               .createdAt(caff.getCreatedAt())
               .creator(caff.getCreator())
               .data(caff.getData())
               .name(caff.getName())
               .thumbnail(caff.getThumbnail())
               .username(caff.getUsername())
               .build();
    }
}
