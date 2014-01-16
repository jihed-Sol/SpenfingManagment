Ext.define('AM.view.Windows.ajoutCategorie' ,{
	extend : 'Ext.window.Window',
    title: 'Ajout Categorie',
	
	stores: ['DepenseStore','CategorieStore'],
	alias: 'widget.ajoutCategorie',
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
            fieldLabel: 'Categorie',
            name: 'name',
            allowBlank: false,
            tooltip: 'Enter description'
        },{
            fieldLabel: 'Date creation',
            name: 'creationDate',
            xtype: 'datefield',
            tooltip: 'Entrer date'
        },{
			xtype: 'combo',
			fieldLabel: 'Groupe Categorie',
			name: 'parentId',
			displayField: 'name',
			valueField: 'id',
			store:	'CategorieStore'
		}],
		buttons: [{
            text: 'Save',
			id :'ajCat',		
        },{
            text: 'Cancel',
            handler: function() {
			this.up('form').getForm().reset();
				
            }
        }]
    }],		
	
});

function refrechStores(){
		Ext.getStore('DepenseStore').load();
		Ext.getStore('CategorieStore').load();
		Ext.getStore('Stat').load();
		Ext.getStore('TreeStore').load();	
	}