Ext.define('AM.store.Stat', {
    extend: 'Ext.data.Store',
	storeId :'StatStore',
    model: 'AM.model.PieStat',
	autoLoad: true,
	proxy: {
        type: 'ajax',
        url : 'DepenseController/statistique.action',
		reader: {
			type: 'json',
			root :'data',
			successProperty: 'success'
		}
    }
});