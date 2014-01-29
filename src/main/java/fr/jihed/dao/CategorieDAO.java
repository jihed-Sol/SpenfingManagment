package fr.jihed.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import fr.jihed.bean.Categorie;
/**
 * 
 * @author Jihed.Mechergui
 *
 */
@SuppressWarnings("unchecked")
@Repository(ICategorieDAO.DAO_NAME)
@Transactional(propagation = Propagation.REQUIRED)
public class CategorieDAO implements ICategorieDAO {

	//Init logger
	private static Log logger = LogFactory.getLog(DepenseDAO.class);

	//inject Entity manager bean from spring container
	@PersistenceContext
	EntityManager entity;

	@Override
	public boolean create(Categorie o) {

		try {
			
			if(o.getParentId()==null)
				o.setParentId(-1L);
			entity.persist(o);
		} catch (Exception e) {
			logger.error(e.getMessage());
			return false;
		}
		return true;
	}

	@Override
	public boolean update(Categorie o) {
		try {

			Categorie o1 = entity.find(Categorie.class, o.getId());
			//set data
			o1.setName(o.getName());		
			o1.setParentId(o.getParentId());
			o1.setCreationDate(o.getCreationDate());			
			//update object
			entity.merge(o);
		} catch (Exception e) {
			logger.error(e.getMessage());
			return false;
		}
		return true;
	}

	@Override
	public boolean remove(Categorie o) {
		try {
			entity.remove(o);
		} catch (Exception e) {
			logger.error(e.getMessage());
			return false;
		}
		return true;
	}

	@Override
	public Categorie getById(Long i) {
		try {
			return (Categorie) entity.createQuery("select c from Categorie c where c.id =:id")
					.setParameter("id", i)
					.getSingleResult();
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
	
		return null;
	}

	@Override
	public List<Categorie> getAll() {
		try {
			logger.info("Call getALL Categgorie");
			return entity.createQuery("select c from Categorie c order by c.parentId ASC")
					.getResultList();

		} catch (Exception e) {
			logger.error(e.getMessage());
		}
		return null;
	}
	
	
	@Override
	public List<Categorie> getChildCategorie(Long id) {
		try {
						
			return entity.createQuery("select c from Categorie c where c.parentId =:id")
					.setParameter("id",id)
					.getResultList();

		} catch (Exception e) {
			logger.error(e.getMessage());
		}
		return null;
	}
	
	@Override
	public List<Categorie> getRootCategorie() {
		try {
						
			return entity.createQuery("select c from Categorie c where c.parentId =-1")
				
					.getResultList();

		} catch (Exception e) {
			logger.error(e.getMessage());
		}
		return null;
	}
	
}
