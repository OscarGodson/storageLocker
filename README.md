#storageLocker 1.0 Beta

##Overview
storageLocker is an easy localStorage wrapper that makes localStorage more robust, chainable, and the way it should have been originally. storageLocker takes in JSON so you can do more complex stores and queries than you normally could with raw localStorage. Best of all, storageLocker works in all modern browsers including Firefox 3.5+, Chrome 4+, Opera, and IE8-9.

The API is super easy. There's only a few commands, `save()`, `get()`, `remove()`, `removeStorage()`, `clear()`, and `storageLocker()` and they do basically what you think they do. More info in the API reference below.

storageLocker is great for making offline HTML5 apps for the iPhone as long as you don't need to store anymore than 5MBs of data which is fine for most things like to do apps, note taking apps, game scores, etc. It wont work well for base64 encoded data simply because there is limits on storage per domain at around 5MBs, by default.

***

##Quick Start
Because this is simply a javascript file, just include it by adding this to your HTML page wherever you place your scripts:

    <script src="../js/storageLocker-1.0.js"></script>

After adding that, creating a new storageLocker object is this simple:

    var myStorage = new storageLocker('NameOfCollection');

***

##API Reference

###save( json )
`save()` does just that, saves the JSON data to your storageLocker object. Example:

    var myStorage = new storageLocker('userdata');
    myStorage.save({
        'username':'oscargodson',
        'password':'d982b1025ae11472ac59d6afb6acc80d'
    });

Adding to the data is as easy as just doing another `save()`. Example:

    myStorage.save({'bio':'Lorem ipsum...'});

Getting the data out would return `username`, `password`, `bio`.


###get( string )
`get()` can return either the string that matches an item in your storageLocker object or it can return the JSON object if you leave the parameter blank. Returning the entire JSON object is useful looping and saving query time. Examples:

    myStorage.get('username'); //Returns oscargodson
    myStorage.get();
    /*
    Returns the JSON object of: 
    {
        'username':'oscargodson',
        'password':'d982b1025ae11472ac59d6afb6acc80d',
        'bio':'Lorem ipsum...'
    }
    */
    //You can also save on query time by saving to a var then referencing that:
    var myData = myStorage.get();
    myData['username']; //returns oscargodson


###remove( string )
`remove()` deletes the matching JSON item in your storageLocker. Leaving it blank removes all data in the object. Examples:

    myStorage.remove('bio');
    myStorage.get() //would return username and password, but bio will be gone
    myStorage.remove();
    myStorage.get() //would return a blank JSON object which is {};

###removeStorage()
`removeStorage()` will remove the storageLocker object altogether and remove it from the browser as well. Example:

    myStorage.removeStorage();
    //calling myStorage now result in null


###storageLocker()

This, by it's self, will return all localStorage instances. This is useful looping through all storages. Example:
   
    var storage1 = new storageLocker('storage1');
    var storage2 = new storageLocker('storage2');
    var storage3 = new storageLocker('storage3');
    for(x in storageLocker()){
        alert(x);
    }
    //Will make 3 alerts: storage1, storage2, storage3.

###clear()

`clear()` is an atomic function. It can be chained to anything, but the result is the same. *It will delete ALL storage on the domain!* Example:

    var storage1 = new storageLocker('storage1');
    var storage2 = new storageLocker('storage2');
    var storage3 = new storageLocker('storage3');
    storageLocker.clear();//The domain's storage is now empty!

###Chaining Events
Chaining events is another key part of storageLocker. It's intuitive and it *should* work the way you expect. Here's a longer-than-usual chain of events.

    var myStorage = new storageLocker('chaining-test');
    console.log(
        myStorage
            .save({'start':'the chain'})
            .save({'mid':'middle chain'})
            .remove('start')
            .save({'the':'end'})
            .get()
        );

As expected, the console should show an object with `mid` and `the` as the returned items in the `myStorage` object since we removed the `start` on the 3rd chained command.

***

###Roadmap
As of now storageLocker is functional and is running two of my personal projects in production. It works fine and it's also super fast, however, there are some parts I want to simplify and/or add possibly.

1. Maybe a callback for `get()` after the items are returned so the returned data can be used without having to save to a `var` or adding it inline with concatenation.
2. MAYBE IE6 & 7 support if i get enough demand, but I have moral issues with it mainly... See "Support Notes" below
3. I don't like how there are 3 different commands and 1 command with camelcase (`removeStorage()`) for removing and deleting data, but I can't think of any better way since I want `remove()` to be associated with items, `removeStorage()` to be associated with "this" storage, and `clear()` to be atomic and apply to all storages on a domain.
4. I'll be adding `sessionStorage` support in the near future.

###Browser Support Notes
Yes, I could support IE6 & 7 with userData Behavior, however, even IE7 has surpassed 4 years old. If you insist on supporting these ancient browsers, feel free to do so.

Firefox 2 - 3.2 we could use Gecko globalStorage, but again, the usage rates of this browser are tiny now.

Safari 3.1-3.2 we could use HTML5 Database Storage, but even at Safari's peak it had, what, 2%?

Lastly, in Chrome 1-3 we could use the Gears Database API, but out of all of these the usage rates are the most minuscule.

###Contact Me!
The easiest and most likely fastest way is to tweet me: @oscargodson

If you don't have twitter feel free to email me at oscargodson /at/ gmail