Ext.define('AM.controller.SouthSideController', {
    extend: 'Ext.app.Controller',
	
    models: ['Depense','Categorie','PieStat'],
	stores: ['DepenseStore','Stat','TreeStore','barStore'],
	views:['SouthSide.Grid','Windows.modifDepense'],
	
	init: function() {
		this.control({
			
			'#AjoutDepense' :{
				 click: function(){					
					Ext.create('AM.view.Windows.ajoutDepense').show();
					refrechStores();
				},			
			},
			
			'#ModifieDepense' :{
			
				click :	function(){			
		
					var grid = Ext.getCmp('grid');
					if (grid.getSelectionModel().hasSelection()) {
						console.log('-');
						var row = grid.getSelectionModel().getSelection()[0];
						console.log('--');
						var formPanel = Ext.create('AM.view.Windows.modifDepense');
						console.log('---')
						var form =formPanel.down('form');
						console.log('----');
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
									
								refresch();
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
			
			}
		
	});
	}
});
	
function refresch(){
	
		console.log(Ext.getStore('barStore').getProxy());
		Ext.getStore('DepenseStore').load();
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
		Ext.getStore('barStore').load();		
		
}