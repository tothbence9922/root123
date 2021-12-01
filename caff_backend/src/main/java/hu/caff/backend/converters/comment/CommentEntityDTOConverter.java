package hu.caff.backend.converters.comment;

import hu.caff.backend.domain.Comment;
import hu.caff.backend.dto.CommentDTO;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class CommentEntityDTOConverter implements Converter<Comment, CommentDTO> {

    @Override
    public CommentDTO convert(Comment comment) {
       return CommentDTO.builder()
               .id(comment.getId())
               .userId(comment.getUserId())
               .createdAt(comment.getCreatedAt())
               .text(comment.getText())
               .build();
    }
}
