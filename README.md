# simple-xhr
## A standalone AJAX/XHR library to make running AJAX requests simpler.

### About
I made this library which, yes, has only one function, to simplify making AJAX requests without needing to use a larger library. It's pretty bare-bones but importantly, it will allows deferreds.

### Usage
Simply import this repository, or just the JS file, into your project and ensure loaded before your scripts call the function.


**Making a Request**
Making a request is as simple as:
``` javascript
getRequest = function ( method, url, dataType )
```

For example, to search for a book on google books:
``` javascript
getRequest( 'GET', 'https://www.googleapis.com/books/v1/volumes?q=jaws', 'JSON' );
```
Note: this won't do anything with the results. To do something with the results, use the .done() deferred.
For example, to print out the JSON to the console:
``` javascript
const url = 'https://www.googleapis.com/books/v1/volumes?q=jaws';
getRequest( 'GET', url, 'JSON' ).done( function(response) { console.log(response); } )
```

You can also chain the deferreds - the below will print out the response text twice.
``` javascript

const deferred = function(response) { console.log(response); };
getRequest( 'GET', url, 'JSON' ).done( deferred ).done( deferred );
```
