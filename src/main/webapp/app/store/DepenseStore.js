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
		
        url : 'DepenseController/getAllSpending.action',
		reader: {
			type: 'json',
			root: 'data',
			successProperty: 'success'
		}
    }
});