package fr.jihed.dao;

import java.util.List;
/**
 * 
 * @author Jihed.Mechergui
 * Generic Interface for CRUD Tools
 * @param <O>
 * @param <I>
 */
public interface GenericDao<O,I> {
	/**
	 * Create Object
	 * @param o
	 * @return
	 */
	boolean create(O o);
	/**
	 * Update an existing Object
	 * @param o
	 * @return
	 */
	boolean update(O o);
	/**
	 * Remove an existing object
	 * @param i
	 * @return
	 */
	boolean remove(O o);
	/**
	 *  Get all existing object
	 * @return
	 */
	List<O>getAll();
	/**
	 * Get Object by id
	 * @param i
	 * @return
	 */
	O getById(I i);
}
