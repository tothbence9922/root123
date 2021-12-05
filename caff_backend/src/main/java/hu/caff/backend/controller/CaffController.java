package hu.caff.backend.controller;

import hu.caff.backend.domain.Caff;
import hu.caff.backend.domain.Comment;
import hu.caff.backend.dto.CaffDTO;
import hu.caff.backend.dto.CommentDTO;
import hu.caff.backend.service.CaffDomainService;
import jni.jniparser.CAFFParser;
import jni.jniparser.CAFFResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.core.convert.ConversionService;
import org.springframework.core.convert.support.DefaultConversionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class CaffController {

    private final Logger LOG = LoggerFactory.getLogger(CaffController.class);

    @Autowired
    CaffDomainService CAFFDomainService;

    @Autowired
    ConversionService conversionService;



    @RequestMapping(path = "/caff/{caffId}", method = RequestMethod.GET, produces = "application/json")
    CaffDTO getResourceById(@PathVariable(name = "caffId") Long caffId){
        LOG.info(String.format("Requesting caff with id %s", caffId));

        Caff caff = CAFFDomainService.getResourceById(caffId);

        CaffDTO caffDTO = conversionService.convert(caff,CaffDTO.class);

        LOG.info("Caff found. Sending caff data to client.");
        return caffDTO;
    }

    @RequestMapping(path = "/caff", method = RequestMethod.GET, produces = "application/json")
    List<CaffDTO> getAllResources(){

        LOG.info("Requesting all caffs.");

        List<Caff> caffs = CAFFDomainService.getAllResources();

        List<CaffDTO> caffDTOs = caffs.stream().map(
                caff -> conversionService.convert(caff,CaffDTO.class)).collect(Collectors.toList());
        caffDTOs.forEach(caffDTO -> caffDTO.setData(null));

        LOG.info("Caff list found. Sending data to client.");
        return caffDTOs;
    }

    @RequestMapping(path = "/caff", method = RequestMethod.POST, produces = "application/json")
    ResponseEntity<Object> createResource(@RequestPart CaffDTO caffDTO, @RequestPart MultipartFile caffData) throws IOException {
        LOG.info("Creating new caff");

        Caff caff = conversionService.convert(caffDTO,Caff.class);

        CAFFResponse resp = new CAFFParser().parse(caffData.getBytes());

        System.out.println(resp.GetError());
        System.out.println(resp.GetCreator());
        System.out.println(resp.GetDate());
        System.out.println(resp.GetThumbnailCaption());
        System.out.println(resp.GetThumbnailTags());
        System.out.println(resp.GetThumbnail().length);

        assert caff != null;
        caff.setData(caffData.getBytes());

        caff.setThumbnail(resp.GetThumbnail());

        caff = CAFFDomainService.createResource(caff);

        LOG.info(String.format("Caff created with id: %s", caff.getId()));

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .replacePath("/caff/{caffId}")
                .buildAndExpand(caff.getId()).toUri();

        caffDTO = conversionService.convert(caff,CaffDTO.class);
        return ResponseEntity
                .created(location)
                .body(caffDTO);
    }


    @RequestMapping(path = "/caff/{caffId}", method = RequestMethod.DELETE, produces = "application/json")
    ResponseEntity<Object> removeResourceById(@PathVariable(name = "caffId") Long caffId){
        LOG.info(String.format("Deleting caff of %s", caffId));
        Caff caff = CAFFDomainService.removeResourceById(caffId);
        CaffDTO caffDTO = conversionService.convert(caff,CaffDTO.class);
        LOG.info("Caff deleted successfully. Sending response to client");
        return ResponseEntity.ok(caffDTO);
    }


    @RequestMapping(path = "/caff", method = RequestMethod.PUT, produces = "application/json")
    ResponseEntity<Object> updateResource(@RequestBody CaffDTO caffDTO){
        LOG.info(String.format("Updating caff with id: %s", caffDTO.getId()));

        Caff caff = conversionService.convert(caffDTO,Caff.class);
        caff = CAFFDomainService.updateResource(caff);
        caffDTO = conversionService.convert(caff,CaffDTO.class);
        LOG.info("Caff updated. Sending success response to client.");
        return ResponseEntity.ok(caffDTO);
    }

}
