Ext.define('AM.view.centerContainer' ,{
	extend: 'Ext.panel.Panel',	
	alias: 'widget.centerContainer',	
	id :  'centerContainer',
	title :'Depense',
	layout: {
        type: 'hbox',
        align: 'stretch'
    },
	initComponent: function() {
		
	    this.callParent(arguments);
    },
	defaults: {
        bodyStyle: 'padding:20px'
    },
	  items: [{
        title: 'Cell A content',
		xtype : 'pie',		
        flex: 1
    },{
        title: 'Cell B content',
		xtype : 'barChart',
		flex : 1,
		layout: {
        type: 'vbox',
        align: 'stretch'
		},
		items :[{
			xtype :'panel',
			title :'panel 1',
			flex : 1
		},{
			xtype :'panel',
			title :'panel 2',
			flex : 1
		}],
		
    }],
	  
});