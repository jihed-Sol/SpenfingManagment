var startDate=new Date();
var endDate=new Date();
var labelDate=new Date();

var fDay = Ext.Date.format( new Date(startDate.getFullYear(), startDate.getMonth(), 1) ,'d');
var lDay = Ext.Date.format( new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0) ,'d');

Ext.define('AM.controller.NorthSideController', {
    extend: 'Ext.app.Controller',
	
    models: ['Depense','Categorie','PieStat'],
	stores: ['DepenseStore','Stat','TreeStore','barStore'],
	views:['NorthSide.North','WestSide.CategorieTree'],
	
	init: function() {
		this.control({
			
			'#next' : {
				
				click : function(){
				
					if(getActivatedButton(Ext.getCmp('next'))!=-1)
						nextPeriod();
					else
						Ext.MessageBox.show({
							   title      : 'ATTENTION',
							   msg        : 'Vous devez d\'abord choisir la priode voulu',
							   width      : 300,
							   icon       : Ext.MessageBox.warning,
							   buttons: Ext.MessageBox.OK,
							});	
				}
				
			},
			'#previous' : {
				
				click : function(){
					if(getActivatedButton(Ext.getCmp('previous'))!=-1)
						previousPeriod();
					else
						Ext.MessageBox.show({
							   title      : 'ATTENTION',
							   msg        : 'Vous devez d\'abord choisir la priode voulu',
							   width      : 300,
							   icon       : Ext.MessageBox.warning,
							   buttons: Ext.MessageBox.OK,
							});	
				}
				
			},
			'#1_mois' : {
				
				click : function(){
					
					 loadPeriod(Ext.getCmp('1_mois'),0);
				}
				
			},
			'#3_mois' : {
				
				click : function(){
					
					loadPeriod(Ext.getCmp('3_mois'),2);
				}
				
			},
			'#6_mois' : {
				
				click : function(){
					
					loadPeriod(Ext.getCmp('6_mois'),5);
				}
				
			},
			'#9_mois' : {
				
				click : function(){
					
					loadPeriod(Ext.getCmp('9_mois'),8);
					
				}
				
			},
			'#12_mois' : {
				
				click : function(){
					
					loadPeriod(Ext.getCmp('12_mois'),11);
					
				}
				
			},
			'#24_mois' : {
				
				click : function(){
					loadPeriod(Ext.getCmp('24_mois'),23);
					
				}
				
			},
			'#reset' : {
				
				click : function(){
					
					var tree=Ext.getCmp('ViewConfigcategorieTree');
					tree.getSelectionModel().deselectAll() ;
					var proxyTab=Ext.getStore('DepenseStore').getProxy().extraParams;
					proxyTab['categorie']=null;
					Ext.getStore('DepenseStore').getProxy().extraParams=proxyTab;
					console.log(proxyTab['startDate']);
					console.log(proxyTab['endDate']);
					loadStore(Ext.Date.parse(proxyTab['startDate'],'Y-m-d'),Ext.Date.parse(proxyTab['endDate'],'Y-m-d'));
					
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
	else
		return -1;
}
function loadStore(startDate,endDate)
{
	var firstDay = Ext.Date.format( new Date(startDate.getFullYear(), startDate.getMonth(), 1) ,'d');
	var lastDay = Ext.Date.format( new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0) ,'d');	
	var firstInvDay = Ext.Date.format( new Date(endDate.getFullYear(), endDate.getMonth(), 1) ,'d');
	var lastInvDay = Ext.Date.format( new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0) ,'d');
	var selection=Ext.getCmp('ViewConfigcategorieTree').getSelectionModel().getSelection();
	var proxyTab=Ext.getStore('DepenseStore').getProxy().extraParams;
	var periodLabel ='';
	
	if(startDate < endDate)
	{			
		proxyTab['startDate']= Ext.Date.format(startDate, 'Y-m'+'-'+firstDay);
		proxyTab['endDate']=  Ext.Date.format(endDate, 'Y-m'+'-'+lastDay);
		
		if(selection.length != 0)
		{
			proxyTab['categorie']=selection[0].data.id;
		}
		
		Ext.getStore('DepenseStore').getProxy().extraParams=proxyTab;
		Ext.getStore('Stat').getProxy().extraParams=proxyTab;
		Ext.getStore('barStore').getProxy().extraParams=proxyTab;
		Ext.getStore('SeriesStore').getProxy().extraParams=proxyTab;
					
		periodLabel='Periode : '+Ext.Date.format(startDate, 'Y-m'+'-'+firstInvDay)+' <----> '+Ext.Date.format(endDate, 'Y-m'+'-'+lastInvDay);
	}
	else
	{
		proxyTab['startDate']=  Ext.Date.format(endDate, 'Y-m'+'-'+firstDay);
		proxyTab['endDate']=   Ext.Date.format(startDate, 'Y-m'+'-'+lastDay);
		
		if(selection.length != 0)
		{
			proxyTab['categorie']=selection[0].data.id;
		}
		
		Ext.getStore('DepenseStore').getProxy().extraParams=proxyTab;
		Ext.getStore('Stat').getProxy().extraParams=proxyTab;
		Ext.getStore('barStore').getProxy().extraParams=proxyTab;
		Ext.getStore('SeriesStore').getProxy().extraParams=proxyTab;
		
		periodLabel='Periode : '+Ext.Date.format(endDate, 'Y-m'+'-'+firstDay)+' <----> '+Ext.Date.format(startDate, 'Y-m'+'-'+lastDay);
	}			
	var totalSpending =0;
	
	Ext.getStore('DepenseStore').load();	
	Ext.getStore('Stat').load({
		callback: function(records, operation, success) {
		for( var i=0;i<records.length;i++)
		{
			totalSpending =totalSpending+ records[i].data.ammount;			
			Ext.getCmp('centerContainer').setTitle('Depense Total : '+totalSpending);
		}
        
    }
	});
	Ext.getStore('barStore').load();
	Ext.getStore('SeriesStore').load();
	
}

function updateButtonStatus(obj)
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

function loadPeriod(obj,per)
{
	
	endDate=new Date();
	endDate.setMilliseconds(startDate.getMilliseconds()+ per * 30 * 24 *60 *60 *1000);
	
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
	Ext.getCmp('NorthPeriodLabel').setText(label);
	updateButtonStatus(obj);
	loadStore(startDate,endDate);

}

function nextPeriod()
{
	
	startDate.setMilliseconds(endDate.getMilliseconds());
	endDate.setMilliseconds(startDate.getMilliseconds() + getActivatedButton(Ext.getCmp('next')) * 30 * 24 *60 *60 *1000);
	
	var label ='';
	if(endDate.getYear()==startDate.getYear())
	{
		label = Ext.Date.format(startDate,'M')+' - '+Ext.Date.format(endDate,'M')+' '+Ext.Date.format(startDate,'Y');
	}
	else
	{	
		label = Ext.Date.format(startDate,'M')+' '+Ext.Date.format(startDate,'Y')+' - '+Ext.Date.format(endDate,'M')+' '+Ext.Date.format(endDate,'Y');		
	}
				
	Ext.getCmp('NorthPeriodLabel').setText(label);
	loadStore(startDate,endDate);
}

function previousPeriod()
{

	startDate.setMilliseconds(endDate.getMilliseconds());

	endDate.setMilliseconds(startDate.getMilliseconds()- getActivatedButton(Ext.getCmp('previous')) * 30 * 24 *60 *60 *1000);
	
	var label ='';
	if(endDate.getYear()==startDate.getYear())
	{
		label = Ext.Date.format(startDate,'M')+' - '+Ext.Date.format(endDate,'M')+' '+Ext.Date.format(startDate,'Y');
	}
	else
	{	
		label = Ext.Date.format(startDate,'M')+' '+Ext.Date.format(startDate,'Y')+' - '+Ext.Date.format(endDate,'M')+' '+Ext.Date.format(endDate,'Y');		
	}
				
	Ext.getCmp('NorthPeriodLabel').setText(label);
	loadStore(startDate,endDate);
		

}