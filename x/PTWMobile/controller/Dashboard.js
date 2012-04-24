Ext.define('PTWMobile.controller.Dashboard',{
	extend: 'Ext.app.Controller'
	
	,config: {
		routes: {
			dashboard: 'showDashboard'
			,'bookmark/:eventId': {
				action: 'showBookmark'
				,conditions: {
					':eventId': '.+'
				}
			}
		}
		
		,refs: {
			main: 'mainview'
			,dashboard: 'dashboard'
			,bookmarkButton: '#bookmarkButton'
			,eventView: {
				selector: 'event#bookmarks'
				,autoCreate: true
				,xtype: 'event'
				,itemId: 'bookmarks'
			}
		}
		
		,control: {
			dashboard: {
				activate: 'onDashboardActivate'
				,push: 'onBookmarkPush'
				,pop: 'onBookmarkPop'
			}
			
			,'dashboard #bookmarksList': {
				itemtap: 'onBookmarkTap'
			}
			
			,'dashboard #bookmarkButton': {
				tap: 'onBookmarkRequest'
			}
		}
		
		,stores: ['Bookmarks']
		,models: ['Bookmark']
	}
	
	,launch: function() {
		var store =	Ext.getStore('Bookmarks');
		
		if(store.getCount())
		{
			this.getDashboard().getNavigationBar().show()
		}
		else
		{
			store.on({
				scope: this
				,load: this.onBookmarksLoad
				,addrecords: this.onBookmarksAdded
				,removerecords: this.onBookmarksRemoved
			})
		}
		
	}
	
	,showDashboard: function() {
		
		var dashboardView = this.getDashboard();		
		
		this.getApplication().pushUrl('dashboard');

		this.getMain().setActiveItem(dashboardView);
		
		if(dashboardView.getActiveItem().xtype == 'event')
			dashboardView.pop();
	}
	
	
	,onBookmarkPush: function(view, item){
		
		var bookmarkButton = this.getBookmarkButton()
			,event = this.getEventView().getEvent()
			,bookmarkStore = Ext.getStore('Bookmarks')
			,existingBookmark = bookmarkStore.getById(event.get('ID'));
			
			
		bookmarkButton.setBadgeText(existingBookmark ? '✓' : false);
		bookmarkButton.show(true);
		
	}
	
	,onBookmarkPop: function(view, item){
		var bookmarkButton = this.getBookmarkButton();
		
		bookmarkButton.hide(true);
		
		this.getApplication().pushUrl('dashboard');
	}
	
	,onBookmarksLoad: function(store, records) {
		
		if(records.length) 
			this.getDashboard().getNavigationBar().show();
			
	}
	
	,onBookmarksAdded: function(store, records) {
		this.getDashboard().getNavigationBar().show();
	}
	
	,onBookmarksRemoved: function(store, records) {
		
		if(store.getCount() == 0)
		{
			var dashboardView = this.getDashboard();
			dashboardView.getNavigationBar().hide();
			
			if(dashboardView.getActiveItem().xtype == 'event')
				dashboardView.pop();
		}
	}
	
	
	,showBookmark: function(eventId) {
		var eventView = this.getEventView()
			,dashboardView = this.getDashboard()
			,store = Ext.getStore('Bookmarks');
					
		this.getMain().setActiveItem(dashboardView);
			
		var record = store.getById(eventId);
		
		if(!record)
		{
			Ext.Msg.alert('Event not found', 'The event you requested was not found');
				this.getApplication.redirectTo('dashboard');
			return false;
		}
		
		eventView.setEvent(record);

		if(dashboardView.getActiveItem() != eventView)
			dashboardView.push(eventView);
	}
	
	,onDashboardActivate: function(dashboardView, mainView, oldItem) {
		
		if(oldItem && window.location.hash.indexOf('#dashboard/') != 0)
			this.getApplication().pushUrl('dashboard');
			
		var bookmarkButton = this.getBookmarkButton();
		
		bookmarkButton.hide();
	}

	,onBookmarkTap: function(list, index, target, record) {


		this.getApplication().redirectTo(record);
		
	}
	
	,onBookmarkRequest: function(btn) {
		
		var event = this.getEventView().getEvent()
			,eventId = event.get('ID')
			,bookmarkStore = Ext.getStore('Bookmarks')
			,existingBookmark = bookmarkStore.getById(eventId);

		if(existingBookmark)
		{
			bookmarkStore.remove(existingBookmark);
			bookmarkStore.sync();
			btn.setBadgeText(false);
		}
		else
		{
			var bookmark = bookmarkStore.add(event.getData())[0];
			bookmark.set('isBookmark', true); // needed to force write without a "create" operation
			btn.setBadgeText('✓');
		}

	}
	
});