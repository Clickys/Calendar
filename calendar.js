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
    
    cellColor: 'white',
    
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

 
    for (let i = 1; i < rows.length; i++) {

        if (rows[i] == rows[1]) {

            var k = 1;

            for (let j = firstDay; j < rows[i].cells.length; j++) {

                if (k === dayOfMonth && calendar.nextMonth === 1) {
                    rows[i].cells[j].style.backgroundColor = calendar.cellColor;
             

                }

                if (k <= daysInMonth) {
                    rows[i].cells[j].innerHTML = k;
                    k++
                }

            }
        } else {
            for (let j = 0; j < rows[i].cells.length; j++) {
                if (k === dayOfMonth && calendar.nextMonth === 1) {
                    rows[i].cells[j].style.backgroundColor = calendar.cellColor;
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

    console.log(monthName);
    if (monthName === ('Dec.' + '' + calendar.year())){
        xmas();
    }
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
            if (cells[j].innerHTML = '') {
                cells[j].style.display = 'none';
            }
            cells[j].innerHTML = '';
            cells[j].style.backgroundColor = '#D9534F';
            cells[j].style.emptyCells = 'hide';
        }
    }
}

var next = document.getElementById('nxt');
var previous = document.getElementById('prev');
var table = document.getElementById('myTable');
var cell = table.rows;
next.addEventListener('click', nextMonth);
previous.addEventListener('click', previousMonth);





// CANVAS SNOWFLAKES
function xmas() {
    var canvas = document.getElementById('myCan');
    var ctx = canvas.getContext('2d');
     

    	//canvas dimensions
	var W = window.innerWidth;
	var H = window.innerHeight;
	canvas.width = W;
	canvas.height = H;
	
	//snowflake particles
	var mp = 45; //max particles
	var particles = [];
	for(var i = 0; i < mp; i++)
	{
		particles.push({
			x: Math.random()*W, //x-coordinate
			y: Math.random()*H, //y-coordinate
			r: Math.random()*6+1, //radius
			d: Math.random()*mp //density
		})
	}
	
	//Lets draw the flakes
	function draw()
	{
		ctx.clearRect(0, 0, W, H);
		
		ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
		ctx.beginPath();
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
			ctx.moveTo(p.x, p.y);
			ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
		}
		ctx.fill();
		update();
	}
	
	//Function to move the snowflakes
	//angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
	var angle = 0;
	function update()
	{
        
		angle += 0.01;
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
			//Updating X and Y coordinates
			//We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
			//Every particle has its own density which can be used to make the downward movement different for each flake
			//Lets make it more random by adding in the radius
			p.y += Math.cos(angle+p.d) + 1 + p.r/2;
			p.x += Math.sin(angle) * 2;
			
			//Sending flakes back from the top when it exits
			//Lets make it a bit more organic and let flakes enter from the left and right also.
			if(p.x > W+5 || p.x < -5 || p.y > H)
			{
				if(i%3 > 0) //66.67% of the flakes
				{
					particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
				}
				else
				{
					//If the flake is exitting from the right
					if(Math.sin(angle) > 0)
					{
						//Enter from the left
						particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d};
					}
					else
					{
						//Enter from the right
						particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d};
					}
				}
			}
		}
	}
    setInterval(draw, 33);
}
