Ext.define('AM.view.CenterSide.barChart' ,{
	extend: 'Ext.chart.Chart',
	
	alias: 'widget.barChart',
	animate: true,
		shadow: true,
		store: 'barStore',
		axes: [{
			type: 'Numeric',
			position: 'left',
			fields: ['ammount'],
			label: {
				renderer: Ext.util.Format.numberRenderer('0,0')
			},
			title: 'Dépense',
			grid: true,
			minimum: 0
		}, {
			type: 'Category',
			position: 'bottom',
			fields: ['name'],
			title: 'Mois'
		}],
		series: [{
			type: 'column',
			axis: 'left',
			highlight: true,
			tips: {
			  trackMouse: true,
			  width: 140,
			  height: 28,
			  renderer: function(storeItem, item) {
				this.setTitle(storeItem.get('name') + ': ' + storeItem.get('ammount') + ' $');
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
			xField: 'name',
			yField: 'ammount'
		}]
});
