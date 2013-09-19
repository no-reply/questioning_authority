// Sample JQuery functions

/**
  This function queries our questioning_authorities engine, and process the result for 
  use with .typeahead.  

  lcshQuery
    sends the url /terms?vocab=lcsh&q=MySubject
    
    and returns the data to .typeahaed as:
      ["MySubjectFoo", "MySubjectBar"]

**/
function suggestionQuery(query, vocab, subauthority, process) {
    name_list = [];
    map = {};

 if (subauthority) {
   url = '/terms?vocab='+vocab+'&q='+query+'&sub_authority='+subauthority
 } else {
	url = '/terms?vocab='+vocab+'&q='+query
}
  $.ajax({ 
    url: url,
    dataType: 'json'
  }).success(function(data) {


          $.each(data, function (i, singleResult) {
              map[singleResult.term] = singleResult;
              name_list.push(singleResult.term);
          });
    process(name_list);
  }).fail(function(jqXHR, textStatus, errorThrown) {
    alert(url);
  });      

}


jQuery(document).ready(function() {
	

  // Typeahead features
 
  // Calls the lcshQuery function to get an array of terms that match query
  $('.qa-suggest').typeahead({
      source: function (query, process) { suggestionQuery(query, this.$element.data('vocabulary'), this.$element.data('subauthority'), process) },
      matcher: function (item) {
          if (item.toLowerCase().indexOf(this.query.trim().toLowerCase()) != -1) {
              return true;
          }
      },
      sorter: function (items) {
          return items.sort();
      },
      highlighter: function (item) {
          var regex = new RegExp( '(' + this.query + ')', 'gi' );
          return item.replace( regex, "<strong>$1</strong>" );
      },

      updater: function (item) {
          selectedItem = map[item].id;
          return item;
      }
  });

  

});
