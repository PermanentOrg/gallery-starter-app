permanent.onLoaded(saveData);

var perm_data;

function saveData(data) {
    perm_data = data;
}

google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    var data_from_storage = perm_data.Storage;
    
    var new_data = Object.keys(perm_data.Storage).map(function(key){
        var value = perm_data.Storage[key];
        return [key,value];
    });
    
    new_data.unshift(['storage','data']);

    var data = google.visualization.arrayToDataTable(new_data);

    var options = {
        title: 'Your storage chart'
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
}


$(document).ready(function () {

    // Script for notification 
    $('#noti_Counter')
        .css({ opacity: 0 })
        .text(perm_data.Friends.length)  // ADD DYNAMIC VALUE (YOU CAN EXTRACT DATA FROM DATABASE OR XML).
        .css({ top: '-10px' })
        .animate({ top: '-2px', opacity: 1 }, 500);

    $('#noti_Button').click(function () {

        // TOGGLE (SHOW OR HIDE) NOTIFICATION WINDOW.
        $('#notifications').fadeToggle('fast', 'linear', function () {
            if ($('#notifications').is(':hidden')) {
                $('#noti_Button').css('background-color', '#131B4A'); //#2E467C
            }
            // CHANGE BACKGROUND COLOR OF THE BUTTON.
            else $('#noti_Button').css('background-color', '#131B4A'); //#FFF
        });

        $('#noti_Counter').fadeOut('slow');     // HIDE THE COUNTER.

        return false;
    });

    // HIDE NOTIFICATIONS WHEN CLICKED ANYWHERE ON THE PAGE.
    $(document).click(function () {
        $('#notifications').hide();

        // CHECK IF NOTIFICATION COUNTER IS HIDDEN.
        if ($('#noti_Counter').is(':hidden')) {
            // CHANGE BACKGROUND COLOR OF THE BUTTON.
            $('#noti_Button').css('background-color', '#131B4A');  //#2E467C
        }
    });

    $('#notifications').click(function () {
        return false;       // DO NOTHING WHEN CONTAINER IS CLICKED.
    });

    $(".fancybox").fancybox({
        helpers: {
            buttons: {}
        }
    });

    // filter selector
    $(".filter").on("click", function () {

        var $this = $(this);
        // if we click the active tab, do nothing
        if (!$this.hasClass("active")) {
            $(".filter").removeClass("active");
            $this.addClass("active"); // set the active tab
            // get the data-rel value from selected tab and set as filter
            var $filter = $this.data("rel");
            // if we select view all, return to initial settings and show all
            $filter == 'all' ?
                $(".fancybox")
                    .attr("data-fancybox-group", "gallery")
                    .not(":visible")
                    .fadeIn()
                : // otherwise
                $(".fancybox")
                    .fadeOut(0)
                    .filter(function () {
                        // set data-filter value as the data-rel value of selected tab
                        return $(this).data("filter") == $filter;
                    })
                    // set data-fancybox-group and show filtered elements
                    .attr("data-fancybox-group", $filter)
                    .fadeIn(1000);
        } // if
    }); // on
});
