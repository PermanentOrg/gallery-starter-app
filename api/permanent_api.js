/*    
Permanent Legacy Foundation
Author: Jerry Peters 5-15-2018 
*/

var permanent = (function () {
  'use strict';

  var HelloWorld;
  var view_container;
  var data_url = 'data/example_data.json';
  var the_data;

  function init() {
    HelloWorld = 'Welcome aboard from Permanent Legacy Foundation.';
    getData();
  }

  function getData(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', data_url, true);
    xhr.onload = function (e) {
      if (this.status === 200) {
        the_data = JSON.parse(this.response);
        dataLoaded();
        // callback(the_data);
      }
    };
    xhr.send();
  }

  function dataLoaded() {
    view_container = document.querySelector("[data-permanent-view]");
    var repeats = document.querySelectorAll("[p-repeat]");
    var binds = document.querySelector("[p-bind]");

    if (view_container) {

      repeats.forEach(function(repeater){
      
      if(repeater.children){
        // repeats.children
        if(repeater.children[0].hasAttribute('p-bind')){
          var attrval=repeater.getAttribute('p-repeat');
          var filters = attrval.split('in');
          var scope=filters[1].trim();
          var data=the_data[scope];
          var binder=repeater.children[0].getAttribute('p-bind').split('.')[1];
          
          

          data.forEach(function(d){
            //var div = document.createElement('div');
            var div =repeater.children[0].cloneNode();
            div.classList.add('folder-name');
            div.innerText=d[binder];
            repeater.appendChild(div);  
          });
          repeater.children[0].remove();

        }
      }
    });

      // var blocks = view_container.innerText.split(' ');
      // parser(blocks);
      // view_container.childNodes.forEach(function(element) {
      //   var c = element;
      //   if(element.hasChildNodes() && element.hasAttribute('p-repeat')){
      //     var cc=the_data;
      //     var attrval=element.getAttribute('p-repeat');
      //     var filters = attrval.split('in');
      //     var scope=filters[1].trim();
      //     var data=the_data[scope];

      //     if(element.childNodes.length>0)
      //     element.childNodes.forEach(function(cn){
      //         var ccc=cn;
      //     });
      //   }
      // });  
      
    }
  }

  function parser(blocks) {
    var content = [];
    var currentrow;
    while (blocks.length > 0) {
      var tag = parseTag(blocks.shift());
      if (tag.IsRow) {
        // if (currentrow) {
          currentrow = tag;
          content.push(currentrow);
        // }
        // else {
        //   currentrow = tag;
        // }

      }
      else {
        currentrow.AddChild(tag);
      }

    }

    var c = content.length;
  }

  function row() {
    return this;
  }

  function parseTag(lbl) {
    return new Tag(lbl);
  }

  function Tag(lbl) {
    var thisTag = this;
    this.label = lbl;
    this.AddChild = AddChild;
    this.Children = [];

    if (lbl.indexOf('row') > -1) {
      this.IsRow = true;
    }
    else if (lbl.indexOf('col') > -1) {
      this.IsCol = true;
    }

    function AddChild(tag) {
      thisTag.Children.push(tag);
    }

  }

  function StringBuilder() {

    this.theString = null;

    this.append = function (str) {
      if (this.theString === null) {
        this.theString = str;
      }
      else {
        this.theString = this.theString.concat(str);
      }
    };

    this.toString = function () {
      return this.theString;
    };

    this.clear = function () {
      this.theString = null;
    };

    return this;

  }

  return {
    HelloWorld: HelloWorld,
    Init: init,
    //getData:getData
  };


})();


