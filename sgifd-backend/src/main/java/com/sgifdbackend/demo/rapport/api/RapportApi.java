package com.sgifdbackend.demo.rapport.api;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.math.BigInteger;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sgifdbackend.demo.parametrage.api.ExerciceApi;
import com.sgifdbackend.demo.parametrage.dao.AnneeDao;
import com.sgifdbackend.demo.parametrage.dao.ArrondissementDao;
import com.sgifdbackend.demo.parametrage.dao.AxePrioritaireDao;
import com.sgifdbackend.demo.parametrage.dao.CategoriePTFDao;
import com.sgifdbackend.demo.parametrage.dao.CibleDao;
import com.sgifdbackend.demo.parametrage.dao.CommuneDao;
import com.sgifdbackend.demo.parametrage.dao.DepartementDao;
import com.sgifdbackend.demo.parametrage.dao.DomainePTFDao;
import com.sgifdbackend.demo.parametrage.dao.EnvergureDao;
import com.sgifdbackend.demo.parametrage.dao.GrandSecteurDao;
import com.sgifdbackend.demo.parametrage.dao.NatureAssistanceDao;
import com.sgifdbackend.demo.parametrage.dao.NatureFinancementDao;
import com.sgifdbackend.demo.parametrage.dao.NiveauMaturiteDao;
import com.sgifdbackend.demo.parametrage.dao.ODDDao;
import com.sgifdbackend.demo.parametrage.dao.PTFBailleursFrsDao;
import com.sgifdbackend.demo.parametrage.dao.PaysDao;
import com.sgifdbackend.demo.parametrage.dao.PilierPAGDao;
import com.sgifdbackend.demo.parametrage.dao.SecteurDao;
import com.sgifdbackend.demo.parametrage.dao.SousSecteurDao;
import com.sgifdbackend.demo.parametrage.dao.StatusAccordDao;
import com.sgifdbackend.demo.parametrage.dao.StructureBeneficiaireDao;
import com.sgifdbackend.demo.parametrage.dao.TypeAccordDao;
import com.sgifdbackend.demo.parametrage.dao.TypeCooperationDao;
import com.sgifdbackend.demo.parametrage.dao.TypeFondSpecifiqueDao;
import com.sgifdbackend.demo.parametrage.dao.TypeRessourceInterieureDao;
import com.sgifdbackend.demo.payload.RapportFieldSelection;
import com.sgifdbackend.demo.rapport.dao.RapportDao;
import com.sgifdbackend.demo.rapport.dao.RapportParamsDao;
import com.sgifdbackend.demo.rapport.entities.Rapport;
import com.sgifdbackend.demo.rapport.entities.RapportParams;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.engine.export.ooxml.JRXlsxExporter;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import net.sf.jasperreports.export.SimplePdfExporterConfiguration;
import net.sf.jasperreports.export.SimplePdfReportConfiguration;
import net.sf.jasperreports.export.SimpleXlsxReportConfiguration;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.xml.JRXmlLoader;

@RestController
@CrossOrigin("*")
@RequestMapping("/rapport")
public class RapportApi {

	@Autowired
	private AxePrioritaireDao axeprioritaireDao;
	@Autowired
	private CategoriePTFDao categoriePTFDao;
	@Autowired
	private CibleDao cibleDao;
	@Autowired
	private CommuneDao communeDao;
	@Autowired
	private DepartementDao departementDao;
	@Autowired
	private DomainePTFDao domainePTFDao;
	@Autowired
	private EnvergureDao envergureDao;
	@Autowired
	private AnneeDao anneeDao;
	@Autowired
	private GrandSecteurDao grandSecteurDao;
	@Autowired
	private NatureAssistanceDao natureAssistanceDao;
	@Autowired
	private NatureFinancementDao natureFinancementDao;
	@Autowired
	private NiveauMaturiteDao niveauMaturiteDao;
	@Autowired
	private ODDDao oDDDao;
	@Autowired
	private PaysDao paysDao;
	@Autowired
	private PilierPAGDao pilierPAGDao;
	@Autowired
	private PTFBailleursFrsDao pTFBailleursFrsDao;
	@Autowired
	private SecteurDao secteurDao;
	@Autowired
	private SousSecteurDao sousSecteurDao;
	@Autowired
	private StructureBeneficiaireDao structureBeneficiaireDao;
	@Autowired
	private TypeAccordDao typeAccordDao;
	@Autowired
	private TypeCooperationDao typeCooperationDao;
	@Autowired
	private TypeFondSpecifiqueDao typeFondSpecifiqueDao;
	@Autowired
	private TypeRessourceInterieureDao typeRessourceInterieureDao;
	@Autowired
	private ArrondissementDao arrondissementDao;

	@Autowired
	private ResourceLoader resourceLoader;

	@Value("${logo.path}")
	private String logoPath;

//	@Value("${file.rapport.windows}")
//	private String rapportPathWindows;

	@Value("${file.rapport.linux}")
	private String rapportPathLinux;

	private static final String logoEntete = "/home/sylvanus/logo/logo-mpd.png";
	private static final String logoFooter = "/home/sylvanus/logo/footer_img.png";

	@Value("${file.upload-dir}")
	private String uplodsDir;
	@Value("${spring.datasource.password}")
	private String password;
	@Value("${spring.datasource.username}")
	private String login;
	@Value("${spring.datasource.driver-class-name}")
	private String driver;

	@Value("${spring.datasource.url}")
	private String url;

	@Autowired
	private RapportDao rapportDao;

	@Autowired
	private RapportParamsDao rapportParamsDao;

	@GetMapping(value = "/rapport-field-selection")
	public RapportFieldSelection getrapports() {
		RapportFieldSelection rapportFieldSelection = new RapportFieldSelection();

		rapportFieldSelection.setArrondissementList(arrondissementDao.findByStatus(false));
		rapportFieldSelection.setDomainePTFList(domainePTFDao.findByStatus(false));
		rapportFieldSelection.setAxePrioritaireList(axeprioritaireDao.findByStatus(false));
		rapportFieldSelection.setCategoriePTFList(categoriePTFDao.findByStatus(false));
		rapportFieldSelection.setCibleList(cibleDao.findByStatus(false));
		rapportFieldSelection.setDepartementList(departementDao.findByStatus(false));
		rapportFieldSelection.setEnvergureList(envergureDao.findByStatus(false));
		rapportFieldSelection.setGrandSecteurList(grandSecteurDao.findByStatus(false));
		rapportFieldSelection.setNatureAssistanceList(natureAssistanceDao.findByStatus(false));
		rapportFieldSelection.setNatureFinancementList(natureFinancementDao.findByStatus(false));
		rapportFieldSelection.setNiveauMaturiteList(niveauMaturiteDao.findByStatus(false));
		rapportFieldSelection.setoDDList(oDDDao.findByStatus(false));
		rapportFieldSelection.setPaysList(paysDao.findByStatus(false));
		rapportFieldSelection.setPilierPAGList(pilierPAGDao.findByStatus(false));
		rapportFieldSelection.setpTFBailleurFrsList(pTFBailleursFrsDao.findByStatus(false));
		rapportFieldSelection.setSecteurList(secteurDao.findByStatus(false));
		rapportFieldSelection.setSousSecteurList(sousSecteurDao.findByStatus(false));
		rapportFieldSelection.setStructureBeneficiaireList(structureBeneficiaireDao.findByStatus(false));
		rapportFieldSelection.setTypeAccordList(typeAccordDao.findByStatus(false));
		rapportFieldSelection.setTypeCooperationList(typeCooperationDao.findByStatus(false));
		rapportFieldSelection.setTypeFondSpecifiqueList(typeFondSpecifiqueDao.findByStatus(false));
		rapportFieldSelection.setTypeRessourceInterieureList(typeRessourceInterieureDao.findByStatus(false));
		rapportFieldSelection.setExerciceList(anneeDao.findByStatus(false));
		rapportFieldSelection.setCommuneList(communeDao.findByStatus(false));

		return rapportFieldSelection;
	}

	@GetMapping(value = "/list")
	public List<Rapport> getRapports() {
		return rapportDao.findByStatus(false);
	}

	@PostMapping(value = "/save")
	public Rapport save(@RequestBody Rapport rapport) {

		Rapport unrapport = rapportDao.saveAndFlush(rapport);

		List<RapportParams> rapportParams = rapport.getRapportParams();
		for (int i = 0; i < rapportParams.size(); i++) {
			rapportParams.get(i).setRapport(unrapport);
			rapportParamsDao.saveAndFlush(rapportParams.get(i));
		}

		return rapport;
	}

	@PostMapping(value = "/delete-param")
	public RapportParams deleteParam(@RequestBody RapportParams rapportParams) {

		rapportParamsDao.delete(rapportParams);

		return rapportParams;
	}

	@PostMapping(value = "/delete")
	public Rapport delete(@RequestBody Rapport rapport) {

		rapport.setStatus(true);
		return rapportDao.saveAndFlush(rapport);
	}

	@GetMapping(value = "/detail/{id}")
	public Rapport getrapport(@PathVariable Long id) {
		return rapportDao.findById(id).get();
	}

	@PostMapping(value = "/rapport-pdf")
	public void reportSqlPdf(HttpServletResponse response, @RequestBody() Rapport rapport)
			throws Exception, JRException, SQLException {

		Connection conn = null;
		// - Connexion à la base
		Class.forName(driver);
		conn = DriverManager.getConnection(url, login, password);

//		InputStream stream = getStream( "/rapports/" + rapport.getNom().toUpperCase() + ".jrxml");

		// - Chargement et compilation du rapport
//        JasperDesign jasperDesign = JRXmlLoader.load("C:\\Users\\Admin\\Documents\\PLan\\mpd\\rapports\\"+rapport.getNom().toUpperCase()+".jrxml");
		JasperDesign jasperDesign = JRXmlLoader.load(rapportPathLinux + rapport.getNom().toUpperCase() + ".jrxml");
//		JasperReport jasperReport = JasperCompileManager.compileReport(stream);
		JasperReport jasperReport = JasperCompileManager.compileReport(jasperDesign);

		// - Paramètres à envoyer au rapport
		Map<String, Object> parameters = new HashMap();
		parameters.put("logoEntete", logoEntete);
		parameters.put("logoFooter", logoFooter);
		rapport.getRapportParams().forEach(r -> {
			parameters.put(r.getCle(), r.getValeur());
			System.out.println("clé ==>" + r.getCle() + "  valeur ==>" + r.getValeur());
		});

		// - Execution du rapport
		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, conn);

		// - Création du rapport au format PDF

		JRPdfExporter exporter = new JRPdfExporter();

		exporter.setExporterInput(new SimpleExporterInput(jasperPrint));

		exporter.setExporterOutput(
				new SimpleOutputStreamExporterOutput(getUplodsDir() + "/" + rapport.getNom() + ".pdf"));

		SimplePdfReportConfiguration reportConfig = new SimplePdfReportConfiguration();
		reportConfig.setSizePageToContent(true);
		reportConfig.setForceLineBreakPolicy(false);
		SimplePdfExporterConfiguration exportConfig = new SimplePdfExporterConfiguration();
		exportConfig.setMetadataAuthor("RCD");
		exportConfig.setEncrypted(true);
		exportConfig.setAllowedPermissionsHint("PRINTING");
		exporter.setConfiguration(reportConfig);
		exporter.setConfiguration(exportConfig);

		response.setContentType("application/x-download");
		response.setHeader("Content-Disposition",
				String.format("attachment; filename=\"" + rapport.getNom() + ".pdf\""));
		OutputStream out = response.getOutputStream();
		JasperExportManager.exportReportToPdfStream(jasperPrint, out);
		conn.close();

	}

	@GetMapping(value = "/rapport-xlsx/{nameReport}/{date_Debut}/{date_Fin}")
	public void reportSqlXlsx(HttpServletResponse response, @PathVariable("nameReport") String nameReport,
			@PathVariable("date_Debut") String date_Debut, @PathVariable("date_Fin") String date_Fin)
			throws Exception, JRException, SQLException {

		Connection conn = null;
		// - Connexion à la base
		Class.forName(driver);
		conn = DriverManager.getConnection(url, login, password);

		// - Chargement et compilation du rapport
//        JasperDesign jasperDesign = JRXmlLoader.load("C:\\Users\\Admin\\Documents\\PLan\\mpd\\rapports\\"+rapport.getNom().toUpperCase()+".jrxml");
		JasperDesign jasperDesign = JRXmlLoader.load(rapportPathLinux + nameReport.toUpperCase() + ".jrxml");
//		JasperReport jasperReport = JasperCompileManager.compileReport(stream);
		JasperReport jasperReport = JasperCompileManager.compileReport(jasperDesign);

		// - Paramètres à envoyer au rapport
		Map<String, Object> parameters = new HashMap();
		parameters.put("logoEntete", logoEntete);
		parameters.put("logoFooter", logoFooter);

		parameters.put("date_Debut", date_Debut);
		parameters.put("date_Fin", date_Fin);

		// - Execution du rapport
		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, conn);

		// - Création du rapport au format xlsx

		JRXlsxExporter exporter = new JRXlsxExporter(); // initialize exporter
		exporter.setExporterInput(new SimpleExporterInput(jasperPrint)); // set compiled report as input
		exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(getUplodsDir() + "/" + nameReport + ".xlsx")); // set
	
		SimpleXlsxReportConfiguration configuration = new SimpleXlsxReportConfiguration();
		configuration.setOnePagePerSheet(true); // setup configuration
		configuration.setDetectCellType(true);
		exporter.setConfiguration(configuration); // set configuration
		exporter.exportReport();


		response.setContentType("application/x-download");
		response.setHeader("Content-Disposition",
				String.format("attachment; filename=\"" + nameReport + ".xlsx\""));
		OutputStream out = response.getOutputStream();

		conn.close();

	}
//
//
//	@PostMapping(value = "/rapport-xlsx")
//	public void reportSqlXlsx(HttpServletResponse response, @RequestBody() Rapport rapport) throws Exception, JRException, SQLException  {
//
//		Connection conn = null;
//        // - Connexion à la base
//		Class.forName(driver);
//		conn = DriverManager.getConnection(url, login, password);
//
//
//
////		InputStream stream = getStream( "/rapports/" + rapport.getNom().toUpperCase() + ".jrxml");
//
//        // - Chargement et compilation du rapport
////        JasperDesign jasperDesign = JRXmlLoader.load("C:\\Users\\Admin\\Documents\\PLan\\mpd\\rapports\\"+rapport.getNom().toUpperCase()+".jrxml");
//        JasperDesign jasperDesign = JRXmlLoader.load(rapportPathWindows+rapport.getNom().toUpperCase()+".jrxml");
////		JasperReport jasperReport = JasperCompileManager.compileReport(stream);
//		JasperReport jasperReport = JasperCompileManager.compileReport(jasperDesign);
//		
//        // - Paramètres à envoyer au rapport
//		Map<String, Object> parameters = new HashMap();
//		parameters.put("logoEntete",  logoEntete);
//		parameters.put("logoFooter", logoFooter);
//		rapport.getRapportParams().forEach(r -> {
//			parameters.put(r.getCle(), r.getValeur());
//			System.out.println("clé ==>" + r.getCle() + "  valeur ==>" + r.getValeur());
//		});
//
//        // - Execution du rapport
//		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, conn);
//		
//		 // - Création du rapport au format PDF
//        
//		JRXlsxExporter exporter = new JRXlsxExporter();
//		
//
//		exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
//
//		exporter.setExporterOutput(
//				new SimpleOutputStreamExporterOutput(getUplodsDir() + "/" + rapport.getNom() + ".xlsx"));
//
//
//
//
//
//
//
//		response.setContentType("application/x-download");
//		response.setHeader("Content-Disposition",
//				String.format("attachment; filename=\"" + rapport.getNom() + ".xlsx\""));
//		OutputStream out = response.getOutputStream();
//		JasperExportManager.exportReportToPdfStream(jasperPrint, out);
//		conn.close();
//
//	}
//

	@PostMapping(value = "/rapport-html")
	public void reportSqlHtml(HttpServletResponse response, @RequestBody() Rapport rapport)
			throws Exception, JRException, SQLException {

		Connection conn = null;
		// - Connexion à la base
		Class.forName(driver);
		conn = DriverManager.getConnection(url, login, password);

		//chargement du rapport format jrxml
		JasperDesign jasperDesign = JRXmlLoader.load(rapportPathLinux + rapport.getNom().toUpperCase() + ".jrxml");
        //compilation du rapport jrxml
		JasperReport jasperReport = JasperCompileManager.compileReport(jasperDesign);

		// - Paramètres à envoyer au rapport
		Map<String, Object> parameters = new HashMap();
		parameters.put("logoEntete", logoEntete);
		parameters.put("logoFooter", logoFooter);
		rapport.getRapportParams().forEach(r -> {
			parameters.put(r.getCle(), r.getValeur());
			System.out.println("clé ==>" + r.getCle() + "  valeur ==>" + r.getValeur());
		});

		// - Execution du rapport
		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, conn);

		// - Création du rapport au format PDF
		JasperExportManager.exportReportToHtmlFile(jasperPrint,
				"C:\\Users\\Admin\\Documents\\PLan\\mpd\\rapports\\classic.html");
		
		conn.close();

	}

	public String getUplodsDir() {
		return uplodsDir;
	}

}
