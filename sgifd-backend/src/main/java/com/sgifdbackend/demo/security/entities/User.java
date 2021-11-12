package com.sgifdbackend.demo.security.entities;

import com.sgifdbackend.demo.entitiesBase.EntityBaseBean;
import com.sgifdbackend.demo.enums.ActionOfFonctionnaliteName;
import com.sgifdbackend.demo.parametrage.entites.PTFBailleurFrs;
import com.sgifdbackend.demo.parametrage.entites.StructureBeneficiaire;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.NaturalId;
import javax.persistence.*;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 *
 * @author FADONOUGBO Emile
 */
@Entity
@Table(name = "compte", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "COM_LOGIN"
        }),
        @UniqueConstraint(columnNames = {
                "COM_EMAIL"
        })
})
@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
public class User extends EntityBaseBean implements Serializable{

    private static final long serialVersionUID = 1L;

    @Id
    @Basic(optional = false)
    @Column(name = "IDCOMPTE", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Basic(optional = false)
    @Column(name = "COM_LOGIN", nullable = false, length = 25, unique = true)
    private String username;

    @Basic(optional = false)
    @Column(name = "COM_FIRSTNAME", nullable = false)
    private String firstName;

    @Column(name = "COM_LASTNAME")
    private String lastName;

    @Column(name = "COM_TEL", unique = true)
    private String tel;

    /*@NaturalId*/
    @Column(name = "COM_EMAIL", unique = true)
    private String email;

    @JsonIgnore
    @Column(name = "COM_PASSWD")
    private String password;
    
    private String profession;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "compte_roles",
            joinColumns = @JoinColumn(name = "IDCOMPTE"),
            inverseJoinColumns = @JoinColumn(name = "IDROLE"))
    private Set<Role> roles = new HashSet<>();

    @OneToMany(mappedBy = "user")
    private List<AccreditatedUser> accreditatedUsers = new ArrayList<>();

    @ManyToMany
    private List<ModuleUser> moduleUsers  = new ArrayList<>();
    
    @ManyToOne
    private StructureBeneficiaire structureBeneficiaire;
    
    @ManyToOne
    private PTFBailleurFrs ptf;
    
    private Boolean accountStatus = false;

	@Column(columnDefinition = "boolean default true")
    private Boolean isFirstLogin = true;

    public User() {

    }

    public User(
    		Long id, String username, String firstName, String lastName, String tel, 
    		String email, String password,
			String profession, Set<Role> roles, 
			List<AccreditatedUser> accreditatedUsers, 
			List<ModuleUser> moduleUsers,
			StructureBeneficiaire structureBeneficiaire,
			PTFBailleurFrs ptf, Boolean accountStatus
			) {
		super();
		this.id = id;
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.tel = tel;
		this.email = email;
		this.profession = profession;
		this.password = password;
		this.roles = roles;
		this.accreditatedUsers = accreditatedUsers;
		this.moduleUsers = moduleUsers;
		this.structureBeneficiaire = structureBeneficiaire;
		this.ptf = ptf;
		this.accountStatus = accountStatus;
	}


    public User(Long id, String username, String firstName, String lastName, String tel, String email,
    		String profession, String password, Boolean accountStatus, StructureBeneficiaire structureBeneficiaire, Set<Role> roles) {
		super();
		this.id = id;
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.tel = tel;
		this.email = email;
		this.profession = profession;
		this.password = password;
		this.accountStatus = accountStatus;
		this.structureBeneficiaire = structureBeneficiaire;
		this.roles = roles;
	}


	public User(Long id, String username, String firstName, String lastName, String tel, String email,
			String profession, Set<Role> roles, List<AccreditatedUser> accreditatedUsers, List<ModuleUser> moduleUsers,
			StructureBeneficiaire structureBeneficiaire, PTFBailleurFrs ptf, Boolean accountStatus) {
		super();
		this.id = id;
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.tel = tel;
		this.email = email;
		this.profession = profession;
		this.roles = roles;
		this.accreditatedUsers = accreditatedUsers;
		this.moduleUsers = moduleUsers;
		this.structureBeneficiaire = structureBeneficiaire;
		this.ptf = ptf;
		this.accountStatus = accountStatus;
	}

	public User(String firstName, String username, String email, String password) {
        this.firstName = firstName;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public User(String username, String email, String password) {
//        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public List<AccreditatedUser> getAccreditatedUsers() {
		return accreditatedUsers;
	}

	public void setAccreditatedUsers(List<AccreditatedUser> accreditatedUsers) {
		this.accreditatedUsers = accreditatedUsers;
	}

	public StructureBeneficiaire getStructureBeneficiaire() {
		return structureBeneficiaire;
	}

	public void setStructureBeneficiaire(StructureBeneficiaire structureBeneficiaire) {
		this.structureBeneficiaire = structureBeneficiaire;
	}
	
	

	public PTFBailleurFrs getPtf() {
		return ptf;
	}



	public void setPtf(PTFBailleurFrs ptf) {
		this.ptf = ptf;
	}



	public List<ModuleUser> getModuleUsers() {
		return moduleUsers;
	}

	public void setModuleUsers(List<ModuleUser> moduleUsers) {
		this.moduleUsers = moduleUsers;
	}

	public Boolean getAccountStatus() {
		return accountStatus;
	}

	public void setAccountStatus(Boolean accountStatus) {
		this.accountStatus = accountStatus;
	}

	public String getProfession() {
		return profession;
	}

	public void setProfession(String profession) {
		this.profession = profession;
	}

	public Boolean getFirstLogin() {
		return isFirstLogin;
	}

	public void setFirstLogin(Boolean firstLogin) {
		isFirstLogin = firstLogin;
	}
}
