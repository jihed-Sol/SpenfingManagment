Ext.define('AM.view.Windows.ajoutDepense' ,{
	extend : 'Ext.window.Window',
    title: 'Ajout Depense',
	stores: ['DepenseStore','CategorieStore','barStore','Stat'],
	alias: 'widget.ajoutDepense',
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
            fieldLabel: 'Somme',
            name: 'Somme',
            allowBlank: false,
            tooltip: 'Entrer somme',
			validator: function(val) {
				console.log('ff');
				if(isNaN(parseFloat(val)))
					return 'Somme doit être un numérique';
				else
					return true;
				 
			}
        },{
            fieldLabel: 'Description',
            name: 'description',
            allowBlank: false,
            tooltip: 'Enter description'
        },{
            fieldLabel: 'date',
            name: 'date',
            xtype: 'datefield',
			allowBlank: false,
            tooltip: 'Entrer date',
			value: new Date()
        },{
			xtype: 'combo',
			fieldLabel: 'Categorie',
			name: 'idCategorie',
			displayField: 'name',
			valueField: 'id',
			store:	'SubCategorieStore',
			allowBlank: false,
		}],
		buttons: [{
            text: 'Save',
            handler: function() {
			 var form = this.up('form').getForm();

			   // Normally we would submit the form to the server here and handle the response...
				form.submit({
					clientValidation: true,
					url: 'DepenseController/addSpending.action',
					
					success: function(form, action) {
						refrech();        
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

function refrech(){
	
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