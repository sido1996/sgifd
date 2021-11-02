package com.sgifdbackend.demo.security.api;

import com.sgifdbackend.demo.enums.RoleName;
import com.sgifdbackend.demo.exception.AppException;
import com.sgifdbackend.demo.payload.*;
import com.sgifdbackend.demo.security.CurrentUser;
import com.sgifdbackend.demo.security.JwtTokenProvider;
import com.sgifdbackend.demo.security.UserPrincipal;
import com.sgifdbackend.demo.security.dao.AccreditatedUserRepository;
import com.sgifdbackend.demo.security.dao.RoleRepository;
import com.sgifdbackend.demo.security.dao.UserRepository;
import com.sgifdbackend.demo.security.entities.Role;
import com.sgifdbackend.demo.security.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.nio.charset.Charset;
import java.util.*;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

/*import org.slf4j.Logger;
import org.slf4j.LoggerFactory;*/

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
//@RequestMapping(value = "/example/v1/auth")
public class AuthController {

    @Autowired
    private AccreditatedUserRepository accreditatedUserDao;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsernameOrEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignUpRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity(new ApiResponse(false, "Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }

        // Creating user's account
        User user = new User(signUpRequest.getName(), signUpRequest.getUsername(),
                signUpRequest.getEmail(), signUpRequest.getPassword());

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new AppException("User Role not set."));

        user.setRoles(Collections.singleton(userRole));

        User result = userRepository.save(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/users/{username}")
                .buildAndExpand(result.getUsername()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }


    //private static final Logger logger = LoggerFactory.getLogger(AuthController.class);


    /**
     * @param currentUser
     * @return l'utilisateur connecté
     */
    @GetMapping("/me")
    public User getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        java.util.Optional<User> meUser = userRepository.findById(currentUser.getId());
        if (meUser.get().getAccountStatus() == false || meUser.get().getStatus() == true) {
            return null;
        }
        return userRepository.findById(currentUser.getId()).get();
    }


    @PostMapping("/check-email")
    public Map<String, Integer> checkIfExistEmail(@RequestBody String email) {
        System.out.println(email);
        Boolean isAvailable = userRepository.existsByEmail(email);
        Map<String, Integer> response = new HashMap<String, Integer>();
        if (isAvailable) {
            java.util.Optional<User> newUser = userRepository.findByEmail(email);
            if (newUser.get() != null) {
                //String password = newUser.get().getFirstName().substring(0, 2).toUpperCase() + "@" + newUser.get().getLastName().substring(0, 2).toLowerCase() + "$" + ((new Date()).getYear());
                String password = this.generatePassword();
                newUser.get().setPassword(passwordEncoder.encode(password));
                
                
                System.out.println("le mot de pass es" + password);
                userRepository.save(newUser.get());
                System.out.println("début envoi de mail");
                this.sendEmailToOnUser(newUser.get().getLastName() + "  " + newUser.get().getFirstName(), newUser.get().getEmail(),
                        "Réinitialisation du mot de passe", "Votre nouveau mot de passe est : " + password);
                System.out.println("fin envoi de mail");
            }
            response.put("code", 1);

        } else {
            response.put("code", 2);
        }
        return response;
    }


    @GetMapping("/checkUsernameAvailability")
    public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String username) {
        Boolean isAvailable = !userRepository.existsByUsername(username);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/checkEmailAvailability")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !userRepository.existsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }


    @GetMapping("/all")
    public List<User> all() {
        return userRepository.findAll();
    }


    @GetMapping("/send-email/{helloName}/{to}/{subject}/{messageContent}")
    public String sendEmailToOnUser(@PathVariable("helloName") String helloName, @PathVariable("to") String to,
                                    @PathVariable("subject") String subject, @PathVariable("messageContent") String messageContent) {
        //envoi de mail dans une tâche parallèle
        try {
            //String subject = "Notification de création de compte.";
            StringBuilder message = new StringBuilder();
            //  message.append("Nous venons par le présent mail vous notifier les identifiants de votre compte ");
            //  message.append("reçue  le "+ new SimpleDateFormat("dd/MM/yyyy").format(contribuable.getCreatedAt())+"\n");
            message.append(messageContent);
            message.append("  Vous avez reçu le mail depuis la plate-forme SGIFD");
            String helloNameDestinataire = "Monsieur / Madame " + helloName;
            TimerTask task = new TimerTask() {
                @Override
                public void run() {
                    Mail mailSend = new Mail();
                    mailSend.sendMessage(helloNameDestinataire, to, subject, message.toString());
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
        return "success";
    }


    public String generatePassword() {
        int leftLimit = 48; // numeral '0'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 8;
        Random random = new Random();

        String generatedString = random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();

        System.out.println(generatedString);
        return generatedString;
    }

}
