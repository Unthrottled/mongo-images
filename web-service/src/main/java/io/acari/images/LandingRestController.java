package io.acari.images;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.OutputStream;

//@RestController
//@RequestMapping("/api")
public class LandingRestController {
//
//    private final ImageHandler imageHandler;
//
////    @Autowired
//    public LandingRestController(ImageHandler imageHandler) {
//        this.imageHandler = imageHandler;
//    }
//
//    @PostMapping(value = "image/delete/{id}",
//            consumes = MediaType.ALL_VALUE,
//            produces = MediaType.APPLICATION_JSON_VALUE)
//    public Mono<Boolean> deleteImage(@PathVariable("id") String id) {
//        return imageHandler.removeImage(id);
//    }
//
//    @PostMapping(value = "image/save", consumes = {
//            MediaType.MULTIPART_FORM_DATA_VALUE,
//            MediaType.IMAGE_PNG_VALUE,
//            MediaType.IMAGE_JPEG_VALUE,
//            MediaType.IMAGE_GIF_VALUE,
//            MediaType.APPLICATION_FORM_URLENCODED_VALUE,
//
//    })
//    public Mono<String> saveImage(@RequestPart MultipartFile projectFile) {
//        return imageHandler.saveImage(projectFile);
//    }
//
}
