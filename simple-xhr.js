const getRequest = function ( method, url, dataType ) {
    // set up this object's methods and properties
	getRequest.callbacks = [];
    getRequest.xhr = new XMLHttpRequest();
    getRequest.responseType = dataType.toLowerCase();
    
    // function used to call each attached callback function
    getRequest.execCallbacks = function (e) {
        //extract response text
        const response = e.target.responseText; 
        if (this.responseType === 'json') response = JSON.parse(response);
        //execute supplied callbacks

        this.callbacks.forEach( (fn) => fn(response) ); 
    }
    getRequest.execCallbacks = getRequest.execCallbacks.bind(getRequest); //bind to this function

    // set .done method up
	getRequest.done = function( callback ) {
        this.callbacks.push(callback); //store multiple callbacks in an array
        return this; // return this so we can chain additional .done's
    }

    
    xhr = getRequest.xhr
	xhr.addEventListener('loadend', getRequest.execCallbacks);
    
    // execute the xhr
    xhr.open( method, url );
    xhr.send();

    // return this function as an object so we can call the .done method.
	return getRequest;
};