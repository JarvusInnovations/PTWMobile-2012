Ext.define('PTWMobile.view.Tweet',{
	extend: 'Ext.Container'
	,xtype: 'tweet'
	,config: {
		
		tweet: null
		,scrollable: true
		,styleHtmlContent: true
		,itemId: 'TweetInfoPanel'
		,tpl: [
			'<div class="TweetInfo">'
			,'	<span class="user">{from_user_name}</span><br>'
			,'	<span class="user">{from_user}</span><br>'
			,' 	<p>{created_at:("g:i A")}</p>'
			,'	<span class="text">{text}</span><br>'
			,'	<span class="profileImage">{profile_image_url}</span><br>'
			,'</div>'
		]

	}
	,updateTweet: function(newTweet, oldTweet) {
		if(newTweet)
			this.setData(newTweet.data);
	}
});