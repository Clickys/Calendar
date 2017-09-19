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
    var daysInMonth = getDaysInMonth(calendar.year(), calendar.month());
    var table = document.getElementById('myTable');
    var rows = table.rows;
    var l = 1;
    var month = calendar.month();
    var year = calendar.year();
    var firstDay = new Date(year + "-" + month).getDay();
    var currentDay = new Date().getDay();
    var dayOfMonth = new Date().getDate();

    console.log(dayOfMonth);
    for (var i = 1; i < rows.length; i++) {

        if (rows[i] == rows[1]) {

            var k = 1;

            for (var j = firstDay; j < rows[i].cells.length; j++) {

                if (k === dayOfMonth) {
                    rows[i].cells[j].style.backgroundColor = 'white'
                    console.log('iam in style');
                    console.log(rows[i].cells[j])

                }

                if (k <= daysInMonth) {
                    console.log('iam in k <')
                    rows[i].cells[j].innerHTML = k;
                    k++
                }

            }
        } else {
            for (let j = 0; j < rows[i].cells.length; j++) {
                if (k === dayOfMonth) {
                    rows[i].cells[j].style.backgroundColor = 'white'
                }
                if (k <= daysInMonth) {
                    rows[i].cells[j].innerHTML = k;
                    k++
                }
            }
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
    } else if (monthNum <= 1) {
        leftArrow.className += ' inactiveLink';
    } else {
        nextArrow.classList.remove('inactiveLink');
        leftArrow.classList.remove('inactiveLink');
    }

    title.innerHTML = '';
    var titleNode = document.createTextNode(monthName);
    title.appendChild(titleNode);


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
