(function() {

  var EditingEntryView = {};

  /* Renders a view to allow the user to edit an entry. Requires the $entry
   * element and an object representing the active entry. */
  EditingEntryView.render = function($entry, activeEntryData) {
    var entry_upd={
        editing:true,
        entries:null,
        activeEntryData:activeEntryData
    }
    var id_new;
    var entry_new;
    for(var i=0;i<localStorage.length;i++){
        if(JSON.parse(localStorage.getItem(i.toString())).name==activeEntryData.name)
            var id_new=JSON.parse(localStorage.getItem(i.toString())).id;
    }
    $entry.append(Templates.renderEntry(entry_upd));
    $("button[class='teal update']").click(function(){
          var $name=$("[name='name']");
          var $address=$("input[name='address']");
          var $description=$('textarea');
          entry_new={
              name:$name.val(),
              address:$address.val(),
              description:$description.val(),
              id:id_new
          }
          try{
              EntryModel.update(entry_new,update_callback);   
          }catch(err){
              var $error=$("div[class='error']");
              $error.html(err.message);
              return
          }
          if(entry_new.name==''||entry_new.address==''||entry_new.description==''){
              $entry.html('');  
              EditingEntryView.render($entry,activeEntryData);
          }
          else{
              delete entry_new.id;
              EntryView.render($entry,entry_new);
          }
      });
  };

  window.EditingEntryView = EditingEntryView;

})();
