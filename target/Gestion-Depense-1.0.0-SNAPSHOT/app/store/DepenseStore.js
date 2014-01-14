Ext.define('AM.store.DepenseStore', {
    extend: 'Ext.data.Store',
    model: 'AM.model.Depense',
	autoLoad: true,
	proxy: {
        type: 'ajax',
        url : '/DepenseController/getAllSpending.action',
		reader: {
			type: 'json',
			root: 'data',
			successProperty: 'success'
		}
    }
});