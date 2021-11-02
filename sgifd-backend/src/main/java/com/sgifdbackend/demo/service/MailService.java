package com.sgifdbackend.demo.service;


	import com.sgifdbackend.demo.payload.Mail;
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.stereotype.Service;

	import java.util.Date;
	import java.util.List;
	import java.util.TimerTask;

	@Service
	public class MailService{

	    public boolean sendMail(String to, String subject, String messageContent, String helloName) {

	        Mail mail = new Mail();
	        String from= "assistance.impots@gmail.com";
	        messageContent = this.gethtmlMailFormat(subject,messageContent,helloName);
	        return mail.sendMessage(from, to, subject, messageContent);
	    }

	    /**
	     *
	     * @return
	     */
//	    public void sendMailAuto() {
//
//	        Mail mail = new Mail();
//	        String from= "assistance.impots@gmail.com";
//
//	        List<MailSend> mailSends = getLast3Email();
//
//	            mailSends.forEach(mailSend -> {
//	            String messageContent = gethtmlMailFormat(mailSend.getSubject(),mailSend.getMessage(),mailSend.getHelloName());
//	            if(mail.sendMessage(from, mailSend.getEmail(), mailSend.getSubject(), messageContent)) {
//	                mailSend.setEtat(true);
//	                mailRepository.save(mailSend);
//	                System.err.print("Erreur lors de l'envoi du mail id="+mailSend.getId());
//	            }else{
//	                System.out.print("Email envoye avec succes : id="+mailSend.getId());
//	            }
//	        });
//	    }


	    /**
	     *
	     * @param subject
	     * @param content
	     * @param helloName
	     * @return
	     */
	    public String gethtmlMailFormat( String subject, String content, String helloName){

	        String messageContent= "\t<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n" +
	                "\t<html xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\">\n" +
	                "\n" +
	                "\t<head>\n" +
	                "\t\t\t<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\n" +
	                "\t\t\t<meta charset=\"utf-8\">\n" +
	                "\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n" +
	                "\t\t<title>Présidence de la République du Bénin</title>\n" +
	                "\t\t<link href=\"https://fonts.googleapis.com/css?family=Montserrat:300,400,500\" rel=\"stylesheet\">\n" +
	                "\t\t<style type=\"text/css\">\n" +
	                "\t\t\t/* ----- Custom Font Import ----- */\n" +
	                "\t\t\n" +
	                "\t\t\t@media screen {\n" +
	                "\t@font-face {\n" +
	                "\t\tfont-family: 'Montserrat';\n" +
	                "\t\tfont-style: normal;\n" +
	                "\t\tfont-weight: 400;\n" +
	                "\t\tsrc: local('Montserrat'), local('Montserrat'), url(https://fonts.googleapis.com/css?family=Montserrat:300,400,500) ;\n" +
	                "\t}\n" +
	                "\t\t\t}\n" +
	                "\n" +
	                "\t\t\t/* ----- Text Styles ----- */\n" +
	                "\t\t\ttable {\n" +
	                "\t\t\t\tfont-family: 'Montserrat', sans-serif;\n" +
	                "\t\t\t\t-webkit-font-smoothing: antialiased;\n" +
	                "\t\t\t\t-moz-font-smoothing: antialiased;\n" +
	                "\t\t\t\tfont-smoothing: antialiased;\n" +
	                "\t\t\t}\n" +
	                "\n" +
	                "\t\t\t@media only screen and (max-width: 700px) {\n" +
	                "\n" +
	                "\t\t\t\t/* ----- Base styles ----- */\n" +
	                "\t\t\t\t.full-width-container {\n" +
	                "\t\t\t\t\tpadding: 0 !important;\n" +
	                "\t\t\t\t}\n" +
	                "\n" +
	                "\t\t\t\t.container {\n" +
	                "\t\t\t\t\twidth: 100% !important;\n" +
	                "\t\t\t\t}\n" +
	                "\n" +
	                "\t\t\t\t/* ----- Header ----- */\n" +
	                "\t\t\t\t.header td {\n" +
	                "\t\t\t\t\tpadding: 30px 15px 30px 15px !important;\n" +
	                "\t\t\t\t}\n" +
	                "\n" +
	                "\t\t\t\t/* ----- Projects list ----- */\n" +
	                "\t\t\t\t.projects-list {\n" +
	                "\t\t\t\t\tdisplay: block !important;\n" +
	                "\t\t\t\t}\n" +
	                "\n" +
	                "\t\t\t\t.projects-list tr {\n" +
	                "\t\t\t\t\tdisplay: block !important;\n" +
	                "\t\t\t\t}\n" +
	                "\n" +
	                "\t\t\t\t.projects-list td {\n" +
	                "\t\t\t\t\tdisplay: block !important;\n" +
	                "\t\t\t\t}\n" +
	                "\n" +
	                "\t\t\t\t.projects-list tbody {\n" +
	                "\t\t\t\t\tdisplay: block !important;\n" +
	                "\t\t\t\t}\n" +
	                "\n" +
	                "\t\t\t\t.projects-list img {\n" +
	                "\t\t\t\t\tmargin: 0 auto 25px auto;\n" +
	                "\t\t\t\t}\n" +
	                "\n" +
	                "\t\t\t\t/* ----- Half block ----- */\n" +
	                "\t\t\t\t.half-block {\n" +
	                "\t\t\t\t\tdisplay: block !important;\n" +
	                "\t\t\t\t}\n" +
	                "\n" +
	                "\t\t\t\t.half-block tr {\n" +
	                "\t\t\t\t\tdisplay: block !important;\n" +
	                "\t\t\t\t}\n" +
	                "\n" +
	                "\t\t\t\t.half-block td {\n" +
	                "\t\t\t\t\tdisplay: block !important;\n" +
	                "\t\t\t\t}\n" +
	                "\n" +
	                "\t\t\t\t.half-block__image {\n" +
	                "\t\t\t\t\twidth: 100% !important;\n" +
	                "\t\t\t\t\tbackground-size: cover;\n" +
	                "\t\t\t\t}\n" +
	                "\n" +
	                "\t\t\t\t.half-block__content {\n" +
	                "\t\t\t\t\twidth: 100% !important;\n" +
	                "\t\t\t\t\tbox-sizing: border-box;\n" +
	                "\t\t\t\t\tpadding: 25px 15px 25px 15px !important;\n" +
	                "\t\t\t\t}\n" +
	                "\n" +
	                "\t\t\t\t/* ----- Hero subheader ----- */\n" +
	                "\t\t\t\t.hero-subheader__title {\n" +
	                "\t\t\t\t\tpadding: 80px 15px 15px 15px !important;\n" +
	                "\t\t\t\t\tfont-size: 35px !important;\n" +
	                "\t\t\t\t}\n" +
	                "\n" +
	                "\t\t\t\t.hero-subheader__content {\n" +
	                "\t\t\t\t\tpadding: 0 15px 90px 15px !important;\n" +
	                "\t\t\t\t}\n" +
	                "\n" +
	                "\t\t\t\t/* ----- Title block ----- */\n" +
	                "\t\t\t\t.title-block {\n" +
	                "\t\t\t\t\tpadding: 0 15px 0 15px;\n" +
	                "\t\t\t\t}\n" +
	                "\n" +
	                "\t\t\t\t/* ----- Paragraph block ----- */\n" +
	                "\t\t\t\t.paragraph-block__content {\n" +
	                "\t\t\t\t\tpadding: 25px 15px 18px 15px !important;\n" +
	                "\t\t\t\t}\n" +
	                "\n" +
	                "\t\t\t\t/* ----- Info bullets ----- */\n" +
	                "\t\t\t\t.info-bullets {\n" +
	                "\t\t\t\t\tdisplay: block !important;\n" +
	                "\t\t\t\t}\n" +
	                "\n" +
	                "\t\t\t\t.info-bullets tr {\n" +
	                "\t\t\t\t\tdisplay: block !important;\n" +
	                "\t\t\t\t}\n" +
	                "\n" +
	                "\t\t\t\t.info-bullets td {\n" +
	                "\t\t\t\t\tdisplay: block !important;\n" +
	                "\t\t\t\t}\n" +
	                "\n" +
	                "\t\t\t\t.info-bullets tbody {\n" +
	                "\t\t\t\t\tdisplay: block;\n" +
	                "\t\t\t\t}\n" +
	                "\n" +
	                "\t\t\t\t.info-bullets__icon {\n" +
	                "\t\t\t\t\ttext-align: center;\n" +
	                "\t\t\t\t\tpadding: 0 0 15px 0 !important;\n" +
	                "\t\t\t\t}\n" +
	                "\n" +
	                "\t\t\t\t.info-bullets__content {\n" +
	                "\t\t\t\t\ttext-align: center;\n" +
	                "\t\t\t\t}\n" +
	                "\n" +
	                "\t\t\t\t.info-bullets__block {\n" +
	                "\t\t\t\t\tpadding: 25px !important;\n" +
	                "\t\t\t\t}\n" +
	                "\n" +
	                "\t\t\t\t/* ----- CTA block ----- */\n" +
	                "\t\t\t\t.cta-block__title {\n" +
	                "\t\t\t\t\tpadding: 35px 15px 0 15px !important;\n" +
	                "\t\t\t\t}\n" +
	                "\n" +
	                "\t\t\t\t.cta-block__content {\n" +
	                "\t\t\t\t\tpadding: 20px 15px 27px 15px !important;\n" +
	                "\t\t\t\t}\n" +
	                "\n" +
	                "\t\t\t\t.cta-block__button {\n" +
	                "\t\t\t\t\tpadding: 0 15px 0 15px !important;\n" +
	                "\t\t\t\t}\n" +
	                "\n" +
	                "\t\t\t}\n" +
	                "\n" +
	                "\t\t\t.flag-container {\n" +
	                "\t\t\t\twidth: 100%;\n" +
	                "\t\t\t\theight: 8px;\n" +
	                "\t\t\t\tmargin-bottom: 0;\n" +
	                "\t\t\t}\n" +
	                "\n" +
	                "\t\t\t.flag {\n" +
	                "\t\t\t\tpadding: 0;\n" +
	                "\t\t\t\theight: 100%;\n" +
	                "\t\t\t\twidth: 100%;\n" +
	                "\t\t\t\tmargin-left: auto;\n" +
	                "\t\t\t\tmargin-right: auto;\n" +
	                "\t\t\t\tlist-style-type: none;\n" +
	                "\t\t\t}\n" +
	                "\n" +
	                "\t\t\t.flag>li:first-child {\n" +
	                "\t\t\t\tbackground: RGB(16, 135, 87);\n" +
	                "\t\t\t}\n" +
	                "\n" +
	                "\t\t\t.flag>li {\n" +
	                "\t\t\t\theight: 100%;\n" +
	                "\t\t\t\tmargin: 0;\n" +
	                "\t\t\t\tpadding: 0;\n" +
	                "\t\t\t\twidth: 33.33%;\n" +
	                "\t\t\t\tdisplay: inline-block;\n" +
	                "\t\t\t\tbox-sizing: border-box;\n" +
	                "\t\t\t\tvertical-align: middle;\n" +
	                "\t\t\t\tfloat: left;\n" +
	                "\t\t\t}\n" +
	                "\n" +
	                "\t\t\t.flag>li:first-child+li {\n" +
	                "\t\t\t\tbackground: RGB(255, 190, 0);\n" +
	                "\t\t\t\twidth: 33.34%;\n" +
	                "\t\t\t}\n" +
	                "\n" +
	                "\t\t\t.flag li:first-child+li+li {\n" +
	                "\t\t\t\tbackground: RGB(235, 0, 0);\n" +
	                "\t\t\t}\n" +
	                "\t\t</style>\n" +
	                "\n" +
	                "\t\t<!--[if gte mso 9]><xml>\n" +
	                "\t\t\t\t<o:OfficeDocumentSettings>\n" +
	                "\t\t\t\t\t<o:AllowPNG/>\n" +
	                "\t\t\t\t\t<o:PixelsPerInch>96</o:PixelsPerInch>\n" +
	                "\t\t\t\t</o:OfficeDocumentSettings>\n" +
	                "\t\t\t</xml><![endif]-->\n" +
	                "\t</head>\n" +
	                "\n" +
	                "\t<body style=\"padding: 0; margin: 0;\" bgcolor=\"#eeeeee\">\n" +
	                "\t\t<span style=\"color:transparent !important; overflow:hidden !important; display:none !important; line-height:0px !important; height:0 !important; opacity:0 !important; visibility:hidden !important; width:0 !important; mso-hide:all;\"> Réponse à votre demande d'imatriculation à l'IFU </span>\n" +
	                "\n" +
	                "\t\t<!-- / Full width container -->\n" +
	                "\t\t<table class=\"full-width-container\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" height=\"100%\" width=\"100%\" bgcolor=\"#eeeeee\"\n" +
	                "\t\tstyle=\"width: 100%; height: 100%; padding: 30px 0 30px 0;\">\n" +
	                "\t\t\t<tr>\n" +
	                "\t\t\t\t<td align=\"center\" valign=\"top\">\n" +
	                "\t\t\t\t\t<!-- / 700px container -->\n" +
	                "\t\t\t\t\t<table class=\"container\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"700\" bgcolor=\"#ffffff\" style=\"width: 700px;\">\n" +
	                "\t\t\t\t\t\t<tr>\n" +
	                "\t\t\t\t\t\t\t<td align=\"center\" valign=\"top\">\n" +
	                "\t\t\t\t\t\t\t\t<!-- / Header -->\n" +
	                "\t\t\t\t\t\t\t\t<table style=\"    background: #1a7c5c;\n" +
	                "\t\t\t\t\t\t\t\twidth: 100%;\n" +
	                "\t\t\t\t\t\t\t\ttext-align: center;\n" +
	                "\t\t\t\t\t\t\t\tcolor: #FFF;\">\n" +
	                "\t\t\t\t\t\t\t\t\t<tr>\n" +
	                "\t\t\t\t\t\t\t\t\t\t<td style=\"padding: 30px 0 30px 0;  \">\n" +
	                "\t\t\t\t\t\t\t\t\t\t\t<h1>"+subject+"</h1>\n" +
	                "\t\t\t\t\t\t\t\t\t\t</td>\n" +
	                "\t\t\t\t\t\t\t\t\t</tr>\n" +
	                "\t\t\t\t\t\t\t\t</table>\n" +
	                "\t\t\t\t\t\t\t\t<!-- /// Header -->\n" +
	                "\n" +
	                "\t\t\t\t\t\t\t\t<!-- / Hero subheader -->\n" +
	                "\n" +
	                "\t\t\t\t\t\t\t\t<table class=\"container hero-subheader\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"620\" style=\"width: 620px;\">\n" +
	                "\t\t\t\t\t\t\t\t\t<tr>\n" +
	                "\t\t\t\t\t\t\t\t\t\t<td class=\"hero-subheader__title\" style=\"font-size: 40px; font-weight: bold; padding: 40px 0 15px 0;\" align=\"left\">\n" +
	                "\t\t\t\t\t\t\t\t\t\t\t"+helloName+"</td>\n" +
	                "\t\t\t\t\t\t\t\t\t</tr>\n" +
	                "\n" +
	                "\t\t\t\t\t\t\t\t\t<tr>\n" +
	                "\t\t\t\t\t\t\t\t\t\t<td class=\"hero-subheader__content\" style=\"font-size: 16px; line-height: 27px; color: #969696; padding: 0 60px 60px 0; text-align: justify\">\n" +
	                "\n" +
	                "\t\t\t\t\t\t\t\t\t\t\t<p>"+content+".\n" +
	                "\n" +
	                "\t\t\t\t\t\t\t\t\t\t\t</p>\n" +
	                "\t\t\t\t\t\t\t\t\t\t</td>\n" +
	                "\t\t\t\t\t\t\t\t\t</tr>\n" +
	                "\t\t\t\t\t\t\t\t\t<tr>\n" +
	                "\t\t\t\t\t\t\t\t\t\t<td class=\"hero-subheader__content\" style=\"font-size: 12px; line-height: 27px; color: #969696; padding: 0 40px 40px 0;\"\n" +
	                "\t\t\t\t\t\t\t\t\t\talign=\"left\">\n" +
	                "\n" +
	                "\t\t\t\t\t\t\t\t\t\t\tPour toute information complémentaire, merci de nous conctacter aux adresses suivantes\n" +
	                "\t\t\t\t\t\t\t\t\t\t\tTélephone : +229 XXXXXX.<br>\n" +
	                "\t\t\t\t\t\t\t\t\t\t\tEmail : <a href=\"mailto:assistance.sgifd@gmail.com\">assistance.sgifd@gmail.com</a>\n" +
	                "\t\t\t\t\t\t\t\t\t\t</td>\n" +
	                "\t\t\t\t\t\t\t\t\t</tr>\n" +
	                "\t\t\t\t\t\t\t\t</table>\n" +
	                "\n" +
	                "\n" +
	                "\t\t\t\t\t\t\t\t<!-- / Footer -->\n" +
	                "\t\t\t\t\t\t\t\t<table class=\"container\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" align=\"center\">\n" +
	                "\n" +
	                "\t\t\t\t\t\t\t\t\t<tr>\n" +
	                "\t\t\t\t\t\t\t\t\t\t<td align=\"center\">\n" +
	                "\t\t\t\t\t\t\t\t\t\t\t<table class=\"container\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"620\" align=\"center\" style=\"border-top: 1px solid #eeeeee; width: 620px;\">\n" +
	                "\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n" +
	                "\t\t\t\t\t\t\t\t\t\t\t\t\t<td style=\"text-align: center; padding: 50px 0 10px 0;\">\n" +
	                "\t\t\t\t\t\t\t\t\t\t\t\t\t\t<img src=\"\" alt=\"Logo-DGFD\"\n" +
	                "\t\t\t\t\t\t\t\t\t\t\t\t\t\tstyle=\" width: 250px;\">\n" +
	                "\t\t\t\t\t\t\t\t\t\t\t\t\t\t<br>\n" +
	                "\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n" +
	                "\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n" +
	                "\n" +
	                "\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n" +
	                "\t\t\t\t\t\t\t\t\t\t\t\t\t<td align=\"middle\">\n" +
	                "\t\t\t\t\t\t\t\t\t\t\t\t\t\t<table width=\"60\" height=\"2\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width: 60px; height: 2px;\">\n" +
	                "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n" +
	                "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td align=\"middle\" width=\"60\" height=\"2\" style=\"background-color: #eeeeee; width: 60px; height: 2px; font-size: 1px;\">MPD/DGFD-\n" +
	                "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tBENIN</td>\n" +
	                "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n" +
	                "\t\t\t\t\t\t\t\t\t\t\t\t\t\t</table>\n" +
	                "\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n" +
	                "\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n" +
	                "\n" +
	                "\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n" +
	                "\t\t\t\t\t\t\t\t\t\t\t\t\t<td style=\"color: #d5d5d5; text-align: center; font-size: 15px; padding: 10px 0 60px 0; line-height: 22px;\">Copyright\n" +
	                "\t\t\t\t\t\t\t\t\t\t\t\t\t\t&copy; 2015 <a href=\"#\" target=\"_blank\" style=\"text-decoration: none; border-bottom: 1px solid #d5d5d5; color: #d5d5d5;\">MPD/DGFD-\n" +
	                "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tBENIN</a>.\n" +
	                "\t\t\t\t\t\t\t\t\t\t\t\t\t\t<br />Tout droit réservs</td>\n" +
	                "\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n" +
	                "\t\t\t\t\t\t\t\t\t\t\t</table>\n" +
	                "\t\t\t\t\t\t\t\t\t\t</td>\n" +
	                "\t\t\t\t\t\t\t\t\t</tr>\n" +
	                "\t\t\t\t\t\t\t\t</table>\n" +
	                "\t\t\t\t\t\t\t\t<!-- /// Footer -->\n" +
	                "\n" +
	                "\t\t\t\t\t\t\t\t<div class=\"flag-container\">\n" +
	                "\t\t\t\t\t\t\t\t\t<ul class=\"flag\">\n" +
	                "\t\t\t\t\t\t\t\t\t\t<li style=\"background: RGB(16, 135, 87);\"></li>\n" +
	                "\t\t\t\t\t\t\t\t\t\t<li style=\"background: RGB(255, 190, 0);\n" +
	                "\t\t\t\t\t\t\t\t\t\twidth: 33.34%;\"></li>\n" +
	                "\t\t\t\t\t\t\t\t\t\t<li style=\"background: RGB(235, 0, 0);\"></li>\n" +
	                "\t\t\t\t\t\t\t\t\t</ul>\n" +
	                "\t\t\t\t\t\t\t\t</div>\n" +
	                "\t\t\t\t\t\t\t</td>\n" +
	                "\t\t\t\t\t\t</tr>\n" +
	                "\t\t\t\t\t</table>\n" +
	                "\n" +
	                "\t\t\t\t</td>\n" +
	                "\t\t\t</tr>\n" +
	                "\t\t</table>\n" +
	                "\n" +
	                "\n" +
	                "\t</body>\n" +
	                "\n" +
	                "\t</html>";




	        return messageContent;

	    }



}
