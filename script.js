$(document).ready(function () {
    // Function to update the current date and time //
    function updateDateTime() {
      const currentDateTimeElement = document.getElementById("currentDateTime");
      const format = "MMM DD, YYYY [at] hh:mm:ss A";
      const currentDateTime = dayjs().format(format);
      currentDateTimeElement.textContent = currentDateTime;
    }
  
    // Function to display the current day at the top of the calendar //
    function displayCurrentDay() {
      const currentDay = dayjs().format("dddd, MMMM D");
      $("#currentDay").text(currentDay);
    }
  
    displayCurrentDay();
    updateDateTime();
  
    //  Time blocks for standard business hors (9am–5pm) //
    function createCalendar() {
      const container = $(".container");
      const currentTime = dayjs().hour(); 
  
      for (let hour = 9; hour <= 17; hour++) {
        const timeBlock = $("<div>").addClass("time-block");
        const hourLabel = $("<div>").addClass("hour").text(dayjs().hour(hour).format("hA"));
        const eventInput = $("<textarea>").addClass("event-input");
  
        //  past, present, or future class based on the current time //
        if (hour < currentTime) {
          timeBlock.addClass("past");
        } else if (hour === currentTime) {
          timeBlock.addClass("present");
        } else {
          timeBlock.addClass("future");
        }
  
        // Retrieve and display saved events from local storage //
        const savedEvent = localStorage.getItem(`event-${hour}`);
        if (savedEvent) {
          eventInput.val(savedEvent);
        }
  
        const saveButton = $("<button>").addClass("save-btn").text("Save");
  
        // Save event to local storage when the save button is clicked //
        saveButton.on("click", function () {
          const eventText = eventInput.val();
          localStorage.setItem(`event-${hour}`, eventText);
        });
  
        timeBlock.append(hourLabel, eventInput, saveButton);
        container.append(timeBlock);
      }
    }
  
    createCalendar();
  });
  