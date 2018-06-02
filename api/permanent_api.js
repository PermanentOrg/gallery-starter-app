/*    
Permanent Legacy Foundation - permanent.org
Author: Jerry Peters 5-15-2018 
*/

var permanent = (function () {
  'use strict';

  var view_container;
  var docBody;
  var data_url;
  var the_data;
  var popup;
  var popup_url;
  var VERSION = '1.0.0';

  function init() {
    view_container = document.querySelector("[permanent-view]");
    docBody = document.querySelector("[permanent-data]");
    data_url = docBody.getAttribute('permanent-data');
    popup = document.querySelector("[permanent-popup]");

    getData();

    if (popup) {
      getPopUp();
    }
  }

  function getData() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', data_url, true);
    xhr.onload = function (e) {
      if (this.status === 200) {
        the_data = JSON.parse(this.response);
        dataLoaded();
      }
    };
    xhr.send();
  }


  function dataLoaded() {
    checkProfile();
    checkView();
  }

  function checkView() {
    var repeats = document.querySelectorAll("[p-repeat]");
    var binds = document.querySelector("[p-bind]");

    if (view_container) {
      repeats.forEach(function (repeater) {
        var attrval = repeater.getAttribute('p-repeat');
        var scope = attrval.split('in')[1].trim();
        var data = the_data[scope];

        data.forEach(function (obj) {
          var rpt = repeater.cloneNode();

          if (rpt.hasAttribute('p-click')) {
            rpt.onclick = function (evt) {
              OnClick(evt, obj);
            };
          }

          for (var i = 0; i < repeater.children.length; i++) {
            var child = repeater.children[i];
            var div = child.cloneNode();
            bindChild(obj, div);
            rpt.appendChild(div);
          }
          repeater.parentNode.appendChild(rpt);
        });
        repeater.remove();
      });

    }
  }

  function checkProfile() {
    var profile = document.querySelector("[permanent-profile]");
    if (profile.children) {
      for (var i = 0; i < profile.children.length; i++) {
        var child = profile.children[i];
        bindChild(the_data['Profile'], child);
      };
    }
  }

  function bindChild(scope, child) {
    if (child.hasAttribute('p-bind')) {
      var binder = child.getAttribute('p-bind').split('.')[1];
      var data = scope[binder];
      child.innerText = data;
    }
    else if (child.hasAttribute('p-src')) {
      var binder = child.getAttribute('p-src').split('.')[1];
      var data = scope[binder];
      child.setAttribute('src', data);
    }
    else if (child.hasAttribute('p-bkgrd')) {
      var binder = child.getAttribute('p-bkgrd').split('.')[1];
      var data = scope[binder];
      child.style.backgroundImage = "url(" + data + ")";
    }
    else if(child.children.length>0){
      for(var i=0;i<child.children.length;i++){
        bindChild(scope, child.children[i]);
      }
    }

    checkTemplateStrings(scope, child);
  }

  function checkTemplateStrings(scope, child) {
    var attrWhitelist = ['alt', 'src', 'class', 'href', 'srcset', 'type', 'datetime'];
    var propWhitelist = ['innerText'];
    for (var attr of attrWhitelist) {
      if(!child.hasAttribute(attr)){
        continue
      }

      var interpolated = interpolate(scope, child.getAttribute(attr));
      if(interpolated){
        child.setAttribute(attr, interpolated);
      }
    }

    for( var prop of propWhitelist) {
      if(!child[prop]){
        continue
      }

      var interpolated = interpolate(scope, child.innerText);
      if(interpolated){
        child[prop] = interpolated;
      }
    }
  }

  function interpolate(scope, templateString){
    var rxp = /{([^}]+)}/g;
    var found = [];
    var curMatch;

    while (curMatch = rxp.exec(templateString)) {
      found.push(curMatch[1]);
    }

    if(!found.length){
      return false;
    }

    for (var match of found){
      var binder = match.split('.')[1];
      var replaceWith = scope[binder];
      var replace = '{' + match + '}';
      if(replaceWith){
        templateString = templateString.replace(replace, replaceWith);
      }
    }

    return templateString
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

  function OnClick(evt, args) {
    var pop = document.querySelector(".pop-wrapper");
    pop.classList.remove('hide');
    bindFileView(pop,args);
  }

  function getPopUp() {
    popup_url = docBody.getAttribute('permanent-popup');
    var xhr = new XMLHttpRequest();
    if (popup_url) {
      xhr.open('GET', popup_url, true);
      xhr.onload = function (e) {
        if (this.status === 200) {
          var popwrapper = document.createElement('div');
          popwrapper.classList.add('pop-wrapper');
          popwrapper.classList.add('hide');
          popwrapper.innerHTML = this.response;
          document.body.appendChild(popwrapper);
          addCloseButton(popwrapper);
        }
      };
      xhr.send();
    }
  }

  function addCloseButton(popwrapper) {
    var closeBtn = popwrapper.querySelector('[permanent-btn-close]');
    closeBtn.onclick=function(evt){
      OnPopClose(evt,popwrapper);
    };
    
  }

  function OnPopClose(evt,popwrapper){
    popwrapper.classList.add('hide');
  }

  function bindFileView(pop,file) {
    var fileview = pop.querySelector('[permanent-file-view]');
    for (var i = 0; i < fileview.children.length; i++) {
      var child = fileview.children[i];
      bindChild(file, child);
    }
    
  }


  init();

})();


