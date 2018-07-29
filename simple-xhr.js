const simpleXhr = function ( method, url, dataType ) {
    // set up this object's methods and properties
	simpleXhr.callbacks = [];
    simpleXhr.xhr = new XMLHttpRequest();
    simpleXhr.responseType = dataType.toLowerCase();
    
    // function used to call each attached callback function
    simpleXhr.execCallbacks = function (e) {
        //extract response text
        let response = e.target.responseText; 
        if (this.responseType === 'json') response = JSON.parse(response);
        //execute supplied callbacks

        this.callbacks.forEach( (fn) => fn(response) ); 
    }
    simpleXhr.execCallbacks = simpleXhr.execCallbacks.bind(simpleXhr); //bind to this function

    // set .done method up
	simpleXhr.done = function( callback ) {
        this.callbacks.push(callback); //store multiple callbacks in an array
        return this; // return this so we can chain additional .done's
    }

    
    xhr = simpleXhr.xhr
	xhr.addEventListener('loadend', simpleXhr.execCallbacks);
    
    // execute the xhr
    xhr.open( method, url );
    xhr.send();

    // return this function as an object so we can call the .done method.
	return simpleXhr;
};