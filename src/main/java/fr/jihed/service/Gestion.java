package fr.jihed.service;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
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

	// Init logger
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
						
			List<Categorie> categories=categorieDAO.getRootCategorie();			
			categories=getOnlyALLSubCategories(categories,new ArrayList<Categorie>());
						
			return getMap(categories);
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

			else if ((dateDebut == null) || (dateFin == null)) {
				List<Categorie> cats = categorieDAO.getChildCategorie(Long
						.parseLong(categorie));

				if (cats.size() == 0)
					return getMap(depenseDAO.getAll(Long.parseLong(categorie)));
				else {

					return getMap(depenseDAO.getAll(getAllSubCategorieID(
							Long.parseLong(categorie), new ArrayList<Long>())));
				}
			} else {
				List<Categorie> cats = categorieDAO.getChildCategorie(Long
						.parseLong(categorie));

				if (cats.size() == 0)
					return getMap(depenseDAO.getAll(dateDebut, dateFin,
							Long.parseLong(categorie)));
				else
					return getMap(depenseDAO.getAll(
							dateDebut,
							dateFin,
							getAllSubCategorieID(Long.parseLong(categorie),
									new ArrayList<Long>())));
			}
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
			List<Categorie> categories = categorieDAO.getRootCategorie();
			List<Depense> depenses = depenseDAO.getAll(dateDebut, dateFin);

			for (Categorie categorie : categories) {

				stats.add(new Stat(categorie.getName(), 0));
			}

			for (Depense depense : depenses) {

				int index = categorieIndex(stats, depense.getCategorie().getId(),-1);

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
	public Map<String, ? extends Object> statistiqueDepense(Date dateDebut,
			Date dateFin, String categorie) {

		try {

			List<Stat> stats = new ArrayList<Stat>();

			// Map<String,Double>stats=new HashMap<String, Double>();

			if ((categorie == null) || (categorie.isEmpty())) {
				List<Categorie> categories = categorieDAO.getRootCategorie();
				List<Depense> depenses = depenseDAO.getAll(dateDebut, dateFin);

				for (Categorie cat : categories) {

					stats.add(new Stat(cat.getName(), 0));
				}

				for (Depense depense : depenses) {

					int index = categorieIndex(stats, depense.getCategorie().getId(),-1);

					Stat stat = stats.get(index);
					stat.setAmmount(stat.getAmmount() + depense.getSomme());
					stats.set(index, stat);
				}
			} else {
				List<Categorie> categories = getSubCategorie(
						Long.parseLong(categorie), new ArrayList<Categorie>());
				if (categories.size() == 0) {

					Categorie cat = categorieDAO.getById(Long
							.parseLong(categorie));
					List<Depense> depenses = depenseDAO.getAll(dateDebut,
							dateFin, Long.parseLong(categorie));

					stats.add(new Stat(cat.getName(), 0));

					for (Depense depense : depenses) {

						int index = categorieIndex(stats,depense.getCategorie().getId(), -1);

						Stat stat = stats.get(index);
						stat.setAmmount(stat.getAmmount() + depense.getSomme());
						stats.set(index, stat);
					}
				} else {
					List<Categorie> cats = getSubCategorie(Long.parseLong(categorie),new ArrayList<Categorie>());
					
					List<Depense> depenses = depenseDAO.getAll(
							dateDebut,
							dateFin,
							getAllSubCategorieID(Long.parseLong(categorie),
									new ArrayList<Long>()));
					for (Categorie cat : cats) {
						stats.add(new Stat(cat.getName(), 0));
					}
					logger.info(cats);

					for (Depense depense : depenses) {

						int index = categorieIndex(stats,depense.getCategorie().getId(), -1);

						Stat stat = stats.get(index);
						stat.setAmmount(stat.getAmmount() + depense.getSomme());
						stats.set(index, stat);
					}
				}

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

			List<String> mois = getInterval(dateDebut, dateFin);
			SimpleDateFormat format = new SimpleDateFormat("MMM-yyyy");
			List<Stat> stats = new ArrayList<Stat>();
			List<Depense> depenses = depenseDAO.getAll(dateDebut, dateFin);
			logger.info(mois);
			for (String serie : mois) {
				stats.add(new Stat(serie, 0));
			}

			for (Depense depense : depenses) {
				int index = stats.indexOf(new Stat(format.format(depense
						.getDate()), 0));
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
			Date dateFin, String categorie) {

		try {

			List<Stat> stats = new ArrayList<Stat>();
			List<String> mois = getInterval(dateDebut, dateFin);
			SimpleDateFormat format = new SimpleDateFormat("MMM-yyyy");

			for (String serie : mois) {
				stats.add(new Stat(serie, 0));
			}

			if ((categorie == null) || (categorie.isEmpty())) {

				List<Depense> depenses = depenseDAO.getAll(dateDebut, dateFin);

				for (Depense depense : depenses) {

					int index = stats.indexOf(new Stat(format.format(depense
							.getDate()), 0));

					Stat stat = stats.get(index);
					stat.setAmmount(stat.getAmmount() + depense.getSomme());
					stats.set(index, stat);
				}
			} else {
				
				List<Depense> depenses=null;
				if(!getAllSubCategorieID(Long.parseLong(categorie),new ArrayList<Long>()).isEmpty())
					 depenses = depenseDAO.getAll(	dateDebut,dateFin,getAllSubCategorieID(Long.parseLong(categorie),
								new ArrayList<Long>()));
				else
					 depenses = depenseDAO.getAll(	dateDebut,dateFin,Long.parseLong(categorie));
				for (Depense depense : depenses) {

					int index = stats.indexOf(new Stat(format.format(depense
							.getDate()), 0));
					Stat stat = stats.get(index);
					stat.setAmmount(stat.getAmmount() + depense.getSomme());
					stats.set(index, stat);
				}

			}

			return getMap(stats);
		} catch (Exception e) {
			logger.error(e.getMessage());
			return getModelMapError(e.getMessage());
		}
	}

	public Map<String, ? extends Object> statistiqueDepenseSeries(
			Date dateDebut, Date dateFin) {

		try {

			Map<String, Map<String, Double>> map = new HashMap<String, Map<String, Double>>();
			List<String> mois = getInterval(dateDebut, dateFin);
			List<Categorie> categories = categorieDAO.getAll();
			SimpleDateFormat format = new SimpleDateFormat("MMM-yyyy");

			List<Depense> depenses = depenseDAO.getAll(dateDebut, dateFin);

			for (String serie : mois) {

				map.put(serie, new HashMap<String, Double>());
				for (Categorie categorie : categories) {
					map.get(serie).put(categorie.getName(), 0D);
				}

			}

			for (Depense depense : depenses) {
				String key = format.format(depense.getDate());
				String catName = depense.getCategorie().getName();
				map.get(key).put(catName,
						map.get(key).get(catName) + depense.getSomme());

			}

			return getMap(getJsonFormat(map));
		} catch (Exception e) {
			logger.error(e.getMessage());
			return getModelMapError(e.getMessage());
		}
	}

	private List<Map<String, Object>> getJsonFormat(
			Map<String, Map<String, Double>> map) {

		Iterator<String> it = map.keySet().iterator();

		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		while (it.hasNext()) {
			String key = it.next();
			Map<String, Object> map1 = new HashMap<String, Object>();
			map1.put("mois", key);

			Iterator<String> it1 = map.get(key).keySet().iterator();

			while (it1.hasNext()) {
				String key1 = it1.next();
				map1.put(key1, map.get(key).get(key1));

			}

			list.add(map1);

		}

		return list;
	}

	@Override
	public Map<String, ? extends Object> statistiqueDepense() {

		try {

			List<Stat> stats = new ArrayList<Stat>();

			// Map<String,Double>stats=new HashMap<String, Double>();
			List<Categorie> categories = categorieDAO.getRootCategorie();
			List<Depense> depenses = depenseDAO.getAll();

			for (Categorie categorie : categories) {

				stats.add(new Stat(categorie.getName(), 0));
			}

			for (Depense depense : depenses) {

				int index = categorieIndex(stats, depense.getCategorie().getId(), -1);

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

		//List<Categorie> categories = categorieDAO.getAll();
		
		List<Categorie> categories=categorieDAO.getRootCategorie();
		
		categories=sortCategorie(categories,new ArrayList<Categorie>());
		
		
		List<TreeNode> list = new ArrayList<TreeNode>();

		for (Categorie categorie : categories) {

			addTreeNode(list, categorie);
		}
	
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

	@SuppressWarnings("unused")
	private Map<String, Object> getJsonMessage(String msg) {

		Map<String, Object> modelMap = new HashMap<String, Object>(2);
		modelMap.put("data", msg);
		modelMap.put("success", true);

		return modelMap;
	}

	private List<TreeNode> addTreeNode(List<TreeNode> tree, Categorie categorie) {

		if (tree == null) {
			// init hashMap
			tree = new ArrayList<TreeNode>();
			tree.add(toTreeNode(categorie));
		} else {
			if (categorie.getParentId() == -1) 
				tree.add(toTreeNode(categorie));
			else 
				addToParent(tree, categorie);			
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

	private List<String> getInterval(Date date1, Date date2)
			throws ParseException {

		Date date = new Date(date1.getTime());
		List<String> mois = new ArrayList<String>();
		SimpleDateFormat format1 = new SimpleDateFormat("MMM-yyyy");
		SortedMap<String, Double> map = new TreeMap<String, Double>();

		long dayDiff = (date2.getTime() - date.getTime())
				/ (24 * 60 * 60 * 1000);
		long time = date.getTime();

		for (int i = 1; i <= dayDiff; i++) {

			date = new Date(time + ((long) (24 * 60 * 60 * 1000) * (long) i));

			if (!map.containsKey(format1.format(date))) {
				map.put(format1.format(date), 0D);
				mois.add(format1.format(date));

			}
		}
		return mois;

	}

	public List<Categorie> getSubCategorie(Long id,
			List<Categorie> categories) {

		List<Categorie> list = categorieDAO.getChildCategorie(id);
		
		return list;
	}

	public List<Long> getAllSubCategorieID(Long id, List<Long> ids) {

		List<Categorie> list = categorieDAO.getChildCategorie(id);

		for (Categorie categorie : list) {
			ids.add(categorie.getId());
		}

		for (Categorie categorie : list) {

			getAllSubCategorieID(categorie.getId(), ids);
		}
		return ids;
	}
	public int categorieIndex(List<Stat>list,long id,int index)
	{				
		Categorie categorie=categorieDAO.getById(id);
		
		if(list.indexOf(new Stat(categorie.getName(),0))!=-1)			
			index= list.indexOf(new Stat(categorie.getName(),0));				
		else		
			index=categorieIndex(list,categorie.getParentId(),index);
		
		
		return index;
	}
	
	
	private List<Categorie> sortCategorie(List<Categorie>categories,List<Categorie>sortedCategories)
	{
		
		for (Categorie categorie : categories) {
			
			List<Categorie>childs=categorieDAO.getChildCategorie(categorie.getId());
			if(childs.size()!=0)
			{
				 sortedCategories.add(categorie);
				 sortCategorie(childs,sortedCategories);
			}
			else			
				sortedCategories.add(categorie);
			
		}
		return sortedCategories;
	}
	
	private List<Categorie> getOnlyALLSubCategories(List<Categorie>categories,List<Categorie>sortedCategories)
	{
		
		for (Categorie categorie : categories) {
			
			List<Categorie>childs=categorieDAO.getChildCategorie(categorie.getId());
			if(childs.size()!=0)
			{
				
				getOnlyALLSubCategories(childs,sortedCategories);
			}
			else			
				sortedCategories.add(categorie);
			
		}
		return sortedCategories;
	}
	
	public Map<String, Object> getOnlyRootCategories(){
		
		try {
			
			List<Categorie> categories=categorieDAO.getRootCategorie();			
			categories=getOnlyRootCategories(categories,new ArrayList<Categorie>());
						
			return getMap(categories);
		} catch (Exception e) {
			logger.error(e.getMessage());
			return getModelMapError(e.getMessage());
		}				
	}
	
	private List<Categorie> getOnlyRootCategories(List<Categorie>categories,List<Categorie>sortedCategories)
	{
		for (Categorie categorie : categories) {	
						
			List<Categorie>childs=categorieDAO.getChildCategorie(categorie.getId());
					
			if(childs.size()!=0)
			{
				sortedCategories.add(categorie);
				sortedCategories=getOnlyRootCategories(childs,sortedCategories);
			}
			else if(categorie.getParentId()==-1)
			{
				sortedCategories.add(categorie);
			}
			
		}
		return sortedCategories;
	}
}
