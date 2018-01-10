var cal = document.getElementById('cal')

var input = document.getElementById('input')

var span = document.getElementById('close')

input.onclick = () => {
    cal.style.display = 'block'
}

span.onclick = () => {
    cal.style.display = 'none'
}

var flag=1
var month_select = [
  'Jan','Feb','Mar','Apr',
  'May','Jun','Jul','Aug',
  'Sep','Oct','Nov','Dec'
]

var y_calendar = {
    month: document.querySelectorAll('[data-calendar-area="month"]')[0],
    next: document.querySelectorAll('[data-calendar-toggle="next"]')[0],
    previous: document.querySelectorAll('[data-calendar-toggle="previous"]')[0],
    label: document.querySelectorAll('[data-calendar-label="month"]')[0],
    activeDates: null,
    date: new Date(),
    todaysDate: new Date(),
  
    init: function () {
      this.date.setDate(1)
      this.createMonth()
      this.createListeners()
      this.createYear()
    },
  
    createListeners: function () {
      var _this = this
      this.next.addEventListener('click', function () {
        _this.clearCalendar()
        _this.date.setFullYear('2019')
        document.getElementById("year1").classList.remove('cal__date--selected')
        document.getElementById("year1").classList.remove('cal__date--today')
        this.classList.add('cal__date--selected')
        flag=0
        _this.createMonth()
      })
      // Clears the calendar and shows the previous month
      this.previous.addEventListener('click', function () {
        _this.clearCalendar()
        _this.date.setFullYear('2018')
        document.getElementById("year2").classList.remove('cal__date--selected')
        this.classList.add('cal__date--selected')
        flag=0
        _this.createMonth()
      })
    }, 

    createYear: function(){
      var yr=this.date.getFullYear()
      document.getElementById("year1").innerHTML=yr
      document.getElementById("year2").innerHTML=yr+1
    },
  
    createDay: function (num, day, year) {
      var newDay = document.createElement('div')
      var dateEl = document.createElement('span')
      dateEl.innerHTML = num
      newDay.className = 'cal__date'
      newDay.setAttribute('data-calendar-date', this.date)
  
      if (num === 1) {
        var offset = ((day) * 14.28)
        if (offset > 0) {
          newDay.style.marginLeft = offset + '%'
        }
      }
  
      if (this.date.getTime() <= this.todaysDate.getTime() - 1) {
        newDay.classList.add('cal__date--disabled')
      } else {
        newDay.classList.add('cal__date--active')
        newDay.setAttribute('data-calendar-status', 'active')
      }
  
      if (this.date.toString() === this.todaysDate.toString()) {
        newDay.classList.add('cal__date--today')
        document.getElementById('year1').classList.add('cal__date--today')
      }
  
      newDay.appendChild(dateEl)
      this.month.appendChild(newDay)
    },
  
    dateClicked: function () {
      var _this = this
      this.activeDates = document.querySelectorAll('[data-calendar-status="active"]')
      for (var i = 0; i < this.activeDates.length; i++) {
        this.activeDates[i].addEventListener('click', function (event) {
          var picked = document.querySelectorAll('[data-calendar-label="picked"]')[0]
          var input = document.querySelectorAll('[data-calendar-label="dd"]')[0]
          picked.innerHTML = this.dataset.calendarDate
          b = new Date(this.dataset.calendarDate)
          
          input.value = b.getDate() + '/' + (b.getMonth() + 1) + '/' + b.getFullYear()
          _this.removeActiveClass()
          this.classList.add('cal__date--selected')
        })
      }
    },
 
  
    createMonth: function () {
      
      this.clearCalendar()
      var _this=this
      
      var currentMonth = this.date.getMonth()
      while (this.date.getMonth() === currentMonth) {
        this.createDay(this.date.getDate(), this.date.getDay(), this.date.getFullYear())
        this.date.setDate(this.date.getDate() + 1)
      }
      // while loop trips over and day is at 30/31, bring it back
      this.date.setDate(1)
      this.date.setMonth(this.date.getMonth() - 1)
      this.monthTable()
      this.dateClicked()
      m=document.getElementById("month")

      if (this.date.getMonth() <= currentMonth - 1) {
        m.classList.add('cal__date--disabled')
      } else {
       // m.classList.add('cal__date--active')
        //m.setAttribute('data-calendar-status', 'active')
      }

      var table = document.querySelector('table')
      var selectedCells = table.getElementsByClassName('cal__date--selected')
      
      table.addEventListener('click', function(e) {
        var td = e.target

        for(var p=0;p<month_select.length;p++)
        if(td.innerHTML==month_select[p])
        {
          flag=0
          new_month=month_select.indexOf(td.innerHTML)
          _this.date.setMonth(new_month)
          
         _this.createMonth()
        }
        
        if (td.tagName !== 'TD') {
          return
        }
        
        if (selectedCells.length) {
          selectedCells[0].className = ''    
        }
      
        td.className = 'cal__date--selected'

        
      })
      
    },
    
  
  
    monthTable: function () {
      
      if(flag==1){
      var months = [
        ['January','February','March','April'],
        [ 'May','June','July','August'],
        ['September','October','November','December']
    ]
    
    var _month, tab, tr, td, tn, row, col
    _month = document.getElementById('month')
    tab = document.createElement('table');
    for (row=0; row < months.length; row++){
        tr = document.createElement('tr')
        for (col=0; col < months[row].length; col++){
            td = document.createElement('td');
            tn = document.createTextNode(months[row][col].substring(0,3))
            
            td.appendChild(tn)
            tr.appendChild(td)
            
        }
        tab.appendChild(tr)
    }
    _month.appendChild(tab)

  }

    },

    
  
    clearCalendar: function () {
      y_calendar.month.innerHTML = ''
    },
  
    removeActiveClass: function () {
      for (var i = 0; i < this.activeDates.length; i++) {
        this.activeDates[i].classList.remove('cal__date--selected')
      }
    }
  }
