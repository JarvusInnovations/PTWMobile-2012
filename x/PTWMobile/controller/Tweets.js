Ext.define('PTWMobile.controller.Tweets',{
	extend: 'Ext.app.Controller'
	
	,config: {
		routes: {
			tweets: 'showTweets'
		}
		
		,refs: {
			main: 'mainview'
			,tweets: 'tweets'
		}
		
		,control: {
			tweets: {
				activate: 'onTweetsActivate'
			}
//			,'tweets #tweetsList': {
//				itemtap: 'onTweetSelected'
//			}
		}
		
		,stores: ['Tweets']
		,models: ['Tweet']
	}
	
	,showTweets: function() {
		window.location = '#tweets';
		this.getMain().setActiveItem(this.getTweets());
	}
	
//	,showTweet: function(tweetId) {
//		
//		var tweetView = this.getTweet()
//			,store = Ext.getStore('Tweets')
//			,record = store.getById(tweetId);
//		
//		tweetView.setTweet(record);
//		
//		this.getTweets.push(tweetView);
//		
//	}
	
	,onTweetsActivate: function() {
		window.location = '#tweets';
		
		
		var store = Ext.getStore('Tweets');
		
		if(!store.isLoaded() && !store.isLoading())
			store.load();
	}
	
//	,onTweetSelected: function(list, index, target, record){
//
//		window.location = '#tweet/'+record.getId();
//	}
});