Ext.define('PTWMobile.view.Dashboard', {
	extend: 'Ext.navigation.View'
	,xtype: 'dashboard'
	,requires: [
		'Ext.dataview.List'
	]
	
	,config: {
		navigationBar: {
			hidden: true
            ,items: [{
                xtype: 'button'
                ,itemId: 'bookmarkButton'
                ,align: 'right'
                ,hidden: true
                ,iconMask: true
				,iconCls: 'favorites'
            }]
		}
		
		,items: [{
			xtype: 'list'
			,title: 'Bookmarks'
			,flex: 1
			,itemId: 'bookmarksList'
			,store: 'Bookmarks'
			,itemTpl: [
				'<div class="bookmark">'
					,'{Title}'
				,'</div>'
			]
			,emptyText: '<img src="x/PTWMobile/resources/img/logo.jpg" width="100%" />'
			+'<div class="dashboardText"> <h2>WELCOME!</h2>'
			+'<p>Tap on the events and bookmark the ones you&rsquo;re interested in. Once bookmarked, each event will all be on this screen.</p>'
     		+'<img src="x/PTWMobile/resources/img/node.jpg" width="90%" />'
			+'<p>Friday April 20th, start up weekend begins at 5:00pm<br />320 S. Broad St.</p></div>'
		}]
	}
	
	
	
});