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


 if (subauthority) {
   url = '/search/'+vocab+'/' + subauthority + '?q='+query;
 } else {
	url = '/search/'+vocab+'?q='+query;
}

  $.ajax({ 
    url: url,
    dataType: 'json'
  }).success(function(data) {
          term_list = [];
          map = {};

          $.each(data, function (i, singleResult) {
              map[singleResult.term] = singleResult;
              term_list.push(singleResult.term);
          });
    process(term_list);
  }).fail(function(jqXHR, textStatus, errorThrown) {
    alert(url);
  });      

}


jQuery(document).ready(function() {
	

  // Typeahead features
 
  // Creates a hidden set of fields that hold the value of the selected text.
    $('.qa-suggest').each(function(i, obj) {
        $(obj).after('<input type="hidden" name=""' + $(obj).attr('name') + '_value" value="" + id="' + $(obj).attr('id') + '_value">');
    });

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

          $('#' + this.$element.data('name') + '_value').attr('value', map[item].id);
          //alert($('#' + this.$element.data('name') + '_value').attr('value'));
          return item;
      }
  });

  

});
