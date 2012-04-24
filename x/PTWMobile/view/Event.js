Ext.define('PTWMobile.view.Event',{
	extend: 'Ext.Container'
	,xtype: 'event'
	
	,config: {
		event: null
		
		,title: 'Event'
		,scrollable: true
		,styleHtmlContent: true
		,itemId: 'EventInfoPanel'
		,tpl: [
			'<div class="eventInfo">'
			,'	<h1 class="title">{Title}</h1>'
			,'	<p class="address">{Address}</p>'
			,'	<p class="dates">{[Ext.DateExtras.getShortMonthName(values.StartDate.getMonth())]} {[values.StartDate.getDate()]} - {[Ext.DateExtras.getShortMonthName(values.EndDate.getMonth())]} {[values.EndDate.getDate()]} {[values.StartDate.getFullYear()]}</p>'
			,' 	<p>{[Ext.Date.format(values.StartDate, "g:i A")]} to {[Ext.Date.format(values.EndDate, "g:i A")]}</p>'
			,'  <p class="description">{Description}</p>'
			,'  <a href="http://maps.google.com/?q={Address}" target="_blank">Directions</a>'
			,'</div>'
		]
	}
	
	,updateEvent: function(newEvent, oldEvent){
		if(newEvent)
			this.setData(newEvent.data);
	}
});