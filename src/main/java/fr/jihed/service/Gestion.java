package fr.jihed.service;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.SortedMap;
import java.util.TreeMap;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ibm.icu.text.SimpleDateFormat;
import fr.jihed.bean.Categorie;
import fr.jihed.bean.Depense;
import fr.jihed.bean.Stat;
import fr.jihed.bean.TreeNode;
import fr.jihed.dao.ICategorieDAO;
import fr.jihed.dao.IDepenseDAO;

@Service(IGestion.SERVICE_NAME)
@Transactional(propagation = Propagation.REQUIRED)
public class Gestion implements IGestion {

	//Init logger
	private static Log logger = LogFactory.getLog(Gestion.class);

	@Autowired
	@Qualifier(ICategorieDAO.DAO_NAME)
	ICategorieDAO categorieDAO;

	@Autowired
	@Qualifier(IDepenseDAO.DAO_NAME)
	IDepenseDAO depenseDAO;

	@Override
	public Map<String, Object> ajoutDepense(Depense depense, Long idCategorie) {

		try {

			Categorie categorie = categorieDAO.getById(idCategorie);
			depense.setCategorie(categorie);
			boolean res = depenseDAO.create(depense);

			if (res)
				return getMap(depenseDAO.getAll());
			else
				return getModelMapError("Problem occured when calling {ajoutDepense}");

		} catch (Exception e) {
			logger.error(e.getMessage());
			return getModelMapError(e.getMessage());
		}
	}

	@Override
	public Map<String, Object> supprimerdepense(Long idDepense) {

		try {

			Depense depense = depenseDAO.getById(idDepense);
			boolean res = depenseDAO.remove(depense);

			if (res)
				return getMap(depenseDAO.getAll());
			else
				return getModelMapError("Problem occured when calling {supprimerdepense}");

		} catch (Exception e) {
			logger.error(e.getMessage());
			return getModelMapError(e.getMessage());
		}
	}

	@Override
	public Map<String, Object> modifieDepense(Depense depense, Long idCategorie) {

		try {

			Categorie categorie = categorieDAO.getById(idCategorie);
			depense.setCategorie(categorie);

			boolean res = depenseDAO.update(depense);

			if (res)
				return getMap(depenseDAO.getAll());
			else
				return getModelMapError("Problem occured when calling {modifieDepense}");

		} catch (Exception e) {
			logger.error(e.getMessage());
			return getModelMapError(e.getMessage());
		}
	}

	@Override
	public Map<String, Object> ajoutCategorie(Categorie categorie) {
		try {

			boolean res = categorieDAO.create(categorie);

			if (res)
				return getMap(categorieDAO.getAll());
			else
				return getModelMapError("Problem occured when calling {ajoutCategorie}");

		} catch (Exception e) {
			logger.error(e.getMessage());
			return getModelMapError(e.getMessage());
		}
	}

	@Override
	public Map<String, Object> supprimerCategorie(Long idCategorie) {
		try {

			Categorie categorie = categorieDAO.getById(idCategorie);

			List<Depense> depenses = depenseDAO.getAll(categorie.getId());

			if ((depenses != null) && (depenses.size() != 0))
				return getModelMapError("Vous devez supprimer tous les depenses associées d'abord");

			boolean res = categorieDAO.remove(categorie);

			if (res)
				return getMap(categorieDAO.getAll());
			else
				return getModelMapError("Problem occured when calling {supprimerCategorie}");

		} catch (Exception e) {
			logger.error(e.getMessage());
			return getModelMapError(e.getMessage());
		}
	}

	@Override
	public Map<String, Object> modifieCategorie(Categorie categorie) {
		try {

			boolean res = categorieDAO.update(categorie);

			if (res)
				return getMap(categorieDAO.getAll());
			else
				return getModelMapError("Problem occured when calling {modifieCategorie}");

		} catch (Exception e) {
			logger.error(e.getMessage());
			return getModelMapError(e.getMessage());
		}
	}

	@Override
	public Map<String, Object> listerDepense() {

		try {

			return getMap(depenseDAO.getAll());
		} catch (Exception e) {
			logger.error(e.getMessage());
			return getModelMapError(e.getMessage());
		}
	}

	@Override
	public Map<String, Object> listerCategorie() {

		try {

			return getMap(categorieDAO.getAll());
		} catch (Exception e) {
			logger.error(e.getMessage());
			return getModelMapError(e.getMessage());
		}
	}

	@Override
	public Map<String, Object> listerDepense(Date dateDebut, Date dateFin,
			String categorie) {
		try {

			if ((categorie == null) || (categorie.isEmpty())) {
				if ((dateDebut == null) || (dateFin == null))
					return getMap(depenseDAO.getAll());
				else
					return getMap(depenseDAO.getAll(dateDebut, dateFin));
			}

			else if ((dateDebut == null) || (dateFin == null))
				return getMap(depenseDAO.getAll(Long.parseLong(categorie)));
			else
				return getMap(depenseDAO.getAll(dateDebut, dateFin,
						Long.parseLong(categorie)));
		} catch (Exception e) {
			logger.error(e.getMessage());
			return getModelMapError(e.getMessage());
		}
	}

	@Override
	public Map<String, ? extends Object> statistiqueDepense(Date dateDebut,
			Date dateFin) {

		try {

			List<Stat> stats = new ArrayList<Stat>();

			// Map<String,Double>stats=new HashMap<String, Double>();
			List<Categorie> categories = categorieDAO.getAll();
			List<Depense> depenses = depenseDAO.getAll(dateDebut, dateFin);

			for (Categorie categorie : categories) {
				stats.add(new Stat(categorie.getName(), 0));
			}

			for (Depense depense : depenses) {

				int index = stats.indexOf(new Stat(depense.getCategorie()
						.getName(), 0));

				Stat stat = stats.get(index);
				stat.setAmmount(stat.getAmmount() + depense.getSomme());
				stats.set(index, stat);
			}

			return getMap(stats);
		} catch (Exception e) {
			logger.error(e.getMessage());
			return getModelMapError(e.getMessage());
		}
	}

	@Override
	public Map<String, ? extends Object> statistiqueDepenseBar(Date dateDebut,
			Date dateFin) {

		try {

			List<String> mois =getInterval(dateDebut,dateFin);
		 	SimpleDateFormat format = new SimpleDateFormat("MMM-yyyy");
		 	List<Stat> stats = new ArrayList<Stat>();
			List<Depense> depenses = depenseDAO.getAll(dateDebut, dateFin);
			logger.info(mois);
			for (String serie : mois) {
				stats.add(new Stat(serie, 0));
			}

			for (Depense depense : depenses) {
				int index = stats.indexOf(new Stat(format.format(depense.getDate()), 0));
				Stat stat = stats.get(index);
				stat.setAmmount(stat.getAmmount() + depense.getSomme());
				stats.set(index, stat);
			}

			return getMap(stats);
		} catch (Exception e) {
			logger.error(e.getMessage());
			return getModelMapError(e.getMessage());
		}
	}

	@Override
	public Map<String, ? extends Object> statistiqueDepense() {

		try {

			List<Stat> stats = new ArrayList<Stat>();

			// Map<String,Double>stats=new HashMap<String, Double>();
			List<Categorie> categories = categorieDAO.getAll();
			List<Depense> depenses = depenseDAO.getAll();

			for (Categorie categorie : categories) {
				stats.add(new Stat(categorie.getName(), 0));
			}

			for (Depense depense : depenses) {

				int index = stats.indexOf(new Stat(depense.getCategorie()
						.getName(), 0));

				Stat stat = stats.get(index);
				stat.setAmmount(stat.getAmmount() + depense.getSomme());
				stats.set(index, stat);
			}

			return getMap(stats);
		} catch (Exception e) {
			logger.error(e.getMessage());
			return getModelMapError(e.getMessage());
		}
	}
	
	@Override
	public Categorie getCategorieById(Long id) {
		// TODO Auto-generated method stub
		return categorieDAO.getById(id);
	}

	@Override
	public Map<String, Object> getCategorieTree() {
		// TODO Auto-generated method stub

		List<Categorie> categories = categorieDAO.getAll();
		List<TreeNode> list = new ArrayList<TreeNode>();

		for (Categorie categorie : categories) {
			addTreeNode(list, categorie);
		}
		logger.info(list);
		return getTreeMap(list);
	}

	/**
	 * Generates modelMap to return in the modelAndView
	 * 
	 * @param contacts
	 * @return
	 */
	private Map<String, Object> getMap(List<? extends Object> list) {

		Map<String, Object> modelMap = new HashMap<String, Object>(3);
		modelMap.put("total", list.size());
		modelMap.put("data", list);
		modelMap.put("success", true);

		return modelMap;
	}

	/**
	 * Generates modelMap to return in the modelAndView
	 * 
	 * @param contacts
	 * @return
	 */
	private Map<String, Object> getTreeMap(List<? extends Object> list) {

		Map<String, Object> modelMap = new HashMap<String, Object>(3);
		modelMap.put("children", list);
		modelMap.put("success", true);

		return modelMap;
	}

	/**
	 * Generates modelMap to return in the modelAndView in case of exception
	 * 
	 * @param msg
	 *            message
	 * @return
	 */
	private Map<String, Object> getModelMapError(String msg) {

		Map<String, Object> modelMap = new HashMap<String, Object>(2);
		modelMap.put("message", msg);
		modelMap.put("success", false);

		return modelMap;
	}
	
	private List<TreeNode> addTreeNode(List<TreeNode> tree, Categorie categorie) {

		if (tree == null) {
			// init hashMap
			tree = new ArrayList<TreeNode>();
			tree.add(toTreeNode(categorie));
		} else {
			if (categorie.getParentId() == -1) {
				tree.add(toTreeNode(categorie));
			} else {
				addToParent(tree, categorie);
			}
		}

		return tree;
	}

	private TreeNode toTreeNode(Categorie categorie) {

		TreeNode node = new TreeNode();
		// Setting
		node.setLeaf(false);
		node.setName(categorie.getName());
		node.setText(categorie.getName());
		node.setId(categorie.getId().toString());
		node.setChildren(new ArrayList<TreeNode>());

		return node;
	}

	private void addToParent(List<TreeNode> treeNodes, Categorie categorie) {

		for (TreeNode treeNode : treeNodes) {

			if (treeNode.getId().toString()
					.compareTo(categorie.getParentId().toString()) == 0) {
				treeNode.getChildren().add(toTreeNode(categorie));
			} else {
				addToParent(treeNode.getChildren(), categorie);
			}
		}
	}

	private List<String> getInterval(Date date1,Date date2) throws ParseException {
		
	
		Date date=new Date(date1.getTime());
		List<String>mois=new ArrayList<String>();
		SimpleDateFormat format1 = new SimpleDateFormat("MMM-yyyy");						
		SortedMap<String, Double>  map = new TreeMap<String, Double> ();
			
		long dayDiff=(date2.getTime() - date.getTime())/ (24 * 60 * 60 * 1000);				
		long time=date.getTime();
		
		for (int i = 1; i <=dayDiff; i++) {
			
			date=new Date(time + ((long)(24 * 60 * 60 * 1000)*(long) i));			
			
			if (!map.containsKey(format1.format(date))) {
				map.put(format1.format(date), 0D);
				mois.add(format1.format(date));
				
			}
		}
		return mois;

	}
	
}


