Ext.define('Jarvus.patch.SafeLocalStorage', {
	override: 'Ext.data.proxy.LocalStorage'
	
	,getStorageObject: function() {
		return {
			getItem: function(key) {
				return window.localStorage.getItem(key);
			}
			,removeItem: function(key) {
				return window.localStorage.removeItem(key);
			}
			,setItem: function(key, value) {
				try
				{
					return window.localStorage.setItem(key, value);
				}
				catch (error)
				{
					if (error.code === DOMException.QUOTA_EXCEEDED_ERR)
						return null; // what's the ST2 way to log errors?
					else
						throw error;
				}
			}
		};
	}
});