package com.sgifdbackend.demo.parametrage.api;

import com.sgifdbackend.demo.parametrage.dao.DocumentProgrammatiqueDao;
import com.sgifdbackend.demo.parametrage.entites.DocumentProgrammatique;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/document-programmatique")
public class DocumentProgrammatiqueApi {
	
	@Autowired
	private DocumentProgrammatiqueDao documentProgrammatiqueDao;
	
	@GetMapping(value = "/list")
	public List<DocumentProgrammatique> getDocumentProgrammatiques() {
		return documentProgrammatiqueDao.findByStatus(false);
	}


	@PostMapping(value = "/save")
	public DocumentProgrammatique save(@RequestBody DocumentProgrammatique documentProgrammatique) {

		return	documentProgrammatiqueDao.saveAndFlush(documentProgrammatique);
	}

	@PostMapping(value = "/delete")
	public DocumentProgrammatique delete(@RequestBody DocumentProgrammatique DocumentProgrammatique) {

		DocumentProgrammatique.setStatus(true);
		return	documentProgrammatiqueDao.saveAndFlush(DocumentProgrammatique);
	}
	
	@GetMapping(value = "/get/{id}")
	public DocumentProgrammatique getById(@PathVariable("id") Long id) {
		return documentProgrammatiqueDao.findById(id).get();
	}

}
