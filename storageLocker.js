/*
	Copyright (c) 2010 Oscar Godson (@oscargodson)
	
	Permission is hereby granted, free of charge, to any person obtaining
	a copy of this software and associated documentation files (the
	"Software"), to deal in the Software without restriction, including
	without limitation the rights to use, copy, modify, merge, publish,
	distribute, sublicense, and/or sell copies of the Software, and to
	permit persons to whom the Software is furnished to do so, subject to
	the following conditions:
	
	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
	LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
	OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
//Setting up storageLocker
function storageLocker(catalog){
	//Catalog is the name of the
	if(catalog){
		this.catalog = catalog;
	}
	else{
		//If you don't specify a name it just returns localStorage or (soon) DOMStorage for IE
		//This makes looping easier, i.e. for(x in storageLocker()){/*...*/} instead
		//of doing a check yourself for IE or other browsers
		return localStorage;
	}
}
	storageLocker.prototype.save = function(value){
		var json = JSON.parse(localStorage.getItem(this.catalog));
		if(json == null){json = {};}
		for(var key in value){
			if(value.hasOwnProperty(key)){
				json[key] = value[key];
			}
		}
		localStorage.setItem(this.catalog,JSON.stringify(json));
		return this;
	}
	storageLocker.prototype.get = function(value){
		json = JSON.parse(localStorage.getItem(this.catalog));
		if(json == null){json = {};}
		if(value){
			if(typeof json[value] !== 'undefined'){
				return json[value];
			}
			else{
				//Makes it so you can check with myStorage.get('thisWontExist').length
				//and it will return 0 and typeof will return object.
				return new Object('');
			}
		}
		else{
			return json;
		}
	};
	
	/* Deleting items */
	storageLocker.prototype.remove = function(value){
		json = JSON.parse(localStorage.getItem(this.catalog));
		if(json == null){json = {};}
		if(value){
			delete json[value];
		}
		else{
			json = {};
		}
		localStorage.setItem(this.catalog,JSON.stringify(json));
		return this;
	}
	
	/* Removing entire storages */
	storageLocker.prototype.removeStorage = function(){
		localStorage.removeItem(this.catalog);
		return this;
	}
	
	/*
		Clearing ALL storages on domain!
		We also use this name to be sure you don't do this by accident...
	*/
	storageLocker.prototype.clear = function(){
		localStorage.clear();
		return this;
	}