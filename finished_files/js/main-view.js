(function() {

  var MainView = {};

  /* Renders the main area, showing entries. */
  MainView.render = function($body) {
    var $entry = $body.find('#entry');
    EntryModel.loadAll(loadAll_callback);
    if(localStorage.length!=0)
        EntryView.render($entry, JSON.parse(localStorage[0]));
    else
        CreatingEntryView.render($entry);
  };

  window.MainView = MainView;

})();
