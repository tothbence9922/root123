package hu.caff.backend.service;

import hu.caff.backend.domain.Comment;
import hu.caff.backend.repository.CommentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

@Component
public class CommentDomainService {

    private final Logger LOG = LoggerFactory.getLogger(CommentDomainService.class);


    @Autowired
    CommentRepository CommentRepository;

    public Comment getResourceById(Long commentId) {

        LOG.info(String.format("Requesting clusterState data with id %s", commentId));

        Comment comment = CommentRepository.findById(commentId).orElse(null);

        if (comment == null) {
            LOG.error(String.format("Comment not found with id %s", commentId));
            return null;
        }

        LOG.info(String.format("Comment found data with id %s", commentId));

        return comment;
    }


    public List<Comment> getAllResources() {

        //LOG.info("Requesting all Comments");
        Stream<Comment> CommentStream = StreamSupport.stream(CommentRepository.findAll().spliterator(), false);

        List<Comment> animation = Optional.of(CommentStream.collect(Collectors.toList()))
                .orElseGet(Collections::emptyList);

        //LOG.info(String.format("Found %d Comments", animation.size()));

        return animation;
    }


    public Comment createResource(Comment Comment) {
        //LOG.info(String.format("Saving Comment of %s", clusterState.getId()));
        Comment save = CommentRepository.save(Comment);

        //LOG.info("Comment created with id: " + save.getId());

        return save;
    }


    public Comment removeResourceById(Long clusterStateId) {
        LOG.info(String.format("Deleting Comment of %s", clusterStateId));

        Comment Comment = getResourceById(clusterStateId);
        CommentRepository.deleteById(clusterStateId);

        LOG.info(String.format("Comment %s deleted.", Comment.getId()));
        return Comment;
    }


   public Comment updateResource(Comment Comment) {
       // LOG.info(String.format("Updating Comment of %s", clusterState.getId()));
        CommentRepository.save(Comment);

       // LOG.info("Comment updated.");
        return Comment;
    }

}
