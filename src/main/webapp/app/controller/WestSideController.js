Ext.define('AM.controller.WestSideController', {
    extend: 'Ext.app.Controller',
	
      models: ['Depense','Categorie','PieStat','AM.model.Series'],
	stores: ['DepenseStore','RootCategorieStore','Stat','TreeStore','barStore','SeriesStore','SubCategorieStore'],
	views:['Windows.ajoutDepense' ,'CenterSide.pie','WestSide.CategorieTree','Windows.ajoutCategorie','NorthSide.North','CenterSide.centerContainer','CenterSide.barChart','CenterSide.Courbes'],
		
	init: function() {
		this.control({
			'viewport > panel': {
				render: this.onPanelRendered
			},		
			'#ajCat' : {
			
				click : function()
				{
					var form = Ext.getCmp('AjCat').down('form').getForm();
						form.submit({
							clientValidation: true,
							url: 'DepenseController/addCategorie.action',
							success: function(form, action) {									
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
							refrechStores();
					   },
					   failure: function(response, opts) {
						  console.log('server-side failure with status code ' + response.status);
					   }
					});
				},
				
				itemclick : function( record, item, index, e, eOpts )
				{
					var proxyTab=Ext.getStore('DepenseStore').getProxy();
					proxyTab.extraParams['categorie']=item['data'].id;
					Ext.getStore('DepenseStore').setProxy(proxyTab);
					Ext.getStore('DepenseStore').load();	

				    var proxyTab1=Ext.getStore('Stat').getProxy();
					proxyTab1.extraParams['categorie']=item['data'].id;
					Ext.getStore('Stat').setProxy(proxyTab1);
					Ext.getStore('Stat').load({
						callback: function(records, operation, success) {
							var totalSpending=0;
							for( var i=0;i<records.length;i++)
							{
								
								totalSpending =totalSpending+ records[i].data.ammount;			
								
							}
							Ext.getCmp('centerContainer').setTitle('Depense Total : '+totalSpending);
						
						}
					});
					
					var proxyTab2=Ext.getStore('barStore').getProxy();
					proxyTab2.extraParams['categorie']=item['data'].id;
					Ext.getStore('barStore').setProxy(proxyTab2);
					Ext.getStore('barStore').load();	
								
				}
			
			
			},
			
		});
	},
	
	onPanelRendered: function() {
		console.log('The panel was rendered');
    }
});
	
function refrechStores(){
		
		Ext.getStore('DepenseStore').load();
		Ext.getStore('CategorieStore').load();
		Ext.getStore('Stat').load({
			callback: function(records, operation, success) {
				for( var i=0;i<records.length;i++)
				{
					var totalSpending=0;
					totalSpending =totalSpending+ records[i].data.ammount;			
					Ext.getCmp('centerContainer').setTitle('Depense Total : '+totalSpending);
				}
			
			}
		});
		Ext.getStore('TreeStore').load();		
		Ext.getStore('barStore').load();	
}