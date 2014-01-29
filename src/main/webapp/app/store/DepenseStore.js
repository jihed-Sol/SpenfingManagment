var fDay = Ext.Date.format( new Date(new Date().getFullYear(), new Date().getMonth(), 1) ,'d');
var lDay = Ext.Date.format( new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0) ,'d');
Ext.define('AM.store.DepenseStore', {
    extend: 'Ext.data.Store',
    model: 'AM.model.Depense',
	storeId: 'myStore',
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
        url : 'DepenseController/getAllSpending.action',
		reader: {
			type: 'json',
			root: 'data',
			successProperty: 'success'
		}
    },
	sorters: [{
		tpl :'{categorie.name}',
		property: 'categorie',
		direction: 'DESC'
     },{
		property: 'date',
		direction: 'DESC'
     }]
});