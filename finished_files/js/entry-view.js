(function() {

  var EntryView = {};

  /* Renders an entry into the given $entry element. Requires the object
   * representing the active entry (activeEntryData). If this object is null,
   * picks the first existing entry. If no entry exists, this view will display
   * the CreatingEntryView. */
  EntryView.render = function($entry, activeEntryData) {
      EntryModel.loadAll(loadAll_callback);
      var entries_array=[];
      for(var i=0;i<localStorage.length;i++)
          entries_array.push(JSON.parse(localStorage.getItem(i.toString())));
      var entries_obj={
          viewing:true,
          entries:entries_array,
          activeEntryData:activeEntryData
      }
      $entry.html('');
      $entry.append(Templates.renderEntry(entries_obj));
      var $map=$("div[class='map']");
      GoogleMapView.render($map,activeEntryData);
      $("button[class='green new']").click(function(event){
          $entry.html('');
          CreatingEntryView.render($entry);
      })
      $("button[class='teal edit']").click(function(event){
          $entry.html('');
          EditingEntryView.render($entry,activeEntryData);
      })
      $("button[class='red delete']").click(function(event){
          var $content=$("div.feature span");
          EntryModel.loadAll(loadAll_callback);
          for(var i=0;i<localStorage.length;i++){
              if((JSON.parse(localStorage.getItem(i))).name==$content.html())
                 EntryModel.remove((JSON.parse(localStorage.getItem(i))).id,remove_callback);
          }
          EntryModel.loadAll(loadAll_callback);
          if(localStorage.length!=0){
              var entry_display=JSON.parse(localStorage.getItem('0'));
              location.reload();
              EntryView.render($entry,entry_display);
          }
          else{
              location.reload();
              CreatingEntryView.render($entry);
          }
      })
      $("div.dropdown select").click(function(event){
          var id_chosen=$("div.dropdown select").val();
          EntryModel.loadAll(loadAll_callback);
          for(var i=0;i<localStorage.length;i++){
              if((JSON.parse(localStorage.getItem(i.toString()))).id==id_chosen)
                  EntryView.render($entry,JSON.parse(localStorage.getItem(i.toString())));
          }
      })
  };

  window.EntryView = EntryView;

})();
