(function() {

  var CreatingEntryView = {};

  /* Renders a view to allow the user to create an entry. Requires the $entry
   * element. */
      CreatingEntryView.render = function($entry) {
          $entry.html('');  
      var entry_render={
          creating:true,
          entries:null,
          activeEntryData:null
      }
    $entry.append(Templates.renderEntry(entry_render));
    $("button[class='green add']").click(function(event){
          var $name=$("[name='name']");
          var $address=$("input[name='address']");
          var $description=$('textarea');
          var entry_add={
              name:$name.val(),
              address:$address.val(),
              description:$description.val()
          }
          try{
              EntryModel.add(entry_add,add_callback);   
          }catch(err){
              var $error=$("div[class='error']");
              $error.html(err.message);
              return
          }
          if(entry_add.name==''||entry_add.address==''||entry_add.description==''){
              CreatingEntryView.render($entry);
          }
          else{
              EntryView.render($entry,entry_add);
          }
      })
  };

  window.CreatingEntryView = CreatingEntryView;

})();
