package hu.caff.backend.controller;

import hu.caff.backend.domain.Caff;
import hu.caff.backend.service.CaffDomainService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class CaffController {

    @Value("${data.allowedOrigin}")
    String allowedOrigin;

    @Bean
    @ConditionalOnMissingBean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry
                        .addMapping("/**")
                        .allowedMethods("GET", "POST","PUT", "DELETE","OPTIONS")
                        .allowedHeaders("*");
            }
        };
    }

    private final Logger LOG = LoggerFactory.getLogger(CaffController.class);

    @Autowired
    CaffDomainService CAFFDomainService;


    @RequestMapping(path = "/caff/{caffId}", method = RequestMethod.GET, produces = "application/json")
    Caff getResourceById(@PathVariable(name = "caffId") Long caffId){
        LOG.info(String.format("Requesting caff with id %s", caffId));

        Caff CAFF = CAFFDomainService.getResourceById(caffId);

        LOG.info("Caff found. Sending caff data to client.");
        return CAFF;
    }

    @RequestMapping(path = "/caff", method = RequestMethod.GET, produces = "application/json")
    List<Caff> getAllResources(){
        LOG.info("Requesting all caffs.");

        List<Caff> Caffs = CAFFDomainService.getAllResources();

        LOG.info("Caff list found. Sending data to client.");
        return Caffs;
    }


    @RequestMapping(path = "/caff", method = RequestMethod.POST, produces = "application/json")
    ResponseEntity<Object> createResource(@RequestBody Caff caff){
        LOG.info("Creating new caff");

        caff = CAFFDomainService.createResource(caff);

        LOG.info(String.format("Caff created with id: %s", caff.getId()));

        LOG.info("Creating success response with data and entity reference.");
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .replacePath("/caff/{caffId}")
                .buildAndExpand(caff.getId()).toUri();

        return ResponseEntity
                .created(location)
                .body(caff);
    }


    @RequestMapping(path = "/caff/{caffId}", method = RequestMethod.DELETE, produces = "application/json")
    ResponseEntity<Object> removeResourceById(@PathVariable(name = "caffId") Long caffId){
        LOG.info(String.format("Deleting caff of %s", caffId));
        Caff CAFF = CAFFDomainService.removeResourceById(caffId);

        LOG.info("Caff deleted successfully. Sending response to client");
        return ResponseEntity.ok(CAFF);
    }


    @RequestMapping(path = "/caff", method = RequestMethod.PUT, produces = "application/json")
    ResponseEntity<Object> updateResource(@RequestBody Caff caff){
        LOG.info(String.format("Updating caff with id: %s", caff.getId()));

        caff = CAFFDomainService.updateResource(caff);

        LOG.info("Caff updated. Sending success response to client.");
        return ResponseEntity.ok(caff);
    }

}
