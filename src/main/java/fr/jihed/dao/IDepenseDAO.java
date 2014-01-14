package fr.jihed.dao;

import java.util.Date;
import java.util.List;

import fr.jihed.bean.Depense;

/** 
 * @author Jihed.Mechergui
 *
 */
public interface IDepenseDAO extends GenericDao<Depense, Long>{

	static String DAO_NAME="DAO_DEPENSE";
	@Override
	public boolean create(Depense o);
	@Override
	public boolean remove(Depense o);
	@Override
	public boolean update(Depense o);
	@Override
	public List<Depense> getAll();
	@Override
	public Depense getById(Long i);
	//Get spending between two dates
	List<Depense> getAll(Date startDate, Date endDate);
	//Get spending not only between two dates but by categorie too
	List<Depense> getAll(Date startDate, Date endDate,Long categorie);
	//Get all spending
	public List<Depense> getAll(Long categorie);
}
