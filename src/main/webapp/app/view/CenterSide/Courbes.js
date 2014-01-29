Ext.require([
     'Ext.chart.*'
]);
Ext.define('AM.view.CenterSide.Courbes' ,{
	extend: 'Ext.chart.Chart',
	alias: 'widget.CB',	
	store: 'SeriesStore',
	animate: true,
	shadow: true,
	axes: [
		{
			title: 'Montant',
			type: 'Numeric',
			position: 'left',
			fields: ['voiture','vidange','courses'],
		
		},
		{
			title: 'Periode',
			type: 'Category',
			grid: true,
			position: 'bottom',
			fields: ['mois']
		}
	],
	series: [{
		type: 'column',	
		xField: 'mois',
		yField: 'voiture',
		tips: {
			  trackMouse: true,
			  width: 140,
			  height: 28,
			  renderer: function(storeItem, item) {
				this.setTitle('voiture : ' + storeItem.get('voiture') + ' $');
			  }
			},
			label: {
			  display: 'insideEnd',
			  'text-anchor': 'middle',
				field: 'ammount',
				renderer: Ext.util.Format.numberRenderer('0'),
				orientation: 'vertical',
				color: '#333'
			},		
		},{
		type: 'column',		
		xField: 'mois',
		yField: 'reparation',	
		tips: {
			  trackMouse: true,
			  width: 140,
			  height: 28,
			  renderer: function(storeItem, item) {
				this.setTitle('reparation: ' + storeItem.get('reparation') + ' $');
			  }
			},
			label: {
			  display: 'insideEnd',
			  'text-anchor': 'middle',
				field: 'ammount',
				renderer: Ext.util.Format.numberRenderer('0'),
				orientation: 'vertical',
				color: '#333'
			},
	},{
		type: 'column',	
		xField: 'mois',
		yField: 'courses',
		tips: {
			  trackMouse: true,
			  width: 140,
			  height: 28,
			  renderer: function(storeItem, item) {
				this.setTitle('Courses: ' + storeItem.get('courses') + ' $');
			  }
			},
			label: {
			  display: 'insideEnd',
			  'text-anchor': 'middle',
				field: 'ammount',
				renderer: Ext.util.Format.numberRenderer('0'),
				orientation: 'vertical',
				color: '#333'
			},		
		},{
		type: 'column',	
		xField: 'mois',
		yField: 'vidange',
		tips: {
			  trackMouse: true,
			  width: 140,
			  height: 28,
			  renderer: function(storeItem, item) {
				this.setTitle('Vidange: ' + storeItem.get('vidange') + ' $');
			  }
			},
			label: {
			  display: 'insideEnd',
			  'text-anchor': 'middle',
				field: 'ammount',
				renderer: Ext.util.Format.numberRenderer('0'),
				orientation: 'vertical',
				color: '#333'
			},	
	}]
	
});
