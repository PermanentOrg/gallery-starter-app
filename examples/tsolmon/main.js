
(function () {
  'use strict';

  var copyEmailBtn = document.querySelector('.js-emailcopybtn');
  let myData = [];
  let openRow = "<div class='row'>";
  let closeRow = "</div><br/>"


  function init() {

    // $(document).ready(function () {
    //   $(".pop").on("click", function () {
    //     $('.imagepreview').attr('src', $('#imageresource').attr('src')); // here asign the image to the modal when the user click the enlarge link
    //     $('.js-emaillink').html($('#imageresource').attr('src'));
    //     $('#imagemodal').modal('show'); // imagemodal is the id attribute assigned to the bootstrap modal, then i use the show function
    //   });k

    //   $("#copyClipboard").on("click", function () {
    //     var copyText = $('#imageURL').attr('src');
    //     copyText.select();
    //     document.execCommand("copy");
    //     alert("Copied the text: " + copyText.value);

    //   });


    //   copyEmailBtn.addEventListener('click', function (event) {
    //     // Select the email link anchor text
    //     var emailLink = document.querySelector('.js-emaillink');
    //     var range = document.createRange();
    //     range.selectNode(emailLink);
    //     window.getSelection().addRange(range);

    //     try {
    //       // Now that we've selected the anchor text, execute the copy command
    //       var successful = document.execCommand('copy');
    //       var msg = successful ? 'successful' : 'unsuccessful';
    //       alert('Copying URL was ' + msg);
    //     } catch (err) {
    //       alert('Oops, unable to copy');
    //     }

    //     // Remove the selections - NOTE: Should use
    //     // removeRange(range) when it is supported
    //     window.getSelection().removeAllRanges();
    //   });

    // });

    loadXMLDoc();

  }

  // function myFunction() {
  //   var copyText = document.getElementById("imageURL");
  //   copyText.select();
  //   document.execCommand("copy");
  //   alert("Copied the text: " + copyText.value);
  // }


  function loadXMLDoc() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
        if (xmlhttp.status == 200) {
          myData = JSON.parse(xmlhttp.responseText);
          buildLeftNav();
          // document.getElementById("myDiv").innerHTML = displayData(myData);
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
          // ul.classList.add('indent');
          ul.classList.add('closed');
          ul.classList.add('submenu');
          li.addEventListener('click', OnClick);
          li.appendChild(ul);
        }
        else {
          // li.appendChild(icon);
          li.appendChild(span);
        }
        if (parentArchNbr) {
          li.setAttribute('data-parent', parentArchNbr);
          // li.classList.add('indent');
          // li.classList.add('closed');
          li.addEventListener('click', OnClick, { useCapture: true });
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
      var ss = res;

      $('.main-body').append(archNbr);
      $('.main-body').append(res);

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

  function viewImage(imageURL) {
    $('.imagepreview').attr('src', imageURL); // here asign the image to the modal when the user click the enlarge link
    $('.js-emaillink').html(imageURL);
    $('#imagemodal').modal('show'); // imagemodal is the id attribute assigned to the bootstrap modal, then i use the show function
  }

  function goBack() {
    location.reload();
  }

  function gotoFolder(folderId) {
    let folderData;
    for (let folder of myData.Folders) {
      if (folder.archiveNbr == folderId) {
        folderData = folder;
        break;
      }
    }
    document.getElementById("myDiv").innerHTML = "<input type='button' value='BACK' onclick='goBack();' /><br/>" + getHTMLFromFile(folderData.Files);
  }

  function getHTMLFromFile(files) {
    let columnCount = 0;
    let responseText = "<br/><br/>Files:<br/>";
    for (let file of files) {
      let fileIcon = '<a href="#" onclick=viewImage("' + file.thumbURL200 + '");><img src="' + file.thumbURL200 + '"/>' + file.displayName + '</a>';
      let displayName = '<div class="col-md-2">' + fileIcon + '</div>&nbsp;&nbsp;';
      responseText += displayName;
      columnCount++;
      if (columnCount == 6) {
        columnCount = 0;
        responseText += closeRow;
        responseText += openRow;
      }
    }

    return responseText;
  }

  function displayData(jsonData) {
    let folders = jsonData.Folders;
    let files = jsonData.Files;
    let columnCount = 0;
    let responseText = "<br/>Folders:<br/><br/>";

    responseText += openRow;
    for (let folder of folders) {
      let folderIcon = '<button type="button" class="btn btn-default" aria-label="Left Align" onclick=gotoFolder("' + folder.archiveNbr + '");><span class="glyphicon glyphicon-folder-close" aria-hidden="true">' + folder.displayName + '</span></button>';
      let displayName = "<div class='col-md-2'>" + folderIcon + "</div>";
      responseText += displayName;
      columnCount++;
      if (columnCount == 6) {
        columnCount = 0;
        responseText += closeRow;
        responseText += openRow;
      }
    }
    responseText += getHTMLFromFile(files);
    return responseText;
  }


  init();


})();