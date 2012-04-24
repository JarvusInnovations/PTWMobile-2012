Ext.define('PTWMobile.view.Main', {
	extend: 'Ext.tab.Panel'
	,xtype: 'mainview'
	,requires: [
		'PTWMobile.view.Calendar'
		,'PTWMobile.view.Dashboard'
		,'PTWMobile.view.News'
		,'PTWMobile.view.Tweets'
		,'PTWMobile.view.About'
		,'PTWMobile.view.Event'
	]
	,config: {
		tabBarPosition: 'bottom'
		,cls: 'tabbar'
		,items: [{
			xtype: 'dashboard'
			,title: 'Dashboard'
			,iconCls: 'dashboard3' 
			,routePrefix: '#dashboard'
		},{
			xtype: 'calendar'
			,title: 'Calendar'
			,iconCls: 'calendar4'
			,routePrefix: '#events'
		},{
			xtype: 'news'
			,title: 'News'
			,iconCls: 'news3'
			,routePrefix: '#news'
		},{
			xtype: 'tweets'
			,title: 'Tweets'
			,iconCls: 'tweets2'
			,routePrefix: '#tweets'
		},{
			xtype: 'about'
			,title: 'About'
			,iconCls: 'info4'
			,routePrefix: '#about'
		}]
	}
	
	,applyLayout: function(config) {
		config = config || {};
	
		if (Ext.os.is.Android) {
			config.animation = false;
		}
	
		return config;
	}
});
