Ext.define('AM.view.CategorieTree' ,{
	extend : 'Ext.tree.Panel',
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
		plugins: { 
			ptype: 'treeviewdragdrop',			
        },
		listeners: {
				drop: function(node, data, overModel, dropPosition, dropFunction, eOpts ) {               
				var id = data['records'][0]['data']['id'];
				var parentId = data['records'][0]['data']['parentId'];
				if(parentId == 'root')
					parentId=-1;
				Ext.Ajax.request({
					   url: 'DepenseController/setParentCategorie.action',
					   method: '',   
					    params: {
							'id' 		: id,
							'parentId' 	: parentId
						},
					   success: function(response, opts) {
						Ext.MessageBox.show({
						   title      : 'INFO',
						   msg        : 'Categorie a jour',
						   width      : 300,
						   icon       : Ext.MessageBox.INFO,
						   buttons: Ext.MessageBox.OK,
						});						 		
							
					   },
					   failure: function(response, opts) {
						  console.log('server-side failure with status code ' + response.status);
					   }
					});
            }
		}
	},
	tbar: [{
		text: 'Ajout categorie',
		icon: 'http://icons.iconarchive.com/icons/hopstarter/button/16/Button-Add-icon.png',
		handler : function(){
			Ext.create('AM.view.ajoutCategorie').show();
		}
	},{
		text: 'Supprimer Categorie',
		icon: 'http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/16/Actions-edit-delete-icon.png',
		handler : function(){
			var tree =this.up('toolbar').up();
			if (tree.getSelectionModel().hasSelection())
			{
				var item = tree.getSelectionModel().getSelection()[0];
				var categorieId =item['data']['id'];
				Ext.Ajax.request({
					   url: 'DepenseController/deleteCategorie.action',
					   method: '',   
					    params: {
							'id' 		: categorieId
						},
					   success: function(response, opts) {
							console.log(response);
						   if(Ext.decode(response['responseText'])['success']==true)
						   {
								Ext.MessageBox.show({
								   title      : 'INFO',
								   msg        : 'Categorie supprimée avec succès',
								   width      : 300,
								   icon       : Ext.MessageBox.INFO,
								   buttons: Ext.MessageBox.OK,
								});		
								refrechStores();
						   
						   }
						   else
						   {					   
								Ext.MessageBox.show({
								   title      : 'ERROR',
								   msg        : Ext.decode(response['responseText'])['message'],
								   width      : 500,
								   icon       : Ext.MessageBox.ERROR,
								   buttons: Ext.MessageBox.OK,
								});							
						   }
						},
					   failure: function(response, opts) {
						  console.log('server-side failure with status code ' + response.status);
					   }
					});
				
			}
			else
			{
				Ext.MessageBox.show({
				   title      : 'ERROR',
				   msg        : 'Vous devez selectionner une categorie pour supprimer une categorie',
				   width      : 500,
				   icon       : Ext.MessageBox.ERROR,
				   buttons: Ext.MessageBox.OK,
				});
			}
			
				  
		}	
	}]
});


function refrechStores(){
	Ext.getStore('DepenseStore').load();
	Ext.getStore('CategorieStore').load();
	Ext.getStore('Stat').load();
	Ext.getStore('TreeStore').load();	
}