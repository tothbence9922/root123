package hu.caff.backend.service;

import hu.caff.backend.domain.Caff;
import hu.caff.backend.repository.CaffRepository;
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
public class CaffDomainService {

    private final Logger LOG = LoggerFactory.getLogger(CaffDomainService.class);


    @Autowired
    CaffRepository CAFFRepository;

    public Caff getResourceById(Long caffId) {

        LOG.info(String.format("Requesting clusterState data with id %s", caffId));

        Caff CAFF = CAFFRepository.findById(caffId).orElse(null);

        if (CAFF == null) {
            LOG.error(String.format("CAFF not found with id %s", caffId));
            return null;
        }

        LOG.info(String.format("CAFF found data with id %s", caffId));

        return CAFF;
    }


    public List<Caff> getAllResources() {

        //LOG.info("Requesting all CAFFs");
        Stream<Caff> CAFFStream = StreamSupport.stream(CAFFRepository.findAll().spliterator(), false);

        List<Caff> animation = Optional.of(CAFFStream.collect(Collectors.toList()))
                .orElseGet(Collections::emptyList);

        //LOG.info(String.format("Found %d CAFFs", animation.size()));

        return animation;
    }


    public Caff createResource(Caff CAFF) {
        //LOG.info(String.format("Saving CAFF of %s", clusterState.getId()));
        Caff save = CAFFRepository.save(CAFF);

        //LOG.info("CAFF created with id: " + save.getId());

        return save;
    }


    public Caff removeResourceById(Long clusterStateId) {
        LOG.info(String.format("Deleting CAFF of %s", clusterStateId));

        Caff CAFF = getResourceById(clusterStateId);
        CAFFRepository.deleteById(clusterStateId);

        LOG.info(String.format("CAFF %s deleted.", CAFF.getId()));
        return CAFF;
    }


   public Caff updateResource(Caff CAFF) {
       // LOG.info(String.format("Updating CAFF of %s", clusterState.getId()));
        CAFFRepository.save(CAFF);

       // LOG.info("CAFF updated.");
        return CAFF;
    }

}
