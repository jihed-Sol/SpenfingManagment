var startDate=new Date();
var endDate=new Date();
var labelDate=new Date();

var fDay = Ext.Date.format( new Date(startDate.getFullYear(), startDate.getMonth(), 1) ,'d');
var lDay = Ext.Date.format( new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0) ,'d');

Ext.define('AM.view.NorthSide.North',{
	extend  : 'Ext.panel.Panel',
    height: 30,
	alias :  'widget.North',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
	requires : [
		'Ext.Date.patterns.*'
	],
    renderTo: document.body,
    items: [{
        xtype: 'button',
        text : 'Reset',
		id : 'reset',
		listeners :{			
			click: function() {		
			startDate=new Date();
			endDate=new Date();
			
			var firstDay = Ext.Date.format( new Date(startDate.getFullYear(), startDate.getMonth(), 1) ,'d');
			var lastDay = Ext.Date.format( new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0) ,'d');			
			this.up().down('label').setText(Ext.Date.format( startDate ,'M '+firstDay+'-'+lastDay+', Y'));
		
			}
		}
      
    },{
        xtype: 'button',
		id:'1_mois',
        text : '1 mois',				
        flex: 1
    },{
        xtype: 'button',
        text : '3 mois',
		id:'3_mois',		
        flex: 1
    },{
        xtype: 'button',
        text : '6 mois',
		id:'6_mois',			
        flex: 1
    },{
        xtype: 'button',
        text : '9 mois',
		id:'9_mois',				
        flex: 1
    },{
        xtype: 'button',
        text : '12 mois',
		id:'12_mois',					
        flex: 1
    },{
        xtype: 'button',
        text : '24 mois',
		id:'24_mois',					
        flex: 1
    },{   
		id :'NorthPeriodLabel',
		xtype : 'label',
		cls : 'label',
		text :Ext.Date.format( startDate ,'M '+fDay+'-'+lDay+', Y'),
		flex: 1
    },{
		id : 'previous',
		xtype: 'button',	
		text :'<<',
		
		
	},{
		id :  'next',
		xtype: 'button',	
		text :'>>',		
		
	}]
});
