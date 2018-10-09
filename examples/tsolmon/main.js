
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
    //   });

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


      myData.Folders.Folders.forEach(function (f) {
        var li = document.createElement('li');
        li.innerText = f.displayName;
        $('.left-menu ul').append(li);
      });

    }


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