package fr.jihed.controller;

import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ibm.icu.text.SimpleDateFormat;

import fr.jihed.bean.Depense;
import fr.jihed.dao.DepenseDAO;
import fr.jihed.service.IGestion;

@Controller
public class DepenseController {
	
	//Init logger
	private static Log logger = LogFactory.getLog(DepenseDAO.class);

	@Autowired
	@Qualifier(IGestion.SERVICE_NAME)
	IGestion gestion;
			
	@RequestMapping(value="/DepenseController/getAllSpending.action",method={RequestMethod.POST})
	public @ResponseBody Map<String,? extends Object> getSpending(String startDate,String endDate,String categorie)
	{
		try {
			
			logger.info("Call getSpending");								
			logger.info(startDate);
			logger.info(endDate);
			logger.info(categorie);
			
			SimpleDateFormat format=new SimpleDateFormat("yyyy-MM-dd");
			
			return	gestion.listerDepense(format.parse(startDate),format.parse(endDate),categorie);
			
		} catch (Exception e) {
			logger.error(e.getMessage());
			return getModelMapError(e.getMessage());
		}
			
	}
	
	@RequestMapping(value="/DepenseController/addSpending.action")
	public @ResponseBody Map<String,? extends Object> addSpending(Depense depense,long idCategorie)
	{
		logger.info("Depense : "+depense);
		logger.info("idCategorie : "+idCategorie);
		
		return gestion.ajoutDepense(depense, idCategorie);
	}
	
	@RequestMapping(value="/DepenseController/deleteSpending.action")
	public @ResponseBody Map<String,? extends Object> deleteSpending(long idDepense)
	{
		logger.info("Id spending to delete is : "+idDepense);
				
		return gestion.supprimerdepense(idDepense);
	}
	
	@RequestMapping(value="/DepenseController/updateSpending.action")
	public @ResponseBody Map<String,? extends Object> modifieSpending(Depense depense, Long idCategorie)
	{
	
		logger.info("Spending to update "+depense);
		logger.info("Id categorie : "+idCategorie);
		return gestion.modifieDepense(depense,idCategorie);
	}
	
	
	@RequestMapping(value="/DepenseController/statistique.action")
	public @ResponseBody Map<String,? extends Object> stat(String startDate,String endDate) throws ParseException
	{
		SimpleDateFormat format=new SimpleDateFormat("yyyy-MM-dd");
		if((startDate==null)||(endDate==null))	
			return gestion.statistiqueDepense();
		else
			return gestion.statistiqueDepense(format.parse(startDate), format.parse(endDate));
	}
	
	@RequestMapping(value="/DepenseController/statistiqueBar.action")
	public @ResponseBody Map<String,? extends Object> statBar(String startDate,String endDate) throws ParseException
	{
		SimpleDateFormat format=new SimpleDateFormat("yyyy-MM-dd");
		if((startDate==null)||(endDate==null))	
			return gestion.statistiqueDepense();
		else
			return gestion.statistiqueDepenseBar(format.parse(startDate), format.parse(endDate));
	}

	private Map<String, Object> getModelMapError(String msg) {

		Map<String, Object> modelMap = new HashMap<String, Object>(2);
		modelMap.put("message", msg);
		modelMap.put("success", false);

		return modelMap;
	}

}