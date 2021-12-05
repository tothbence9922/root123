package hu.caff.backend.converters.caff;

import hu.caff.backend.domain.Caff;
import hu.caff.backend.dto.CaffDTO;
import hu.caff.backend.domain.Comment;
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
        return Caff.builder()
                .id(caffDTO.getId())
                .userId(caffDTO.getUserId())
                .comments(caffDTO.getComments()
                        .stream().map(comment ->
                                conversionService.convert(comment, Comment.class)).filter(Objects::nonNull)
                        .collect(Collectors.toList()))
                .createdAt(caffDTO.getCreatedAt())
                .creator(caffDTO.getCreator())
                .data(caffDTO.getData())
                .name(caffDTO.getName())
                .thumbnail(caffDTO.getThumbnail())
                .username(caffDTO.getUsername())
                .build();
    }
}
