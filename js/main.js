/*
    Jerry Peters 5-15-2018
*/

var myCode = (function () {
  'use strict';

  var HelloWorld;
  var view_container;

  function init() {
    HelloWorld = 'Welcome aboard from Jerry Peters';
  }

  function getData(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/example_data.json', true);
    //xhr.responseType = 'blob';
    xhr.onload = function (e) {
      if (this.status === 200) {
        callback(JSON.parse(this.response));
        //this.response.type
      }
    };
    xhr.send();
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


  init();

  return {
    HelloWorld: HelloWorld,
    getData:getData
  };


})();


