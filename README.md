# permanent-client-api

Permanent.org is a digital file preservation platform - built for all of humankind to archive their digital legacies, permanently. The application includes many features that allow users to customize how they preserve their files such as private sharing, an encrypted vault and a public section that allows anyone to share their story with the world.


However, files don’t tell a story on their own. While adding titles and descriptions help, presenting content in beautiful ways, such as a timeline or a mosaic, is a much more effective way of sharing memories and personal history. These “views”, as we’re calling them, allow anyone to dynamically capture a narrative around their content and really tell their story.

With your help, we can create more of these views to help anyone tell their story. Together, we can make it easier to capture human history, the way people would want it told.

The Permanent Legacy Client API is a framework consisting of HTML and javascript. The current design is intended to be very lightweight and limited to the purpose of creating views for content hosted on Permanent.org. As the contributor community grows, the API will evolve to support many features including interfacing with the permanent.org REST API.

### Vision
Visit the link below to learn more about our vision and see examples of some of the views already built.

https://www.permanent.org/vision/

### Benefits

Permanent.org is the first cloud storage platform of its kind; built with humanity in mind. As more and more of our content becomes digital, we are the solution the world needs for reliable, safe and permanent data storage. We need your help to make a real change in how our digital data is handled and we'd love to show off your work and make (and capture!) history together.

https://www.permanent.org/about/

Join our team and put your dent in the universe.



### How it works

First you create a view using this API and the HTML Directives. Next it will be reviewed by our team for quality control. Then the view will be accepted for inclusion into the view gallery. The view will automatically be bound to the data in a folder. Simply using the HTML Directives below is all it takes for views to work in the system. 


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
  
  
  
  
  A complete example can be found in the examples folder of this repo.
  
  Let's building something great.  