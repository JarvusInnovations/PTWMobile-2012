Ext.define('PTWMobile.view.About', {
	extend: 'Ext.Container'
	,xtype: 'about'
	
	,config: {
		items: [{
			xtype: 'toolbar'
			,docked: 'top'
			,title: 'About'
		}]
		,styleHtmlContent: true
		,scrollable: true
		,html: '<div class="about"><p>Philly Tech Week is a week-long celebration of technology and innovation in Philadelphia. The annual week of events is intended to grow the impact of this innovative region through technology, collaboration and improving Philadelphia.</p>'
				+'<img src="x/PTWMobile/resources/img/node.jpg" width="90%" />'
					+ '<a href="http://phillytechweek.com/about">Learn more here</a></div>'
	}
});



		
		// title has to be provided within a toolbar docked to the top of the screen
		
		//,items: [{
		//	xtype: 'toolbar'
		//	,docked: 'top'
		//	,title: 'About'
		//}]
		
		// no need to wrap the contents in a div,
		// every Sencha component already is a div plus a ton more if its scrollable
		// , you can just give the component's topmost div a class via the cls config
		//,html: '<div class="about"><p>social media mentions</p></div>'
		//,cls: 'about'
		
		// use + to join multiple lines
		// use ".about .x-body" to style the entire scrollable area of the component
		// or ".about .x-innerhtml to target just the div around the HTML content
		// -- move your width/height styles for .about to innerhtml or body -- try them both