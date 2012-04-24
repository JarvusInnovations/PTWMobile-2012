Ext.Loader.setConfig({
	enabled: true
	,paths: {
		Jarvus: 'x/Jarvus'
		,Ext: 'x/touch/src'
	}
})

Ext.application({
	name: 'PTWMobile'
	,appFolder: 'x/PTWMobile'
	
	,views: ['Main', 'Dashboard', 'Calendar', 'News', 'Tweets', 'About', 'Event', 'Article','Tweet']
	,controllers: ['Calendar', 'News', 'Tweets', 'Dashboard', 'About']
	,requires: ['Jarvus.patch.StoreState','Jarvus.patch.SafeLocalStorage']
	
	,launch: function() {

		// introspect tabbar config to predict which tab will be routed to by the initial URL
		var itemsCfg = Ext.ClassManager.getByAlias('widget.mainview').prototype.config.items
			,activeItem = 0
			,item;
		
		for(var i = 0; i < itemsCfg.length; i++)
		{
			item = itemsCfg[i];
			if(item.routePrefix && location.hash.indexOf(item.routePrefix) == 0)
			{
				activeItem = i;
				break;
			}
		}
		
		// instantiate main view by adding it to the automatically-created global Viewport
		Ext.Viewport.add({
			xtype: 'mainview'
			,activeItem: activeItem
		});
	
		// adjust CSS of body to resize app for accurate previewing in desktop browsers
		if (Ext.os.is.Desktop && !location.search.match(/fullscreen/)) Ext.defer(this.makeIphoneSized, 50);
	}
	
	,makeIphoneSized: function() {
		
		Ext.getBody()
			.setSize(320, 460)
			.setStyle({
				background: 'black',
				margin: 'auto'
			});	
	}
	
	// silently pushes URL to history, used to enforce current location when navigation happens in a non-route way (e.g. tabs and navview)
	,pushUrl: function(url) {
		this.getHistory().add(Ext.create('Ext.app.Action', {url: url}), true);
	}

});