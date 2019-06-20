
function searchList() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}


function addToList(textName,link,agency,amount,dueDate,description) {
  var ul = document.getElementById("myUL");
  var li = document.createElement("li");

  var att = document.createAttribute("agency");       // Create a "agency" attribute
  att.value = agency;                           // Set the value of the agency attribute
  li.setAttributeNode(att);
  var att = document.createAttribute("amount");       // Create a "amount" attribute
  att.value = amount;                           // Set the value of the amount attribute
  li.setAttributeNode(att);
  var att = document.createAttribute("duedate");       // Create a "duedate" attribute
  att.value = dueDate;                           // Set the value of the duedate attribute
  li.setAttributeNode(att);
  var att = document.createAttribute("description");       // Create a "description" attribute
  att.value = description;                           // Set the value of the desciption attribute
  li.setAttributeNode(att);
  var att = document.createAttribute("onmouseover");       // Create a "onmouseover" attribute
  att.value = "displayText(this)";                           // Set the value of the onmouseover attribute
  li.setAttributeNode(att);

  var info = "Agency: "+ agency + "\nAmount: " + amount + "\nDue Date: " + dueDate;
  //console.log(info);
  li.innerHTML = "<a href = "+link+">"+textName+"</a>";
  ul.appendChild(li);
}

function displayText(box){
	$("#agencyname").html($(box).attr('agency'));
	$("#amountnumber").html($(box).attr('amount'));
	$("#duedatenumber").html($(box).attr('duedate'));
	$("#descriptiontext").html($(box).attr('description'));
}

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "../data.txt",
        dataType: "text",
        success: function(data) {processData(data);}
     });



});

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = [];
            for (var j=0; j<headers.length; j++) {
                //tarr.push(headers[j]+":"+data[j]);
                tarr.push(data[j]);
            }
            lines.push(tarr);
        }
    }
    // alert(lines);
   // console.log(lines.length);
    var i;
    for(i = 0; i < lines.length; i++){
        addToList(lines[i][0],lines[i][1],lines[i][2],lines[i][3],lines[i][4],lines[i][5])
    }
}

//on startup of site
jQuery(document).ready(function($) {


});

$( window ).on("load", function() {
  // Get the button that opens the modal
var btn = document.querySelectorAll("button.modal-button");

// All page modals
var modals = document.querySelectorAll('.modal');

// Get the <span> element that closes the modal
var spans = document.getElementsByClassName("close");

// When the user clicks the button, open the modal
for (var i = 0; i < btn.length; i++) {
 btn[i].onclick = function(e) {
    e.preventDefault();
    modal = document.querySelector(e.target.getAttribute("href"));
    modal.style.display = "block";
 }
}

// When the user clicks on <span> (x), close the modal
for (var i = 0; i < spans.length; i++) {
 spans[i].onclick = function() {
    for (var index in modals) {
      if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";
    }
 }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
     for (var index in modals) {
      if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";
     }
    }
}
});
