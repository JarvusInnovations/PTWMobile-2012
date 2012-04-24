Ext.define('PTWMobile.controller.About',{
	extend: 'Ext.app.Controller'
	
	,config: {
		routes: {
			about: 'showAbout'
		}
		
		,refs: {
			main: 'mainview'
			,about: 'about'
		}
		
		,control: {
			about: {
				activate: 'onAboutActivate'
			}
		}
	}
	
	,showAbout: function(artcleId) {

		this.getMain().setActiveItem(this.getAbout());
	}
	
	,onAboutActivate: function() {
		this.getApplication().pushUrl('#about');
	}
	
});