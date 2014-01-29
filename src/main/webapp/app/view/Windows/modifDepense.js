Ext.define('AM.view.Windows.modifDepense' ,{
    extend : 'Ext.window.Window',
    title: 'Modifie Depense',
    stores: ['DepenseStore','SubCategorieStore'],
    alias: 'widget.modifDepense',
    height: 200,
    width: 400,
    layout: 'fit',
    items: [{  
        xtype: 'form',
		layout: 'form',
		collapsible: true,	
		bodyPadding: '5 5 0',	
        fieldDefaults: {
            msgTarget: 'side',
            labelWidth: 75
        },   
        defaultType: 'textfield',
		items: [{
		
			name : 'id',
			hidden: true		
		},{
            fieldLabel: 'Somme',
			id :'modifSomme',
            name: 'Somme',
            allowBlank: false,
            tooltip: 'Entrer somme'
        },{
            fieldLabel: 'Description',
            name: 'description',
            allowBlank: false,
            tooltip: 'Enter description'
        },{
            fieldLabel: 'date',
            name: 'date',
            xtype: 'datefield',
            tooltip: 'Entrer date'
        },{
			xtype: 'combo',
			fieldLabel: 'Categorie',
			name: 'idCategorie',
			displayField: 'name',
			valueField: 'id',
			store:	'SubCategorieStore'
		}],
	buttons: [{
            text: 'Save',
            handler: function() {
			 var form = this.up('form').getForm();

			   // Normally we would submit the form to the server here and handle the response...
				form.submit({
					clientValidation: true,
					url: 'DepenseController/updateSpending.action',
					success: function(form, action) {
							
						var grid =Ext.getCmp('grid');
						refrechStore();         
					},
					failure: function(form, action) {						
					}
				});
            }
        },{
            text: 'Cancel',
            handler: function() {
			this.up('form').getForm().reset();
				
            }
        }]
    }],
	
});
function refrechStore (){
	
	Ext.getStore('DepenseStore').load();
	Ext.getStore('Stat').load();
	Ext.getStore('TreeStore').load();	
	Ext.getStore('barStore').load();
}
