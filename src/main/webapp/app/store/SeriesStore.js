var fDay = Ext.Date.format( new Date(new Date().getFullYear(), new Date().getMonth(), 1) ,'d');
var lDay = Ext.Date.format( new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0) ,'d');

Ext.define('AM.store.SeriesStore', {
    extend: 'Ext.data.Store',  
	model :'AM.model.Series',
	autoLoad: true,

	proxy: {
        type: 'ajax',
		extraParams : {
			'startDate': Ext.Date.format(new Date(), 'Y-m'+'-'+fDay) ,
			'endDate':  Ext.Date.format(new Date(), 'Y-m'+'-'+lDay)
		},	
        url : 'DepenseController/statistiqueSeries.action',
		reader: {
			type: 'json',
			root: 'data',
			successProperty: 'success'
		}
    }
});