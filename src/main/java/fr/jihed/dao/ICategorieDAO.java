package fr.jihed.dao;

import java.util.List;

import fr.jihed.bean.Categorie;

/**
 * 
 * @author Jihed.Mechergui
 *
 */
public interface ICategorieDAO extends GenericDao<Categorie, Long>{
	
	static String DAO_NAME="DAO_CATEGORIE";
	@Override
	public boolean create(Categorie o);
	@Override
	public boolean update(Categorie o);
	@Override
	public boolean remove(Categorie o) ;
	@Override
	public Categorie getById(Long i);
	@Override
	public List<Categorie> getAll();

}
