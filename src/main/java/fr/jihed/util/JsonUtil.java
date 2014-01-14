package fr.jihed.util;

import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Component;


@Component
@SuppressWarnings("unchecked")
public class JsonUtil {
	
	/**
	 * Get list of Object from request.
	 * @param t
	 * @param data
	 * @return
	 */
	public <T> List<T>  getContactsFromRequest(Class<T> t,Object data){

		List<T> list;

		//it is an array - have to cast to array object
		if (data.toString().indexOf('[') > -1){

			list = getListFromJSON(t,data);

		} else { //it is only one object - cast to object/bean

			T object = getObjectFromJSON(t,data);
			
			list = new ArrayList<T>();
			list.add(object);
		}

		return list;
	}

	/**
	 *  Transform json data format into object
	 * @param t
	 * @param data
	 * @return
	 */
	private <T> T getObjectFromJSON(Class<T> t,Object data){
		JSONObject jsonObject = JSONObject.fromObject(data);
		
		T object =  (T) JSONObject.toBean(jsonObject, t);
		return object;
	}

	/**
	 * Transform json data format into list of objects
	 * @param t
	 * @param data
	 * @return
	 */
	private <T> List<T> getListFromJSON(Class<T> t,Object data){
		JSONArray jsonArray = JSONArray.fromObject(data);
		List<T> list = (List<T>) JSONArray.toCollection(jsonArray,t);
		return list;
	}
}
