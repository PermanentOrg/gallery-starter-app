
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

  // function parser(blocks) {
  //   var content = [];
  //   var currentrow;
  //   while (blocks.length > 0) {
  //     var tag = parseTag(blocks.shift());
  //     if (tag.IsRow) {
  //       // if (currentrow) {
  //       currentrow = tag;
  //       content.push(currentrow);
  //       // }
  //       // else {
  //       //   currentrow = tag;
  //       // }

  //     }
  //     else {
  //       currentrow.AddChild(tag);
  //     }

  //   }

  //   var c = content.length;
  // }

  // function row() {
  //   return this;
  // }

  // function parseTag(lbl) {
  //   return new Tag(lbl);
  // }

  // function Tag(lbl) {
  //   var thisTag = this;
  //   this.label = lbl;
  //   this.AddChild = AddChild;
  //   this.Children = [];

  //   if (lbl.indexOf('row') > -1) {
  //     this.IsRow = true;
  //   }
  //   else if (lbl.indexOf('col') > -1) {
  //     this.IsCol = true;
  //   }

  //   function AddChild(tag) {
  //     thisTag.Children.push(tag);
  //   }

  // }
