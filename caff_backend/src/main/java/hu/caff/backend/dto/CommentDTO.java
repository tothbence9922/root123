package hu.caff.backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import hu.caff.backend.domain.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentDTO {

    private Long id;

    private String userId;

    private String text;

    private String createdAt;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Long caffId;
}
