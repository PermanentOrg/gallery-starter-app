
(function () {
  'use strict';

  var myData = [];

  function init() {

    $(document).ready(function () {
      loadXMLDoc();

      $(".modal-footer button").on("click", function () {
        var copyText = document.getElementById("urlholder");
        copyText.select();
        document.execCommand("copy");
      });
    });
  }


  function loadXMLDoc() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
        if (xmlhttp.status == 200) {
          myData = JSON.parse(xmlhttp.responseText);
          buildLeftNav();
          // setTimeout(function(){ 
          $('.menu-list li:first').trigger('click');
          // }, 1000);
        }
        else if (xmlhttp.status == 400) {
          alert('There was an error 400');
        }
        else {
          alert('something else other than 200 was returned');
        }
      }
    };

    xmlhttp.open("GET", "data2.json", true);
    xmlhttp.send();
  }


  function buildLeftNav() {

    var img = document.createElement('img');
    img.src = myData.Profile.Files[0].thumbURL200;
    $('.left-menu .thumb').append(img);
    $('.left-menu > .name')[0].innerText = myData.Profile.fullName;

    if (myData.Folders.Folders) {
      buildTree(myData.Folders.Folders);
    }

  }

  function buildTree(folders, parentArchNbr) {
    if (folders) {
      folders.forEach(function (f) {
        var li = document.createElement('li');
        var icon = document.createElement('i');
        var span = document.createElement('span');

        span.innerText = f.displayName;
        icon.classList.add('fa');
        icon.classList.add('fa-2x');
        li.setAttribute('data-archnbr', f.archiveNbr);


        if (f.Folders && f.Folders.length > 0) {
          icon.classList.add('fa-caret-right');
          li.classList.add('c-pointer');
          li.classList.add('top-lvl');
          li.appendChild(icon);
          li.appendChild(span);
          var ul = document.createElement('UL');
          ul.setAttribute('data-archnbr', f.archiveNbr);
          ul.classList.add('closed');
          ul.classList.add('submenu');
          li.addEventListener('click', OnClick);
          li.appendChild(ul);
        }
        else if (!parentArchNbr && f.Folders && f.Folders.length == 0) {
          icon.classList.add('fa-caret-right');
          li.classList.add('c-pointer');
          li.classList.add('top-lvl');
          li.appendChild(icon);
          li.appendChild(span);
        }
        else {
          li.appendChild(span);
        }

        li.addEventListener('click', OnClick, { useCapture: true });

        if (parentArchNbr) {
          li.setAttribute('data-parent', parentArchNbr);
          $('.left-menu ul[data-archnbr="' + parentArchNbr + '"]').append(li);
        }
        else {
          $('.left-menu ul').append(li);
        }

        if (f.Folders && f.Folders.length > 0) {
          buildTree(f.Folders, f.archiveNbr);
        }
      });
    }
  }

  function OnClick(evt) {

    evt.stopPropagation();
    var archNbr = evt.currentTarget.getAttribute('data-archnbr');

    if (evt.currentTarget.classList.contains('top-lvl')) {
      if (evt.currentTarget.classList.contains('opened')) {
        evt.currentTarget.classList.remove('opened');
        $(evt.currentTarget).children('ul').removeClass('open');
        $(evt.currentTarget).children('ul').addClass('closed');
      }
      else {
        evt.currentTarget.classList.add('opened');
        $(evt.currentTarget).children('ul').addClass('open');
        $(evt.currentTarget).children('ul').removeClass('closed');
      }
    }
    else {
      var n = evt.currentTarget.getAttribute('data-archnbr');
    }
    loadFolder(archNbr);

  }

  function loadFolder(archNbr) {
    $('.main-body').empty();
    var res = fetchChild(myData, { key: 'archiveNbr', val: archNbr }).then(function (res) {

      var header = document.createElement('div');
      header.classList.add('h1');
      header.innerText = res.displayName;
      $('.main-body').append(header);

      if (res.Files) {
        var fileContainer = document.createElement('div');
        fileContainer.classList.add('file-list');

        res.Files.forEach(function (f) {
          var file = document.createElement('div');
          file.classList.add('file');
          file.setAttribute('data-archnbr', f.archiveNbr);
          file.style.backgroundImage = 'url(' + f.thumbURL200 + ')';

          // var name = document.createElement('span');
          // name.innerText = f.displayName;
          // file.appendChild(name);

          file.addEventListener('click', OnFileClick, { useCapture: true });
          fileContainer.appendChild(file);

        });
        $('.main-body').append(fileContainer);
      }


    });



  }

  function fetchChild(node, qry) {
    return new Promise(function (resolve, reject) {
      if (node[qry.key] == qry.val) {
        resolve(node);
        return;
      }
      var keys = Object.keys(node);
      for (var i = 0; i < keys.length; i++) {
        if (typeof node[keys[i]] == 'object') {
          fetchChild(node[keys[i]], qry).then(function (res) {
            resolve(res);
          });
        }
      }
    });
  }

  function OnFileClick(evt) {
    evt.stopPropagation();
    var archNbr = evt.currentTarget.getAttribute('data-archnbr');
    var res = fetchChild(myData, { key: 'archiveNbr', val: archNbr }).then(function (res) {
      $('#myModalLabel').text(res.displayName);
      $('#urlholder').val(res.fileURL);
      viewImage(res);
    });

  }


  function viewImage(file) {
    //res.thumbURL200
    $('.imagepreview').attr('src', file.thumbURL200); // here asign the image to the modal when the user click the enlarge link
    $('#fileanchor').attr('href', file.thumbURL2000);

    // $('.imagepreview').attr('src', imageURL); 
    $('#imagemodal').modal('show'); // imagemodal is the id attribute assigned to the bootstrap modal, then i use the show function
  }


  init();


})();