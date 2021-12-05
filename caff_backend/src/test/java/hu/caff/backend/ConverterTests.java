package hu.caff.backend;

import hu.caff.backend.converters.caff.CaffDTOEntityConverter;
import hu.caff.backend.converters.caff.CaffEntityDTOConverter;
import hu.caff.backend.converters.comment.CommentDTOEntityConverter;
import hu.caff.backend.converters.comment.CommentEntityDTOConverter;
import hu.caff.backend.domain.Caff;
import hu.caff.backend.domain.Comment;
import hu.caff.backend.dto.CaffDTO;
import hu.caff.backend.dto.CommentDTO;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Bean;
import org.springframework.core.convert.ConversionService;
import org.springframework.core.convert.converter.Converter;
import org.springframework.core.convert.converter.ConverterRegistry;
import org.springframework.core.convert.support.DefaultConversionService;
import org.springframework.test.context.event.annotation.BeforeTestClass;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
public class ConverterTests {

    private final Logger LOG = LoggerFactory.getLogger(ConverterTests.class);

    @Autowired
    ConversionService conversionService;

    @Bean
    @SuppressWarnings("rawtypes")
    public ConverterRegistry entityConversionService(List<Converter> converters, ConverterRegistry converterRegistry){
        for (Converter converter : converters) {
            converterRegistry.addConverter(converter);
        }

        return converterRegistry;
    }

    private List<Caff> caffEntityList = new ArrayList<>();
    private List<CaffDTO> caffDTOList = new ArrayList<>();
    private List<Comment> commentList = new ArrayList<>();
    private List<CommentDTO> commentDTOList = new ArrayList<>();

    @BeforeEach
    void AddEntities() {
        Comment emptyComment = Comment.builder().build();
        Comment goodComment = Comment.builder()
                .createdAt("2021.10.21").id(2l)
                .text("Test comment")
                .userId("22").build();
        Comment halfComment = Comment.builder()
                .text("Test comment")
                .userId("22").build();
        commentList.add(emptyComment);
        commentList.add(halfComment);
        commentList.add(goodComment);
        Caff emptyCaff = Caff.builder()
                .comments(new ArrayList<>())
                .build();
        Caff halfCaff = Caff.builder()
                .createdAt("2021.02.12")
                .comments(commentList)
                .id(3l).build();
        Caff goodCaff = Caff.builder()
                .createdAt("2021.02.12")
                .data("testdata".getBytes(StandardCharsets.UTF_8))
                .comments(commentList)
                .id(2l).build();
        caffEntityList.add(emptyCaff);
        caffEntityList.add(halfCaff);
        caffEntityList.add(goodCaff);
        LOG.info("Entities are added.");
    }

    @BeforeEach
    void AddDTO() {
        CommentDTO emptyComment = CommentDTO.builder().build();
        CommentDTO goodComment = CommentDTO.builder()
                .createdAt("2021.10.21").id(2l)
                .text("Test comment")
                .userId("22").build();
        CommentDTO halfComment = CommentDTO.builder()
                .text("Test comment")
                .userId("22").build();
        commentDTOList.add(emptyComment);
        commentDTOList.add(halfComment);
        commentDTOList.add(goodComment);
        CaffDTO emptyCaff = CaffDTO.builder()
                .comments(new ArrayList<>()).build();
        CaffDTO halfCaff = CaffDTO.builder()
                .createdAt("2021.02.12")
                .comments(commentDTOList)
                .id(3l).build();
        CaffDTO goodCaff = CaffDTO.builder()
                .createdAt("2021.02.12")
                .data("testdata".getBytes(StandardCharsets.UTF_8))
                .comments(commentDTOList)
                .id(2l).build();
        caffDTOList.add(emptyCaff);
        caffDTOList.add(halfCaff);
        caffDTOList.add(goodCaff);
        LOG.info("DTOs are added.");
    }

    @Test
    void CaffEntityDTOTest() {
        for (int i = 0; i < caffEntityList.size(); i++) {
            CaffDTO temp = conversionService.convert(caffEntityList.get(i), CaffDTO.class);
            assert temp.equals(caffDTOList.get(i));
        }
    }

    @Test
    void CaffDTOEntityTest() {
        for (int i = 0; i < caffDTOList.size(); i++) {
            Caff temp = conversionService.convert(caffDTOList.get(i), Caff.class);
            assert temp.equals(caffEntityList.get(i));
        }
    }
    @Test
    void CommentDTOEntityTest() {
        for (int i = 0; i < commentDTOList.size(); i++) {
            Comment temp = conversionService.convert(commentDTOList.get(i), Comment.class);
            assert temp.equals(commentList.get(i));
        }
    }
    @Test
    void CommentEntityDTOTest() {
        for (int i = 0; i < commentList.size(); i++) {
            CommentDTO temp = conversionService.convert(commentList.get(i), CommentDTO.class);
            assert temp.equals(commentDTOList.get(i));
        }
    }

}
