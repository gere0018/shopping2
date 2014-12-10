/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var grocery_gere0018 = {
    // Application Constructor
    myList: [],
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
//        document.addEventListener("DOMContentLoaded", this.onDeviceReady, false);
    },
    onDeviceReady: function() {
    grocery_gere0018.receivedEvent('deviceready');

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
          var btn= document.querySelector("#btnAdd");
          if(localStorage.getItem("grocery-gere0018")){
            grocery_gere0018.myList = JSON.parse(localStorage.getItem("grocery-gere0018"));
            console.log("exists");
            grocery_gere0018.showList();
          }else{
            console.log("empty");
          }

         btn.addEventListener("click", grocery_gere0018.addItem );
         document.addEventListener("keypress", function(e){
                    var key = e.which || e.keyCode;
                    if (key == 13) { // 13 is enter
                      // code for enter
                    grocery_gere0018.addItem(e);
                    }
             });
         },
    addItem: function(ev){
                var newItem= $("#item").val();
               if(newItem.trim() !== ''){
                ev.preventDefault();
                grocery_gere0018.myList.push(newItem );
                localStorage.setItem("grocery-gere0018",
                                     JSON.stringify(grocery_gere0018.myList) );
                grocery_gere0018.showList();
                $("#item").val('');
                return false;
               }else{
               alert('Please enter an item');
               }

            },
    removeItem:function (ev){
                var txt= ev.currentTarget.parentNode.children[1].innerHTML;
                $(this).parent().remove();
                $("#listView").listview('refresh');
                for(var i=0;i<grocery_gere0018.myList.length;i++){
                  if(grocery_gere0018.myList[i] == txt){
                      grocery_gere0018.myList.splice(i, 1);
                      var inputKey= "'" + i + "_checkbox_value"+ "'";
                      localStorage.removeItem(inputKey);
                  }
                }
    localStorage.setItem("grocery-gere0018", JSON.stringify(grocery_gere0018.myList) );
            grocery_gere0018.showList();
 },
    showList: function(){
          var $list =$("#listView");
          $list.html("");
          for(var i=0;i<grocery_gere0018.myList.length;i++){
              var input= "<input type='checkbox' class='ui-btn ui-btn-right done'>";
              var remove= "<a class ='remove ui-btn ui-btn-left ui-icon-delete ui-btn-icon-left ui-corner-all'>Delete</a>";

              var $li=$("<li><div>"+ input + "<p>" + grocery_gere0018.myList[i]+ "</p>"  + remove + "</div></li>");
                 $list.append($li);
                 $list.listview('refresh');
          }

        $(".done").each(function(i){
            var inputKey= "'" + i + "_checkbox_value"+ "'";
            $(this).click(function(){
                if($(this).is(":checked")) {
                    localStorage.setItem(inputKey, true);
                }else{
                    localStorage.setItem(inputKey, false);
                }
            });
            if(localStorage.getItem(inputKey) !== null){
             $(this).prop({checked:JSON.parse(localStorage.getItem(inputKey))});
            }
       });

        $(".remove").click(grocery_gere0018.removeItem);

}

};

grocery_gere0018.initialize();
