package hu.caff.backend.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Caff {

    @Id
    @GeneratedValue( strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    @Lob
    @Column(columnDefinition="LONGBLOB")
    private byte[] thumbnail;
    private String userId;
    private String username;
    @Lob
    @Column(columnDefinition="LONGBLOB")
    private byte[] data;
    private String creator;
    private String createdAt;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments =new ArrayList<>();
    @ElementCollection
    private List<String> caffmeta = new ArrayList<>();
}
