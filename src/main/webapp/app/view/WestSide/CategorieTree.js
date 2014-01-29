Ext.define('AM.view.WestSide.CategorieTree' ,{
	extend : 'Ext.tree.Panel',
	id: 'cc',
    title: 'Categories',	
	alias: 'widget.trees',    
    layout: 'fit',
	store: 'TreeStore',
	useArrows : true,
    rootVisible: false,
	requires: [
        'Ext.tree.plugin.TreeViewDragDrop'
    ],
	viewConfig: {
		id :'ViewConfigcategorieTree',
		plugins: { 
			ptype: 'treeviewdragdrop',			
        }
	},
	tbar: [{
		id :'AjoutCategorie',
		text: 'Ajout categorie',
		icon: 'http://icons.iconarchive.com/icons/hopstarter/button/16/Button-Add-icon.png'
		
	},{
		id :'SupprimerCategorie',
		text: 'Supprimer Categorie',
		icon: 'http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/16/Actions-edit-delete-icon.png'		
	}]
});