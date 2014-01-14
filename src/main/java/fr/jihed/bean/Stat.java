package fr.jihed.bean;

import org.codehaus.jackson.annotate.JsonAutoDetect;

/**
 * 
 * @author Jihed.Mechergui
 * Hold statistical data to display with Extjs
 */
@JsonAutoDetect
public class Stat {
	
	private String name;
	private double ammount;
		
	public Stat() {
		super();
	}
	public Stat(String name, double ammount) {
		super();
		this.name = name;
		this.ammount = ammount;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public double getAmmount() {
		return ammount;
	}
	public void setAmmount(double ammount) {
		this.ammount = ammount;
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Stat other = (Stat) obj;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		return true;
	}
	@Override
	public String toString() {
		return "Stat [name=" + name + ", ammount=" + ammount + "]";
	}
}
