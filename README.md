# permanent-client-api

Permanent.org is a digital file preservation platform for archiving files. The platform has a website with many features including special folders for organizing files. One such folder, called the 'Public' folder, is for sharing files with the world.

Sharing files and folders is better with views. Views allow people to personalize their content and make things more exciting.

This project is about building views for folders and files. Together we can make exciting new ways for people to see and use their content.

The Permanent Legacy Client API is a framework consisting of HTML and java script. The current design is intended to be very lightwieght and limited to the purpose of creating views for content hosted on permanent.org. As the contributor community grows the API will evolve to support many features including interfacing with the permanent.org REST API.


### Getting Started

No prior coding skills are required but some basic knowledge of HTML and CSS certainly helps. To build a view you use the framework HTML directives. No java script skills are required.



### Requirements

1. An editor

> Use an online editor such as https://thimble.mozilla.org/

> Or go a little more advanced and set up a local http server such as: https://www.npmjs.com/package/http-server


### HTML Directives

    permanent-data 
    This is how data is loaded for testing your views.
    <body permanent-data="ex1_data.json" >
    
    permanent-popup
    If you want to have a pop up page for showing a single file
    set the name of your pop up html page.
    <body permanent-popup="popup.html">

    permanent-profile
    Bind an element to the Profile data object.
    <div permanent-profile>
      <img p-src="profile.thumbnail">
      <div p-bind="profile.archiveNbr"></div>
      <div p-bind="profile.fullName"></div>
    </div>

    p-src
    Bind an HTML image tag source. 
    <img p-src="profile.thumbnail" class="profile-img">

    p-bind
    Bind some data field.
    <div p-bind="profile.archiveNbr"></div>
       
    permanent-view
    Declare a view region.
    <div permanent-view></div>
    
    p-repeat
    For repeating items in a list.
    <div p-repeat="folder in Folders">
       <img p-src="folder.thumbnail">
       <div p-bind="folder.name" ></div>
    </div>

    p-bkgrd
    Setting an element's background image source.
    <div p-bkgrd="file.thumbnail" ></div>

    p-click
    Enable this HTML element to be clicked.
    <div p-repeat="file in Files" p-click="file">
    </div>
  
  
  Let's building something great.  