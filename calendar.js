var getDaysInMonth = function (year, month) {
    return new Date(year, month, 0).getDate();
}



var calendar = {
    month: function () {
        var d = new Date();
        return d.getMonth() + this.nextMonth;
    },

    year: function () {
        var y = new Date();
        return y.getFullYear();
    },

    nextMonth: 1,



}



var loopTable = function () {
    var k = getDaysInMonth(calendar.year(), calendar.month());
    var table = document.getElementById('myTable');
    var rows = table.rows;
    var l = 1;

    for (var i = 1; i < rows.length; i++) {
        cells = rows[i].cells;
        for (var j = 0; j < cells.length; j++) {
            if (l <= k) {
                cells[j].innerHTML = l;
            } else {
                break;
            }

            l++

        }
    }
}
loopTable();

function monthTitle() {

    var monthsArray = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
    monthNum = calendar.month();
    var monthName = monthsArray[calendar.month() - 1] + '' + calendar.year();
    var title = document.getElementById('calendarTitle');
    var nextArrow = document.getElementById('nxt');
    var leftArrow = document.getElementById('prev');
    
    
    if (monthNum >= 12) {
        nextArrow.className += ' inactiveLink';
    } 
    else if (monthNum <= 1) {
        leftArrow.className += ' inactiveLink';
    } else {
        nextArrow.classList.remove('inactiveLink');
        leftArrow.classList.remove('inactiveLink');
    }

    title.innerHTML = '';
    var titleNode = document.createTextNode(monthName);
    title.appendChild(titleNode);
    
    console.log(calendar.month());

}
monthTitle();

function nextMonth() {
    clearTable();
    calendar.nextMonth += 1;
    monthTitle();
    loopTable();
}

function previousMonth() {
    clearTable();
    calendar.nextMonth -= 1;
    monthTitle();
    loopTable();
}

function clearTable() {
    var table = document.getElementById('myTable');
    var rows = table.rows;

    for (var i = 1; i < rows.length; i++) {
        cells = rows[i].cells;
        for (var j = 0; j < cells.length; j++) {
            cells[j].innerHTML = '';
        }
    }
}

var next = document.getElementById('nxt');
var previous = document.getElementById('prev');
next.addEventListener('click', nextMonth);
previous.addEventListener('click', previousMonth);
