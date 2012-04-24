Ext.define('PTWMobile.controller.Calendar',{
	extend: 'Ext.app.Controller'
	
	,config: {	
		
		routes: {
			events: 'showEvents'
			,'event/:eventId': {
				action: 'showEvent'
				,conditions: {
					':eventId': '.+'
				}
			}
		}
		
		,refs: {
			calendar: 'calendar'
			,main: 'mainview'
			,bookmarkButton: '#eventBookmarkButton'
			,filterButtons: 'calendar #filters'
			,eventView: {
				selector: 'event#calendar'
				,autoCreate: true
				,xtype: 'event'
				,itemId: 'calendar'
			}
				
		}
		
		,control: {
			calendar: {
				activate: 'onCalendarActivate'
				,push: 'onEventPush'
				,pop: 'onEventPop'
			}
			
			,'calendar #filters': {
				toggle: 'onCalendarFiltersToggle'
			}
			
			,'calendar #eventsList': {
				itemtap: 'onEventSelected'
			}
			
			,'calendar #search':{
				clearicontap: 'onSearchClearIconTap'
				,keyup: 'onSearchKeyUp'
			}
			
			,'calendar #eventBookmarkButton': {
				tap: 'onEventBookmarkRequest'
			}
		}
		
		
		,stores: ['Calendar', 'Bookmarks']
		,models: ['Event','Bookmark']
	}
	

	,showEvents: function() {
		
		var calendarView = this.getCalendar();
	
		this.getMain().setActiveItem(calendarView);
		
		if(calendarView.getActiveItem().xtype == 'event')
			calendarView.pop();
	}
	
	,showEvent: function(eventId) {
		
		var eventView = this.getEventView()
			,calendarView = this.getCalendar()
			,store = Ext.getStore('Calendar');
			
		this.getMain().setActiveItem(calendarView);
			
		if(!store.isLoaded())
		{
			store.on('load', function() {
				this.showEvent(eventId);
			}, this, {single: true});
			return false;
		}
		
		var record = store.getData().getByKey(eventId); // data.getByKey searches filtered records, getById doesn't
		
		if(!record)
		{
			Ext.Msg.alert('Event not found', 'The event you requested was not found', function() {
				this.getApplication().redirectTo('events');
			}, this);
			
			return false;
		}
		
		eventView.setEvent(record);

		if(calendarView.getActiveItem() != eventView)
			calendarView.push(eventView);
		
	}
	
	
	,applyStoreFilters: function() {
		
		this.getFilterButtons().setPressedButtons([]);
		Ext.getStore('Calendar').filterBy(function(item){ return false; });
		
	}
	
	
	,onCalendarActivate: function(view, item) {
		
		if(window.location.hash.indexOf('#event/') != 0)
			this.getApplication().pushUrl('events');
				
		var store = Ext.getStore('Calendar')
			,bookmarkButton = this.getBookmarkButton();
//			,nextDay = Ext.Date().addDays(1); 

		
		bookmarkButton.hide();
		
		this.applyStoreFilters();
		
		if(!store.isLoaded() && !store.isLoading())
			store.load();
			
//		store.filterBy(function(item){
//			if(!item.get('StartDate').getDay() >= nextDay.getDay())
//			{
//				return true;
//			}
//		});
	}
	
	,onEventPush: function(view, item){
		
		var bookmarkButton = this.getBookmarkButton()
			,event = this.getEventView().getEvent()
			,bookmarkStore = Ext.getStore('Bookmarks')
			,existingBookmark = bookmarkStore.getById(event.get('ID'));
			
			
		bookmarkButton.setBadgeText(existingBookmark ? '✓' : false);
		bookmarkButton.show(true);
		
	}
	
	,onEventPop: function(view, item){
		var bookmarkButton = this.getBookmarkButton();
		
		bookmarkButton.hide(true);
		
		this.getApplication().pushUrl('events');
	}
	
	,onCalendarFiltersToggle: function(segment, button, isPressed) {
		
		var store = Ext.getStore('Calendar');
		
		store.clearFilter(true);
		store.filterBy(function(item) {
				
			if(button.config.day.getTime() <= item.get('StartDate').getTime() && item.get('StartDate').getTime() < (new Date(86400000 + button.config.day.getTime())).getTime() ){
				
				return true;
			}
		}, this);
	}
	
	,onEventSelected: function(list, index, target, record) {
				
		this.getApplication().redirectTo(record);
	}
	
	
	,onSearchKeyUp: function(searchField) {
		
		var store = Ext.getStore('Calendar')
			,query = searchField.getValue()
			,pattern = new RegExp('\\b'+query, 'i');
		
		
		if(query)
		{
			this.getFilterButtons().setPressedButtons([]);
			store.clearFilter(true);
			store.filterBy(function(item) {
				
				return item.get('Title').match(pattern) || item.get('Description').match(pattern);
				
			}, this);
		}
		else
		{
			this.applyStoreFilters();
		}
		
	}
	
	,onSearchClearIconTap: function() {
		this.applyStoreFilters();
	}
	
	,onEventBookmarkRequest: function(btn) {
		
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

})