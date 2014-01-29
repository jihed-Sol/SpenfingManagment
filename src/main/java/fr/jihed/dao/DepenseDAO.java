package fr.jihed.dao;

import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import fr.jihed.bean.Depense;

/**
 * 
 * @author Jihed.Mechergui
 *
 */
@SuppressWarnings("unchecked")
@Repository(IDepenseDAO.DAO_NAME)
@Transactional(propagation=Propagation.REQUIRED)
public class DepenseDAO implements IDepenseDAO {

	//Init logger
	private static Log logger = LogFactory.getLog(DepenseDAO.class);

	//inject Entity manager bean from spring container	
	@PersistenceContext
	private EntityManager entity;

	@Override
	public boolean create(Depense o) {

		try {
			entity.persist(o);
		} catch (Exception e) {
			logger.error(e.getMessage());
			return false;
		}
		return true;
	}

	@Override
	public boolean remove(Depense o) {

		try {
			entity.remove(o);			
		} catch (Exception e) {
			logger.error(e.getMessage());
			return false;
		}
		return true;
	}

	@Override
	public boolean update(Depense o) {

		try {
			
			Depense o1= entity.find(Depense.class, o.getId());
			
			o1.setDate(o.getDate());
			o1.setSomme(o.getSomme());
			o1.setCategorie(o.getCategorie());		
			o1.setDescription(o.getDescription());
			
			entity.merge(o1);
			
		} catch (Exception e) {
			logger.error(e.getMessage());
			return false;
		}
		return true;
	}

	
	@Override
	public List<Depense> getAll() {

		try {
			
			return entity.createQuery("select d from Depense d").getResultList();
			
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
		return null;
	}

	@Override
	public Depense getById(Long i) {

		try {
			 Depense depense= (Depense) entity.createQuery("select d from Depense d where d.id =:id")
					.setParameter("id", i)
					.getSingleResult();
			 return depense;
			
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
		return null;
	}

	@Override
	public List<Depense> getAll(Date startDate, Date endDate) {
		try {
			return entity.createQuery("select d from Depense d where d.date between :startDate and :endDate ")
					.setParameter("startDate", startDate)
					.setParameter("endDate", endDate)
					.getResultList();
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
		return null;
	}

	@Override
	public List<Depense> getAll(Date startDate, Date endDate, Long categorie) {
		try {
				
			return entity.createQuery("select d from Depense d where d.date between :startDate and :endDate  and d.categorie.id =:categorie")
					.setParameter("startDate", startDate)
					.setParameter("endDate", endDate)
					.setParameter("categorie", categorie)
					.getResultList();
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
		return null;
	}
	

	@Override
	public List<Depense> getAll(Date startDate, Date endDate, List<Long> categorie) {
		try {
				
			return entity.createQuery("select d from Depense d where d.date between :startDate and :endDate  and d.categorie.id in :categorie")
					.setParameter("startDate", startDate)
					.setParameter("endDate", endDate)
					.setParameter("categorie", categorie)
					.getResultList();
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
		return null;
	}
	
	@Override
	public List<Depense> getAll(List<Long> categorie) {
		try {
				
			return entity.createQuery("select d from Depense d where d.date between :startDate and :endDate  and d.categorie.id in :categorie")				
					.setParameter("categorie", categorie)
					.getResultList();
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
		return null;
	}


	@Override
	public List<Depense> getAll(Long categorie) {
		try {
				
			return entity.createQuery("select d from Depense d where d.categorie.id =:categorie")
					.setParameter("categorie", categorie)
					.getResultList();
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
		return null;
	}
}
