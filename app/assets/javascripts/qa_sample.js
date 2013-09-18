// Sample JQuery functions

/**
  This function queries our questioning_authorities engine, and process the result for 
  use with .typeahead.  

  lcshQuery
    sends a url such as /terms?q=MySubject
    
    recieves a JSON object such as:
      [
        {"id":"1", "label":"MySubectFoo"},
        {"id":"1", "label":"MySubectBar"}
      ]
    
    parses the results and processes the data as:
      ["MySubjectFoo", "MySubjectBar"]

    and sends this to .typeahead

**/
function lcshQuery(query, process) {
  terms = [];
  map = {};

  $.ajax({ 
    url: '/terms?q='+query,
    dataType: 'json'
  }).success(function(data) {
    $.each(data, function (i, term) {
      map[term.label] = term;
      terms.push(term.label);
    });
    process(terms);
  }).fail(function(jqXHR, textStatus, errorThrown) {
    alert(url);
  });      

}


jQuery(document).ready(function() {

  // Typeahead features
 
  // Calls the lcshQuery function to get an array of terms that match query
  $('#lcsh').typeahead({
    source: function (query, process) { lcshQuery(query, process) }
});
  

});
