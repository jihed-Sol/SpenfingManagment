package fr.jihed.bean;


import java.util.List;

import org.codehaus.jackson.annotate.JsonAutoDetect;

/**
 * @author Jihed.Mechergui
 * Hold data for Tree Extjs component
 */
@JsonAutoDetect
public class TreeNode {
	
	private String id;
	private String name;
	private String text;
	boolean leaf;
	List<TreeNode>children;
	
	public TreeNode() {
		super();
	}
		
	public TreeNode(String id, String name, boolean leaf) {
		super();
		this.id = id;
		this.name = name;
		this.leaf = leaf;
	}
	


	public TreeNode(String id, String name, String text, boolean leaf,
			List<TreeNode> children) {
		super();
		this.id = id;
		this.name = name;
		this.text = text;
		this.leaf = leaf;
		this.children = children;
	}

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public boolean isLeaf() {
		return leaf;
	}
	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public List<TreeNode> getChildren() {
		return children;
	}

	public void setChildren(List<TreeNode> children) {
		this.children = children;
	}

	@Override
	public String toString() {
		return "TreeNode [id=" + id + ", name=" + name + ", text=" + text
				+ ", leaf=" + leaf + ", childrens=" + children + "]";
	}
	
	
}
