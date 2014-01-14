package fr.jihed.dao.test;


import java.text.ParseException;
import java.util.Date;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;

import com.ibm.icu.text.SimpleDateFormat;

import fr.jihed.bean.Categorie;
import fr.jihed.bean.Depense;
import fr.jihed.dao.ICategorieDAO;
import fr.jihed.dao.IDepenseDAO;
import fr.jihed.service.IGestion;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:depense-ui.beans.xml" })
@TransactionConfiguration(defaultRollback = false)
public class SpendingTest {

	//Init logger
	private static Log logger = LogFactory.getLog(SpendingTest.class);
	
	@Autowired
	IDepenseDAO depenseDAO;
	
	@Autowired
	ICategorieDAO categorieDAO;
	
	@Autowired
	@Qualifier(IGestion.SERVICE_NAME)
	IGestion gestion;
	
	@Test	
	@Ignore
	public void getDepense() {
	
		try {
			
			Depense d=depenseDAO.getById(1L);
			logger.info(d);
		} catch (Exception e) {
			// TODO: handle exception
			logger.error(e.getMessage());
		}
	}
	@Test
	@Ignore
	public void createDepense() {
		
		try {
			
			Depense depense=new Depense(151D, new Date(), "course");			
			logger.info(depenseDAO.create(depense));
		} catch (Exception e) {
			// TODO: handle exception
			logger.error(e.getMessage());
		}
	}
	@Test
	@Ignore
	public void createCategorie()
	{
		try {			
			Categorie categorie=new Categorie();
			categorie.setName("Alimentation");	
			categorie.setParentId(2L);
			logger.info(categorieDAO.create(categorie));
			
		} catch (Exception e) {
			// TODO: handle exception
			logger.error(e.getMessage());
		}
	}
	@Test
	@Ignore
	public void updateCategorie()
	{
		try {	
						
			Categorie categorie=categorieDAO.getById(1L);
			logger.info(categorie);
			Depense depense=new Depense(161D, new Date(), "chocolat");
			depense.setCategorie(categorie);
			depense.setId(1L);
			
			logger.info(depenseDAO.update(depense));
			
		} catch (Exception e) {
			// TODO: handle exception
			logger.error(e.getMessage());
		}
	}
	@Test
	@Ignore
	public void ajoutDepense() {
		
		try {
			
			Depense depense=new Depense(157.5D, new Date(), "geneve");	
		    logger.info(gestion.ajoutDepense(depense, 2L));
		    
			} catch (Exception e) {
			// TODO: handle exception
			logger.error(e.getMessage());
		}
	}
	@Test
	@Ignore	
	public void stat() throws ParseException
	{
		SimpleDateFormat format=new SimpleDateFormat("yyyy-MM-dd");
		logger.info(gestion.statistiqueDepense(format.parse("2013-01-01"), format.parse("2014-01-31")));
	}
	
	@Test
	@Ignore	
	public void getAll() throws ParseException
	{
		logger.info(depenseDAO.getAll(7L));
	}
	
	@Test
	@Ignore	
	public void getAllCategorie() throws ParseException
	{
		logger.info(gestion.listerCategorie());
	}
	

	@Test
    @Ignore	
	public void supprimerDepense() throws ParseException
	{
		logger.info(gestion.supprimerdepense(2L));
	}
	
	@Test
	@Ignore
	public void getCategorie()
	{
		gestion.getCategorieTree();
	}
	
	@Test
	public void testStatBar() throws ParseException
	{
		SimpleDateFormat format=new SimpleDateFormat("yyyy-MM-dd");
		Date date1=format.parse("2014-01-01");
		Date date2=format.parse("2032-12-31");
		
		logger.info(gestion.statistiqueDepenseBar(date1, date2));
	}
}
