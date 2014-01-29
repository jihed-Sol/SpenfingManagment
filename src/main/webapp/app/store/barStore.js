var fDay = Ext.Date.format( new Date(new Date().getFullYear(), new Date().getMonth(), 1) ,'d');
var lDay = Ext.Date.format( new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0) ,'d');

Ext.define('AM.store.barStore', {
    extend: 'Ext.data.Store',
	storeId :'barStore',
    model: 'AM.model.PieStat',
	autoLoad: true,
	proxy: {
        type: 'ajax',
		actionMethods: {
			create : 'POST',
			read   : 'POST',
			update : 'POST',
			destroy: 'POST'
        },
	extraParams : {
		'startDate': Ext.Date.format(new Date(), 'Y-m'+'-'+fDay) ,
		'endDate':  Ext.Date.format(new Date(), 'Y-m'+'-'+lDay)
		},	
        url : 'DepenseController/statistiqueBar.action',
		reader: {
			type: 'json',
			root :'data',
			successProperty: 'success'
		}
    }
});