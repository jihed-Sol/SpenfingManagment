package fr.jihed.controller;

import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import fr.jihed.bean.Categorie;
import fr.jihed.dao.DepenseDAO;
import fr.jihed.service.IGestion;

@Controller
public class CategorieController {
	
	//Init logger
	private static Log logger = LogFactory.getLog(DepenseDAO.class);

	@Autowired
	@Qualifier(IGestion.SERVICE_NAME)
	IGestion gestion;
			
	@RequestMapping(value="/DepenseController/getCategorie.action")
	public @ResponseBody Map<String,? extends Object> getSpending()
	{
		logger.info("Call getSpending");
		
		return gestion.listerCategorie();
	}
	
	@RequestMapping(value="/DepenseController/addCategorie.action")
	public @ResponseBody Map<String,? extends Object> addCategorie(Categorie categorie)
	{
		logger.info("Categorie : "+categorie);
				
		return gestion.ajoutCategorie(categorie);
	}
	
	@RequestMapping(value="/DepenseController/modifieCategorie.action")
	public @ResponseBody Map<String,? extends Object> modifieCategorie(Categorie categorie)
	{
		logger.info("Categorie : "+categorie);
				
		return gestion.modifieCategorie(categorie);
	}
	
	
	@RequestMapping(value="/DepenseController/getcategorieTree.action")
	public @ResponseBody Map<String,? extends Object> categorieTree()
	{
		logger.info("Call getSpending");
		
		return gestion.getCategorieTree();
	}
	
	@RequestMapping(value="/DepenseController/setParentCategorie.action")
	public @ResponseBody Map<String,? extends Object> setParentCategorie(Long id,Long parentId)
	{
		logger.info("Call getSpending");
		
		Categorie categorie=	gestion.getCategorieById(id);
		categorie.setParentId(parentId);
	
		return 	gestion.modifieCategorie(categorie);
	}
	
	@RequestMapping(value="/DepenseController/deleteCategorie.action")
	public @ResponseBody Map<String,? extends Object> deleteCategorie(Long id)
	{
		logger.info("Categorie Id : "+id);
			
		return 	gestion.supprimerCategorie(id);
	}
	
	
}
