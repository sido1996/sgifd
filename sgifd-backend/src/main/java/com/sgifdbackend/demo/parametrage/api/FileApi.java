package com.sgifdbackend.demo.parametrage.api;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.sgifdbackend.demo.parametrage.dao.AnneeDao;
import com.sgifdbackend.demo.parametrage.dao.DBFileDao;
import com.sgifdbackend.demo.parametrage.entites.DBFile;
import com.sgifdbackend.demo.payload.FilePayload;
import com.sgifdbackend.demo.payload.UploadFileResponse;
import com.sgifdbackend.demo.service.FileStorageService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
@RequestMapping("/piece")
public class FileApi {

    private static final Logger logger = LoggerFactory.getLogger(FileApi.class);

    @Autowired
    private FileStorageService fileStorageService;

	@Autowired
	private DBFileDao dBFileDao;

    public String resolveToken(HttpServletRequest req) {
        String bearerToken = req.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
    
    
    @PostMapping("/save-piece")
    public DBFile savePiece(@RequestBody DBFile dBFile) {
    	
    	return dBFileDao.saveAndFlush(dBFile);
    }
    
    @PostMapping("/delete-piece")
    public DBFile deletePiece(@RequestBody DBFile dBFile) {
    	if(fileStorageService.deleteFileResponse(dBFile.getFullFileName()) == true) {
    		dBFileDao.delete(dBFile);
    		return dBFile;
    	}
    	return null;
    }
    
    @PostMapping("/uploadFile")
    public DBFile uploadFile(@RequestParam("file") MultipartFile file) {


        DBFile dbFile = fileStorageService.storeFileTest(file);

        return dbFile;
    }


    @GetMapping("/downloadFile/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        // Load file as Resource
        Resource resource = fileStorageService.loadFileAsResource(fileName);

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            logger.info("Could not determine file type.");
        }

        // Fallback to the default content type if type could not be determined
        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

}
