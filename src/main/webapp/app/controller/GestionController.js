Ext.define('AM.controller.GestionController', {
    extend: 'Ext.app.Controller',
	
    models: ['Depense','Categorie','PieStat'],
	stores: ['DepenseStore','CategorieStore','Stat','TreeStore','barStore'],
	views:['SouthSide.Grid','Windows.ajoutDepense' ,'CenterSide.pie','WestSide.CategorieTree','Windows.ajoutCategorie','NorthSide.North','CenterSide.centerContainer','CenterSide.barChart'],
	
	init: function() {
		this.control({
			'viewport > panel': {
				render: this.onPanelRendered
			},
			'#AjoutDepense' :{
				 click: function(){
					console.log('dddddd');
					Ext.create('AM.view.Windows.ajoutDepense').show();
				},
			
			},
			'#ModifieDepense' :{
			
				click :	function(){			
		
					var grid = Ext.getCmp('grid');
					if (grid.getSelectionModel().hasSelection()) {
					
						var row = grid.getSelectionModel().getSelection()[0];
						var formPanel = Ext.create('AM.view.Windows.modifDepense');
						var form =formPanel.down('form');
										
						console.log(formPanel.down('form').down('combo').value);
						console.log(formPanel.down('form').down('combo').valueField);
						
						form.getForm().findField('id').setValue(row.get('id'));
						form.getForm().findField('Somme').setValue(row.get('somme'));
						form.getForm().findField('description').setValue(row.get('description'));
						form.getForm().findField('date').setValue(row.get('date'));
						formPanel.down('form').down('combo').setValue(row.get('categorie')['id']);
						
						formPanel.show();				  
					}
					else
					{
						Ext.MessageBox.show({
						   title      : 'ERROR',
						   msg        : 'Vous devez selectionner une ligne pour modifier une depense',
						   width      : 500,
						   icon       : Ext.MessageBox.ERROR,
						   buttons: Ext.MessageBox.OK,
						});
					}				
				}
			},
			'#SupprimerDepense' : {
			
				click : function(){	
				
					var grid = Ext.getCmp('grid');
					if (grid.getSelectionModel().hasSelection()) {
					
					   var row = grid.getSelectionModel().getSelection()[0];
					   var idDepense = row.get('id');
					   
					   Ext.Ajax.request({
						   url: 'DepenseController/deleteSpending.action',
						   method: '',   
							params: {
								'idDepense' : idDepense
							},
						   success: function(response, opts) {
							Ext.MessageBox.show({
							   title      : 'INFO',
							   msg        : 'Depense supprimée avec succès',
							   width      : 300,
							   icon       : Ext.MessageBox.INFO,
							   buttons: Ext.MessageBox.OK,
							});						 		
								refrechStores();
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
						   msg        : 'Vous devez selectionner une ligne pour supprimer une depense',
						   width      : 500,
						   icon       : Ext.MessageBox.ERROR,
						   buttons: Ext.MessageBox.OK,
						});
					}								
				}
			
			},
			'#ajCat' : {
			
				click : function()
				{
					var form = Ext.getCmp('AjoutCategorie').down('form').getForm();
						form.submit({
							clientValidation: true,
							url: 'DepenseController/addCategorie.action',
							success: function(form, action) {
									
								 Ext.getStore('TreeStore').load();
								 refrechStores();
							},
							failure: function(form, action) {						
							}
					});
				}						
			},
			'#AjoutCategorie' :{
				click : function(){
					Ext.create('AM.view.Windows.ajoutCategorie').show();		
				}
		
			},
			'#SupprimerCategorie' :{
				click : function(){
					var tree =Ext.getCmp('SupprimerCategorie').up().up();
					console.log(tree);
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
			},
			'#ViewConfigcategorieTree' : {
				
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
			
		});
	},
	
	onPanelRendered: function() {
		console.log('The panel was rendered');
    }
});
	
function refrechStores(){
		Ext.getStore('DepenseStore').load();
		Ext.getStore('CategorieStore').load();
		Ext.getStore('Stat').load();
		Ext.getStore('TreeStore').load();		
		Ext.getStore('barStore').load();	
}