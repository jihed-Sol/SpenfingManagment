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
		listeners :{			
			click: function() {
			endDate=new Date();
			endDate.setMilliseconds(startDate.getMilliseconds());
			
			var firstDay = Ext.Date.format( new Date(startDate.getFullYear(), startDate.getMonth(), 1) ,'d');
			var lastDay = Ext.Date.format( new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0) ,'d');
			var label ='';
			if(endDate.getYear()==startDate.getYear())
			{
				label = Ext.Date.format(startDate,'M')+' - '+Ext.Date.format(endDate,'M')+' '+Ext.Date.format(startDate,'Y');
			}
			else
			{	
				label = Ext.Date.format(startDate,'M')+' '+Ext.Date.format(startDate,'Y')+' - '+Ext.Date.format(endDate,'M')+' '+Ext.Date.format(endDate,'Y');		
			}
			this.up().down('label').setText(label);
			updateButtonStatus(this);
			loadStore(startDate,endDate);
			}
		},	
		
        flex: 1
    },{
        xtype: 'button',
        text : '3 mois',
		id:'3_mois',
		listeners :{			
			click: function() {
			
			endDate=new Date();
			endDate.setMilliseconds(startDate.getMilliseconds()+ 2 * 30 * 24 *60 *60 *1000);
			
			var label ='';
			console.log(startDate+' -- '+endDate);
			if(endDate.getYear()==startDate.getYear())
			{
				label = Ext.Date.format(startDate,'M')+' - '+Ext.Date.format(endDate,'M')+' '+Ext.Date.format(startDate,'Y');
			}
			else
			{	
				label = Ext.Date.format(startDate,'M')+' '+Ext.Date.format(startDate,'Y')+' - '+Ext.Date.format(endDate,'M')+' '+Ext.Date.format(endDate,'Y');		
			}
			this.up().down('label').setText(label);
			updateButtonStatus(this);
			loadStore(startDate,endDate);
			}
		},		
        flex: 1
    },{
        xtype: 'button',
        text : '6 mois',
		id:'6_mois',
			listeners :{			
			click: function() {
			
			endDate=new Date();
			endDate.setMilliseconds(startDate.getMilliseconds()+ 5 * 30 * 24 *60 *60 *1000);
			
			console.log(startDate+' -- '+endDate);
			
			var label ='';
			
			if(endDate.getYear()==startDate.getYear())
			{
				label = Ext.Date.format(startDate,'M')+' - '+Ext.Date.format(endDate,'M')+' '+Ext.Date.format(startDate,'Y');
			}
			else
			{	
				label = Ext.Date.format(startDate,'M')+' '+Ext.Date.format(startDate,'Y')+' - '+Ext.Date.format(endDate,'M')+' '+Ext.Date.format(endDate,'Y');		
			}
			this.up().down('label').setText(label);
			
			updateButtonStatus(this);
			loadStore(startDate,endDate);
			}
		},		
        flex: 1
    },{
        xtype: 'button',
        text : '9 mois',
		id:'9_mois',
			listeners :{			
			click: function() {
			endDate=new Date();
			endDate.setMilliseconds(startDate.getMilliseconds()+ 8 * 30 * 24 *60 *60 *1000);
			
			var label ='';
			if(endDate.getYear()==startDate.getYear())
			{
				label = Ext.Date.format(startDate,'M')+' - '+Ext.Date.format(endDate,'M')+' '+Ext.Date.format(startDate,'Y');
			}
			else
			{	
				label = Ext.Date.format(startDate,'M')+' '+Ext.Date.format(startDate,'Y')+' - '+Ext.Date.format(endDate,'M')+' '+Ext.Date.format(endDate,'Y');		
			}
			this.up().down('label').setText(label);
			
			updateButtonStatus(this);
			loadStore(startDate,endDate)
			}
		},		
	
        flex: 1
    },{
        xtype: 'button',
        text : '12 mois',
		id:'12_mois',
			listeners :{			
			click: function() {
			endDate=new Date();
			endDate.setMilliseconds(startDate.getMilliseconds()+ 11 * 30 * 24 *60 *60 *1000);
			
			var label ='';
			if(endDate.getYear()==startDate.getYear())
			{
				label = Ext.Date.format(startDate,'M')+' - '+Ext.Date.format(endDate,'M')+' '+Ext.Date.format(startDate,'Y');
			}
			else
			{	
				label = Ext.Date.format(startDate,'M')+' '+Ext.Date.format(startDate,'Y')+' - '+Ext.Date.format(endDate,'M')+' '+Ext.Date.format(endDate,'Y');		
			}
			this.up().down('label').setText(label);
			
			updateButtonStatus(this);
			loadStore(startDate,endDate);
			}
		},		
		
        flex: 1
    },{
        xtype: 'button',
        text : '24 mois',
		id:'24_mois',
			listeners :{			
			click: function() {
				endDate=new Date();
				endDate.setMilliseconds(startDate.getMilliseconds()+ 23 * 30 * 24 *60 *60 *1000);
				
				var firstDay = Ext.Date.format( new Date(startDate.getFullYear(), startDate.getMonth(), 1) ,'d');
				var lastDay = Ext.Date.format( new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0) ,'d');
				var label ='';
				if(endDate.getYear()==startDate.getYear())
				{
					label = Ext.Date.format(startDate,'M')+' - '+Ext.Date.format(endDate,'M')+' '+Ext.Date.format(startDate,'Y');
				}
				else
				{	
					label = Ext.Date.format(startDate,'M')+' '+Ext.Date.format(startDate,'Y')+' - '+Ext.Date.format(endDate,'M')+' '+Ext.Date.format(endDate,'Y');		
				}
				this.up().down('label').setText(label);
				updateButtonStatus(this);
			}
		},		
		
        flex: 1
    },{       
		xtype : 'label',
		text :Ext.Date.format( startDate ,'M '+fDay+'-'+lDay+', Y'),
		width : '200'
    },{
		xtype: 'button',	
		text :'<<',
		listeners :{			
			click: function() {				
				
				startDate.setMilliseconds(endDate.getMilliseconds());
			
				endDate.setMilliseconds(startDate.getMilliseconds()- getActivatedButton(this) * 30 * 24 *60 *60 *1000);
				
				var label ='';
				if(endDate.getYear()==startDate.getYear())
				{
					label = Ext.Date.format(startDate,'M')+' - '+Ext.Date.format(endDate,'M')+' '+Ext.Date.format(startDate,'Y');
				}
				else
				{	
					label = Ext.Date.format(startDate,'M')+' '+Ext.Date.format(startDate,'Y')+' - '+Ext.Date.format(endDate,'M')+' '+Ext.Date.format(endDate,'Y');		
				}
							
				this.up().down('label').setText(label);
				loadStore(startDate,endDate);
					
			}
		}
		
	},{
		xtype: 'button',	
		text :'>>',
		listeners :{			
			click: function() {							
				
				startDate.setMilliseconds(endDate.getMilliseconds());
				
				endDate.setMilliseconds(startDate.getMilliseconds()+ getActivatedButton(this) * 30 * 24 *60 *60 *1000);
				
				var label ='';
				if(endDate.getYear()==startDate.getYear())
				{
					label = Ext.Date.format(startDate,'M')+' - '+Ext.Date.format(endDate,'M')+' '+Ext.Date.format(startDate,'Y');
				}
				else
				{	
					label = Ext.Date.format(startDate,'M')+' '+Ext.Date.format(startDate,'Y')+' - '+Ext.Date.format(endDate,'M')+' '+Ext.Date.format(endDate,'Y');		
				}
		
				this.up().down('label').setText(label);			

				loadStore(startDate,endDate);
			}
		}			
	}]
});

function  updateButtonStatus(obj)
{	
	var buttonTitle =obj.getText();
	obj.setDisabled(true);
	
	switch(buttonTitle)
	{
		case '1 mois':
			obj.up().down('#24_mois').setDisabled(false);
			obj.up().down('#6_mois').setDisabled(false);
			obj.up().down('#9_mois').setDisabled(false);
			obj.up().down('#12_mois').setDisabled(false);			
			obj.up().down('#3_mois').setDisabled(false);
			break;
		case '3 mois':
			obj.up().down('#1_mois').setDisabled(false);
			obj.up().down('#6_mois').setDisabled(false);
			obj.up().down('#9_mois').setDisabled(false);
			obj.up().down('#12_mois').setDisabled(false);			
			obj.up().down('#24_mois').setDisabled(false);
			break;
		case '6 mois':
			obj.up().down('#1_mois').setDisabled(false);
			obj.up().down('#24_mois').setDisabled(false);
			obj.up().down('#9_mois').setDisabled(false);
			obj.up().down('#12_mois').setDisabled(false);			
			obj.up().down('#3_mois').setDisabled(false);
			break;
		case '9 mois':
			obj.up().down('#1_mois').setDisabled(false);
			obj.up().down('#6_mois').setDisabled(false);
			obj.up().down('#24_mois').setDisabled(false);
			obj.up().down('#12_mois').setDisabled(false);			
			obj.up().down('#3_mois').setDisabled(false);
			break;
		case '12 mois':
			obj.up().down('#1_mois').setDisabled(false);
			obj.up().down('#6_mois').setDisabled(false);
			obj.up().down('#9_mois').setDisabled(false);
			obj.up().down('#24_mois').setDisabled(false);			
			obj.up().down('#3_mois').setDisabled(false);
			break;
		case '24 mois':
			obj.up().down('#1_mois').setDisabled(false);
			obj.up().down('#6_mois').setDisabled(false);
			obj.up().down('#9_mois').setDisabled(false);
			obj.up().down('#12_mois').setDisabled(false);			
			obj.up().down('#3_mois').setDisabled(false);
			break;				
	}		
}
function getActivatedButton(obj)
{
	if(obj.up().down('#1_mois').isDisabled())
		return 1;
	else if(obj.up().down('#3_mois').isDisabled())
		return 2;
	else if(obj.up().down('#6_mois').isDisabled())
		return 5;
	else if(obj.up().down('#9_mois').isDisabled())
		return 8;
	else if(obj.up().down('#12_mois').isDisabled())
		return 11;
	else if(obj.up().down('#24_mois').isDisabled())
		return 23;	
}

function loadStore(startDate,endDate)
{
	var firstDay = Ext.Date.format( new Date(startDate.getFullYear(), startDate.getMonth(), 1) ,'d');
	var lastDay = Ext.Date.format( new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0) ,'d');
			
	if(startDate < endDate)
	{
		console.log('fffff');
		Ext.getStore('DepenseStore').getProxy().extraParams = {
			'startDate': Ext.Date.format(startDate, 'Y-m'+'-'+firstDay) ,
			'endDate':  Ext.Date.format(endDate, 'Y-m'+'-'+lastDay)
		};		
		
		Ext.getStore('Stat').getProxy().extraParams = {
			'startDate': Ext.Date.format(startDate, 'Y-m'+'-'+firstDay) ,
			'endDate':  Ext.Date.format(endDate, 'Y-m'+'-'+lastDay)
		};
		
		Ext.getStore('barStore').getProxy().extraParams = {
			'startDate': Ext.Date.format(startDate, 'Y-m'+'-'+firstDay) ,
			'endDate':  Ext.Date.format(endDate, 'Y-m'+'-'+lastDay)
		};
	}
	else
	{
		console.log('ffffgg');
		Ext.getStore('DepenseStore').getProxy().extraParams = {
			'startDate': Ext.Date.format(endDate, 'Y-m'+'-'+firstDay) ,
			'endDate':  Ext.Date.format(startDate, 'Y-m'+'-'+lastDay)
		};
		
		Ext.getStore('Stat').getProxy().extraParams = {
			'startDate': Ext.Date.format(endDate, 'Y-m'+'-'+firstDay) ,
			'endDate':  Ext.Date.format(startDate, 'Y-m'+'-'+lastDay)
		};
		
		Ext.getStore('barStore').getProxy().extraParams = {
			'startDate': Ext.Date.format(endDate, 'Y-m'+'-'+firstDay) ,
			'endDate':  Ext.Date.format(startDate, 'Y-m'+'-'+lastDay)
		};
	}			
	var totalSpending =0;
	
	Ext.getStore('DepenseStore').load();	
	Ext.getStore('Stat').load({
		callback: function(records, operation, success) {
		for( i=0;i<records.length;i++)
		{
			totalSpending =totalSpending+ records[i].data.ammount;
			console.log(records[i].data.name+'----'+records[i].data.ammount);
			Ext.getCmp('centerContainer').setTitle('Dépense Total : '+totalSpending);
		}
        
    }
	});
	Ext.getStore('barStore').load();
	
}