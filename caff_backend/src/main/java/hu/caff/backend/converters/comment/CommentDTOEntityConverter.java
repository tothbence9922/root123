package hu.caff.backend.converters.comment;

import hu.caff.backend.domain.Comment;
import hu.caff.backend.dto.CommentDTO;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class CommentDTOEntityConverter implements Converter<CommentDTO, Comment> {

    @Override
    public Comment convert(CommentDTO commentDTO) {
        return Comment.builder()
                .id(commentDTO.getId())
                .userId(commentDTO.getUserId())
                .createdAt(commentDTO.getCreatedAt())
                .text(commentDTO.getText())
                .build();
    }
}
