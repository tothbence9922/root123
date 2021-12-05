package hu.caff.backend.controller;

import hu.caff.backend.domain.Caff;
import hu.caff.backend.domain.Comment;
import hu.caff.backend.dto.CommentDTO;
import hu.caff.backend.service.CaffDomainService;
import hu.caff.backend.service.CommentDomainService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class CommentController {
    private final Logger LOG = LoggerFactory.getLogger(CommentController.class);

    @Autowired
    CommentDomainService commentDomainService;

    @Autowired
    CaffDomainService CAFFDomainService;

    @Autowired
    ConversionService conversionService;

    @PreAuthorize("hasRole('ROLE_USER')")
    @RequestMapping(path = "/comment/{commentId}", method = RequestMethod.GET, produces = "application/json")
    CommentDTO getResourceById(@PathVariable(name = "commentId") Long commentId){
        LOG.info(String.format("Requesting comment with id %s", commentId));

        Comment comment = commentDomainService.getResourceById(commentId);

        CommentDTO commentDTO = conversionService.convert(comment, CommentDTO.class);

        LOG.info("Comment found. Sending comment data to client.");
        return commentDTO;
    }
    @PreAuthorize("hasRole('ROLE_USER')")
    @RequestMapping(path = "/comment", method = RequestMethod.GET, produces = "application/json")
    List<CommentDTO> getAllResources(){
        LOG.info("Requesting all comments.");

        List<Comment> comments = commentDomainService.getAllResources();

        List<CommentDTO> commentDTOS = comments.stream().map(
                comment -> conversionService.convert(comment,CommentDTO.class)
        ).collect(Collectors.toList());

        LOG.info("Comment list found. Sending data to client.");
        return commentDTOS;
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @RequestMapping(path = "/comment", method = RequestMethod.POST, produces = "application/json")
    ResponseEntity<Object> createResource(@RequestBody CommentDTO commentDTO){
        LOG.info("Creating new comment");

        Caff caff = CAFFDomainService.getResourceById(commentDTO.getCaffId());
        if (caff == null){
            LOG.info(String.format("Caff not found with id %s", commentDTO.getCaffId()));
        }
        Comment comment = conversionService.convert(commentDTO,Comment.class);
        comment.setCreatedAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));

        caff.getComments().add(comment);

        CAFFDomainService.updateResource(caff);
        LOG.info(String.format("Comment created with id: %s", comment.getId()));
        LOG.info("Creating success response with data and entity reference.");
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .replacePath("/comment/{commentId}")
                .buildAndExpand(comment.getId()).toUri();

        return ResponseEntity
                .created(location)
                .body(comment);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN_USER')")
    @RequestMapping(path = "/comment", method = RequestMethod.DELETE, produces = "application/json")
    ResponseEntity<Object> removeResourceById(@RequestBody CommentDTO commentDTO){
        LOG.info(String.format("Deleting comment of %s", commentDTO.getId()));

        Caff caff = CAFFDomainService.getResourceById(commentDTO.getCaffId());

        Comment comment = commentDomainService.getResourceById(commentDTO.getId());

        caff.getComments().remove(comment);
        CAFFDomainService.updateResource(caff);

        commentDTO = conversionService.convert(comment,CommentDTO.class);

        LOG.info("Comment deleted successfully. Sending response to client");
        return ResponseEntity.ok(commentDTO);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN_USER')")
    @RequestMapping(path = "/comment", method = RequestMethod.PUT, produces = "application/json")
    ResponseEntity<Object> updateResource(@RequestBody CommentDTO commentDTO){
        LOG.info(String.format("Updating comment with id: %s", commentDTO.getId()));

        Comment comment = conversionService.convert(commentDTO,Comment.class);
        comment = commentDomainService.updateResource(comment);
        LOG.info("Comment updated. Sending success response to client.");
        CommentDTO respone = conversionService.convert(comment, CommentDTO.class);
        return ResponseEntity.ok(respone);
    }

}
