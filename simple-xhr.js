const simpleXhr = function ( method, url, dataType ) {
    return new function sXhr( method, url, dataType ) {
        // set up this object's methods and properties
        this.callbacks = [];
        this.xhr = new XMLHttpRequest();
        this.responseType = dataType.toLowerCase();
        
        // function used to call each attached callback function
        this.execCallbacks = function (e) {
            //extract response text
            let response = e.target.responseText; 
            if (this.responseType === 'json') response = JSON.parse(response);
            //execute supplied callbacks

            this.callbacks.forEach( (fn) => fn(response) ); 
        }
        this.execCallbacks = this.execCallbacks.bind(this); //bind to this function

        // set .done method up
        this.done = function( callback ) {
            this.callbacks.push(callback); //store multiple callbacks in an array
            return this; // return this so we can chain additional .done's
        }

        
        xhr = this.xhr
        xhr.addEventListener('loadend', this.execCallbacks);
        
        // execute the xhr
        xhr.open( method, url );
        xhr.send();

        return this
    }(method, url, dataType);
};