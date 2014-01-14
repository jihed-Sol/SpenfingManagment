package fr.jihed.bean;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.codehaus.jackson.annotate.JsonAutoDetect;

/**
 * 
 * @author Jihed.Mechergui
 *
 */
@Entity
@JsonAutoDetect
public class Depense implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	private	Double somme;
	@ManyToOne
	private Categorie categorie;
	@Temporal(TemporalType.DATE)
	private Date date;
	private String description;

	public Depense() {
		super();
	}
	
	public Depense(Double somme, Date date, String description) {
		super();
		this.somme = somme;
		this.date = date;
		this.description = description;
	}

	public Depense(Long id, Double somme, Date date, String description) {
		super();
		this.id = id;
		this.somme = somme;
		this.date = date;
		this.description = description;
	}
	
	public Depense(Double somme, Categorie categorie, Date date,
			String description) {
		super();
		this.somme = somme;
		this.categorie = categorie;
		this.date = date;
		this.description = description;
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Double getSomme() {
		return somme;
	}
	public void setSomme(Double somme) {
		this.somme = somme;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	public Categorie getCategorie() {
		return categorie;
	}

	public void setCategorie(Categorie categorie) {
		this.categorie = categorie;
	}

	@Override
	public String toString() {
		return "Depense [id=" + id + ", somme=" + somme + ", categorie="
				+ categorie + ", date=" + date + ", description=" + description
				+ "]";
	}
		
}
