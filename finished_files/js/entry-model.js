(function() {
  var EntryModel = {};
  var ENTRIES_URL = '/entries';
  var STATUS_OK = 200;
  /* Loads all entries from the server.
   *
   * Calls: callback(error, entries)
   * error -- the error that occurred or NULL if no error occurred
   * entries -- an array of entries
   */
   loadAll_callback=function(error,entries){
      console.log(error);
      console.log(entries);
   };  
   EntryModel.loadAll = function(callback) {
      var request=new XMLHttpRequest();
      var parsed_resp;
      var resp;
      request.addEventListener('load',function(){
          if(request.status!=STATUS_OK){
              callback(request.responseText,null);
          }
          else{
              var resp=request.response;
              parsed_resp=JSON.parse(resp);
              localStorage.clear();
              for(var i=0;i<parsed_resp.length;i++){
                  localStorage.setItem(i.toString(),JSON.stringify(parsed_resp[i]));
              }
              callback(null,parsed_resp);
          }
      });
      request.open('GET',ENTRIES_URL);
      request.send();
  };  
  /* Adds the given entry to the list of entries. The entry must *not* have
   * an id associated with it.
   *
   * Calls: callback(error, entry)
   * error -- the error that occurred or NULL if no error occurred
   * entry -- the entry added, with an id attribute
   */
  add_callback=function(error,entries){
      console.log(error);
      console.log(entries);
   };  
  EntryModel.add = function(entry, callback) {
      var request=new XMLHttpRequest();
      request.addEventListener('load',function(){
          if(request.status!=STATUS_OK)
              callback(request.responseText);
          else{
              var resp=request.response;
              var parsed_resp=JSON.parse(resp);
              callback(null,parsed_resp);
          }
      });
      request.open('POST',ENTRIES_URL);
      request.setRequestHeader('content-type','application/json');
      request.send(JSON.stringify(entry));
  };
  /* Updates the given entry. The entry must have an id attribute that
   * identifies it.
   *
   * Calls: callback(error)
   * error -- the error that occurred or NULL if no error occurred
   */
  update_callback=function(error){
      console.log(error);
  }
  EntryModel.update = function(entry, callback) {
      var request=new XMLHttpRequest();
      request.addEventListener('load',function(){
           if(request.status!=STATUS_OK)
              callback(request.responseText);
          else{
              var resp=request.response;
              var parsed_resp=JSON.parse(resp);
              callback(null);
          }
      });
      var id_info=entry.id;
      request.open('POST',ENTRIES_URL+'/'+id_info);
      request.setRequestHeader('content-type','application/json');
      request.send(JSON.stringify(entry));
  };
  /* Deletes the entry with the given id.
   *
   * Calls: callback(error)
   * error -- the error that occurred or NULL if no error occurred
   */
  remove_callback=function(error){
      console.log(error);
  }
  EntryModel.remove = function(id, callback) {   
      var request=new XMLHttpRequest();
      request.addEventListener('load',function(){
          callback(request.responseText);
              });
      request.open('POST',ENTRIES_URL+'/'+id+'/delete');
      request.send();
  };
  window.EntryModel = EntryModel;
})();