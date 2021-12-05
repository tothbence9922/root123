package hu.caff.backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import hu.caff.backend.domain.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CaffDTO {

    private Long id;
    private String name;
    private byte[] thumbnail;
    private String userId;
    private String username;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private byte[] data;
    private String creator;
    private String createdAt;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private List<CommentDTO> comments =new ArrayList<>();
    private List<String> metadata = new ArrayList<>();
}
