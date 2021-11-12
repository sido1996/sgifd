package com.sgifdbackend.demo.security.api;


import com.sgifdbackend.demo.payload.Mail;
import com.sgifdbackend.demo.payload.UpdateAccountRequest;
import com.sgifdbackend.demo.payload.UserSaveRequest;
import com.sgifdbackend.demo.security.CurrentUser;
import com.sgifdbackend.demo.security.UserPrincipal;
import com.sgifdbackend.demo.security.dao.AccreditatedUserRepository;
import com.sgifdbackend.demo.security.dao.UserRepository;
import com.sgifdbackend.demo.security.entities.AccreditatedUser;
import com.sgifdbackend.demo.security.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.TimerTask;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;


@RestController
@CrossOrigin("*")
@RequestMapping("/user")
public class UserApi {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private AccreditatedUserRepository accreditatedUserDao;

    @Autowired
    private UserRepository userDao;

    @GetMapping(value = "/list")
    public List<User> getUserList() {
        return userDao.findByStatus(false);
    }

    @PostMapping(value = "/save")
    public User save(@RequestBody UserSaveRequest user) {
      

        //System.out.println("id ptf ==> "+ user.getPtf().getId());
        if (userDao.existsByUsername(user.getUsername()) && userDao.findByUsername(user.getUsername()).get().getId() != user.getId()) {
        	 
        	// return null;
        	User sydone2 = new User();
        	
        	sydone2.setUsername("sydone11");
        	 
        	return sydone2;
        	// null;
        }

        if (userDao.existsByEmail(user.getEmail()) && userDao.findByEmail(user.getEmail()).get().getId() != user.getId()) {
           
        	// return null;
        	User sydone1 = new User();
        	
        	sydone1.setEmail("TOTO@TOTO.COM");
        	 
        	return sydone1;
        }
        if (user.getId() == null && user.getPassword() == null) {
            return null;
        }

        User singIn = null;

        if (user.getId() == null) {
        	if(user.getPassword() != null ) {
        		user.setPassword(passwordEncoder.encode(user.getPassword()));
        	}
            
            singIn = new User(user.getId(), user.getUsername(), user.getFirstName(), user.getLastName(), user.getTel(), user.getEmail(), user.getPassword(), user.getProfession(),
                    user.getRoles(), user.getAccreditatedUsers(), user.getModuleUsers(),
                    user.getStructureBeneficiaire(), user.getPtf(), user.getAccountStatus());
        } else {
            if(userDao.findById(user.getId()).isPresent()) {
                singIn = userDao.findById(user.getId()).get();
                singIn.setFirstName(user.getFirstName());
                singIn.setLastName(user.getLastName());
                singIn.setTel(user.getTel());
                singIn.setEmail(user.getEmail());
                singIn.setProfession(user.getProfession());
                singIn.setRoles(user.getRoles());
                singIn.setAccreditatedUsers(user.getAccreditatedUsers());
                singIn.setModuleUsers(user.getModuleUsers());
                singIn.setStructureBeneficiaire(user.getStructureBeneficiaire());
                singIn.setPtf(user.getPtf());
            }
        }
        //System.out.println("id ptf ==> "+ user.getPtf().getId());
        if(user.getId() == null) {
             singIn.setFirstLogin(true);
        } else {
            singIn.setFirstLogin(false);
        }
        User newuser = userDao.saveAndFlush(singIn);
       /* List<AccreditatedUser> accreditatedUsers = user.getAccreditatedUsers();
        for (int i = 0; i < accreditatedUsers.size(); i++) {
            accreditatedUsers.get(i).setUser(newuser);
            accreditatedUserDao.saveAndFlush(accreditatedUsers.get(i));
        }*/

        //envoi de mail dans une tâche parallèle
        try {
            String subject = "Notification de création de compte.";
            StringBuilder message = new StringBuilder();
            message.append("Nous venons par le présent mail vous notifier les identifiants de votre compte ");
            message.append("Votre Login est : " + newuser.getUsername() + ".  Votre mot de passe est " + newuser.getPassword());
            //  message.append("reçue  le "+ new SimpleDateFormat("dd/MM/yyyy").format(contribuable.getCreatedAt())+"\n");
            message.append("Vous les utilisez pour vous connecter à la plate-forme SGIFD à la première connexion.");
            message.append("IL est fortement recommandé de modifier votre mot de passe après la première connexion.");
            String helloName = "Monsieur / Madame " + user.getLastName() + " " + user.getFirstName();
            TimerTask task = new TimerTask() {
                @Override
                public void run() {
                    Mail mailSend = new Mail();
                    mailSend.sendMessage(helloName, newuser.getEmail(), subject, message.toString());
                }
            };
            ScheduledExecutorService executor = Executors.newSingleThreadScheduledExecutor();
            long delay = 5000L;
            //long period = 1000L;
            executor.schedule(task, delay, TimeUnit.MILLISECONDS);
            //executor.scheduleAtFixedRate(repeatedTask, delay, period, TimeUnit.MILLISECONDS); 
            //Thread.sleep(delay + period * 3);
            executor.shutdown();
        } catch (Exception e) {
            System.out.print(e.getMessage());
        }

        return newuser;
    }

    @GetMapping(value = "/delete/{id}")
    public User delete(@PathVariable("id") Long id) {
        User newuser = userDao.findById(id).get();
        newuser.setStatus(true);
        userDao.saveAndFlush(newuser);
        return newuser;
    }

    @GetMapping(value = "/desactiver/{id}")
    public User desactiver(@PathVariable("id") Long id) {
        User newuser = userDao.findById(id).get();
        newuser.setAccountStatus(false);
        userDao.saveAndFlush(newuser);
        return newuser;
    }


    @GetMapping(value = "/activer/{id}")
    public User activer(@PathVariable("id") Long id) {
        User newuser = userDao.findById(id).get();
        newuser.setAccountStatus(true);
        userDao.saveAndFlush(newuser);
        return newuser;
    }


    @GetMapping(value = "/get-by-id/{id}")
    public User getId(@PathVariable("id") Long id) {
        User newuser = userDao.findById(id).get();
        return newuser;
    }


    @PostMapping(value = "/update-acount")
    public User updateAcount(@RequestBody UpdateAccountRequest user) {

        if (userDao.existsByUsername(user.getUsername()) && userDao.findByUsername(user.getUsername()).get().getId() != user.getId()) {
            return null;
        }

        if (userDao.existsByEmail(user.getEmail()) && userDao.findByEmail(user.getEmail()).get().getId() != user.getId()) {
            return null;
        }
        if (user.getId() == null && user.getPassword() == null) {
            return null;
        }

        User userTemoin = userDao.findById(user.getId()).get();
        if(user.getPassword() != null) {
            userTemoin.setPassword(passwordEncoder.encode(user.getPassword()));

        }
        userTemoin.setUsername(user.getUsername());
        userTemoin.setFirstName(user.getFirstName());
        userTemoin.setLastName(user.getLastName());
        userTemoin.setTel(user.getTel());
        userTemoin.setEmail(user.getEmail());
        userTemoin.setUsername(user.getUsername());
        userTemoin.setFirstLogin(false);

        User newuser = userDao.saveAndFlush(userTemoin);

        return newuser;
    }

    @PostMapping(value = "/update-password")
    public User updateAcount(@RequestBody String newpassword, @CurrentUser UserPrincipal userPrincipal) {

        User userTemoin = userDao.findById(userPrincipal.getId()).get();

        if(newpassword != null) {
            userTemoin.setPassword(passwordEncoder.encode(newpassword));
        }

        userTemoin.setFirstLogin(false);
        User newuser = userDao.saveAndFlush(userTemoin);

		newuser.setPassword(null);
        return newuser;
    }

}
