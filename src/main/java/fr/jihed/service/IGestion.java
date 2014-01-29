package fr.jihed.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import fr.jihed.bean.Categorie;
import fr.jihed.bean.Depense;
import fr.jihed.bean.Stat;

/**
 * 
 * @author Jihed.Mechergui
 *
 */
public interface IGestion {

	static String SERVICE_NAME = "SERVICE_GESTION";

	// Spending Management
	Map<String, Object> ajoutDepense(Depense depense, Long idCategorie);

	Map<String, Object> modifieDepense(Depense depense, Long idCategorie);

	Map<String, Object> supprimerdepense(Long idDepense);

	// Categorie management
	Map<String, Object> ajoutCategorie(Categorie categorie);

	Map<String, Object> modifieCategorie(Categorie categorie);

	Map<String, Object> supprimerCategorie(Long idCategorie);

	// Display data
	Map<String, Object> listerDepense();

	Map<String, Object> listerDepense(Date dateDebut, Date dateFin,
			String categorie);

	Map<String, ? extends Object> statistiqueDepense(Date dateDebut,
			Date dateFin);
	public Map<String, ? extends Object> statistiqueDepense(Date dateDebut,
			Date dateFin,String categorie);
	Map<String, ? extends Object> statistiqueDepenseBar(Date dateDebut,
			Date dateFin);
	Map<String, ? extends Object> statistiqueDepenseSeries(Date dateDebut,
			Date dateFin);

	Map<String, ? extends Object> statistiqueDepense();

	Map<String, Object> listerCategorie();

	Map<String, Object> getCategorieTree();

	Categorie getCategorieById(Long id);
	
	List<Categorie>getSubCategorie(Long id,List<Categorie>categories);
	List<Long>getAllSubCategorieID(Long id,List<Long>ids);

	Map<String, ? extends Object> statistiqueDepenseBar(Date dateDebut,
			Date dateFin,String categorie);
	
	int categorieIndex(List<Stat>list,long id,int index);
	Map<String, Object> getOnlyRootCategories();
}
