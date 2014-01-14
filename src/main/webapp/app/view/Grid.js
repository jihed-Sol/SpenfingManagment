Ext.require([
    'Ext.window.MessageBox',
    'Ext.tip.*'
]);
Ext.define('AM.view.Grid' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.grid',
	id :'grid',
    title: 'Depenses',
	store :'DepenseStore',    
	columns : [
			{header: 'Id', dataIndex: 'id', flex: 1,hidden :true},
            {header: 'Description',  dataIndex: 'description',  flex: 1},
            {header: 'Somme', dataIndex: 'somme', flex: 1},
			{header: 'Date', dataIndex: 'date', renderer :Ext.util.Format.dateRenderer('Y-m-d'), flex: 1},
			//Display complex type data
			{header: 'Categorie',dataIndex :'categorie', xtype: 'templatecolumn', tpl :'{categorie.name}',flex: 1}
        ],
	bbar : [{
		xtype :'label',
		defaultAlign : 'right',
		text : 'Depense total est  : 45233$'
	}],
	tbar: [{
		text: 'Ajout depense',
		icon: 'http://icons.iconarchive.com/icons/hopstarter/button/16/Button-Add-icon.png',
		handler : function() {
				Ext.create('AM.view.ajoutDepense').show();
			}
		},{
		text: 'Modifier depense',
		icon: 'http://icons.iconarchive.com/icons/designcontest/ecommerce-business/16/edit-icon.png',
		handler : function() {
		
				var grid = this.up('grid');
				if (grid.getSelectionModel().hasSelection()) {
				
					var row = grid.getSelectionModel().getSelection()[0];
					var formPanel = Ext.create('AM.view.modifDepense');
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
		},{
			text: 'Supprimer depense',
			icon: 'http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/16/Actions-edit-delete-icon.png',
			handler : function() {
			
				var grid = this.up('grid');
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
		}]

});


			
function refrechStores(){
		Ext.getStore('DepenseStore').load();
		Ext.getStore('CategorieStore').load();
		Ext.getStore('Stat').load();
		Ext.getStore('TreeStore').load();		
		Ext.getStore('barStore').load();	
}