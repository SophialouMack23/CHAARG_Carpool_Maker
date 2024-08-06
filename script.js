// script.js

// Define and initialize outputElement
let outputElement = document.getElementById('outputData');
let outputTitleElement = document.getElementById('outputTitle');
let outputSubTitleElement = document.getElementById('outputSubTitle');
let outputTextElement = document.getElementById('outputText');
let outputQuestionElement = document.getElementById('outputQuestions');

let form, label, input, submitButton;

// Variable to store the number of columns
let numberOfColumns;

// Your displayInfo function
function displayInfo(fileInput) {
  outputTitleElement.innerHTML = '<h2>Thanks! </h2>';
  outputSubTitleElement.innerHTML = '<p>Now, please help to answer these questions about the data :)</p>';

  // Check if files were selected
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      // Get the content of the CSV file
      const csvContent = e.target.result;

      // Split the content into lines
      const lines = csvContent.split('\n');

      // Create a table element
      const table = document.createElement('table');

      // Create the first row for column labels
      const labelsRow = document.createElement('tr');
      for (let i = 0; i < lines[0].split(',').length; i++) {
        const labelCell = document.createElement('th');
        labelCell.textContent = i;
        labelsRow.appendChild(labelCell);
      }
      table.appendChild(labelsRow);

      // Store the number of columns
      numberOfColumns = labelsRow.children.length;

      // Iterate through each line starting from the second line (index 1)
      for (let j = 1; j < lines.length; j++) {
        const line = lines[j];
        const rowData = line.split(',');

        // Create a table row
        const row = document.createElement('tr');

        // Create table cells and populate them with line data
        rowData.forEach((cellData) => {
          const cell = document.createElement('td');
          cell.textContent = cellData;
          row.appendChild(cell);
        });

        // Append the row to the table
        table.appendChild(row);
      }

      // Add styling for borders
      table.style.borderCollapse = 'collapse';
      table.style.width = '100%';

      // Style the header row
      labelsRow.style.border = '1px solid #ddd';
      labelsRow.style.backgroundColor = '#f2f2f2';

      // Style the table cells
      const cells = table.querySelectorAll('td, th');
      cells.forEach((cell) => {
        cell.style.border = '1px solid #ddd';
        cell.style.padding = '8px';
        cell.style.textAlign = 'left';
      });

      // Append the table to the outputElement
      outputElement.appendChild(table);
    };

    // Read the file as text
    reader.readAsText(file);
  } else {
    outputElement.innerHTML = '<p>No file selected.</p>';
  }
  document.getElementById('chooseFileLabel').style.display = 'none';
  document.querySelector('button').style.display = 'none';

  askUserQuestions(numberOfColumns);
}

function askUserQuestions(numberOfColumns) {
  outputQuestionElement.innerHTML = '<p>Now, we need to confirm that the data is in the expected columns. </p>';
  let dataColumns = {
    name: 1,
    phoneNum: 2,
    location: 3,
    drivingStatus: 4,
    numSeats: 5
  }

  // FIRST QUESTION
  outputQuestionElement.innerHTML = '<p>Will there be carpools leaving at different times?</p>';

  // Create yes and no buttons
  const noButton = document.createElement('button');
  noButton.textContent = 'No';
  noButton.onclick = function () {
    outputQuestionElement.innerHTML = '<p>Okay! Thanks for the info</p>';
    dataColumns.timeSlot = -1;
    // SECOND QUESTION
    askNameColumnQuestion(function (nameSlotColumnNum) {
      dataColumns.name = nameSlotColumnNum;
      console.log(dataColumns);

      // THIRD QUESTION (If there are more questions)
      askPhoneNumQuestion(function (nameSlotColumnNum) {
        dataColumns.phoneNum = nameSlotColumnNum;
        console.log(dataColumns);

        // FOURTH QUESTION (If there are more questions)
        askLocationQuestion(function (nameSlotColumnNum) {
          dataColumns.location = nameSlotColumnNum;
          console.log(dataColumns);

          // FIFTH QUESTION (If there are more questions)
          askDriverStatusQuestion(function (nameSlotColumnNum) {
            dataColumns.drivingStatus = nameSlotColumnNum;
            console.log(dataColumns);

            // THIRD QUESTION (If there are more questions)
            askNumSeatsQuestion(function (nameSlotColumnNum) {
              dataColumns.numSeats = nameSlotColumnNum;
              console.log(dataColumns);

                outputTitleElement.innerHTML = '<h2>Your carpools: </h2>';
                console.log(`Just asked the questions!`);
                outputSubTitleElement.innerHTML = '<p>Here is a suggestion for how the carpools. Use this space to move people around as you see fit. Enjoy your workout!</p>';
              
                handleFileSelect(fileInput, dataColumns);
                
              });
              
            });
          });
        });
      });
  };
  
  const yesButton = document.createElement('button');
  yesButton.textContent = 'Yes';
  yesButton.onclick = function () {

    // FIRST-SUB QUESTION
    askTimeSlotColumnQuestion(function (timeSlotColumnNum) {
      dataColumns.timeSlot = timeSlotColumnNum;
      console.log(dataColumns);

      // SECOND QUESTION
      askNameColumnQuestion(function (nameSlotColumnNum) {
        dataColumns.name = nameSlotColumnNum;
        console.log(dataColumns);

        // THIRD QUESTION (If there are more questions)
        askPhoneNumQuestion(function (nameSlotColumnNum) {
          dataColumns.phoneNum = nameSlotColumnNum;
          console.log(dataColumns);

          // FOURTH QUESTION (If there are more questions)
          askLocationQuestion(function (nameSlotColumnNum) {
            dataColumns.location = nameSlotColumnNum;
            console.log(dataColumns);

            // FIFTH QUESTION (If there are more questions)
            askDriverStatusQuestion(function (nameSlotColumnNum) {
              dataColumns.drivingStatus = nameSlotColumnNum;
              console.log(dataColumns);

              // SIXTH QUESTION (If there are more questions)
              askNumSeatsQuestion(function (nameSlotColumnNum) {
              dataColumns.numSeats = nameSlotColumnNum;
              console.log(dataColumns);

                outputTitleElement.innerHTML = '<h2>Your carpools: </h2>';
                console.log(`Just asked the questions!`);
                outputSubTitleElement.innerHTML = '<p>Here is a suggestion for how the carpools. Use this space to move people around as you see fit. Enjoy your workout!</p>';

                handleFileSelect(fileInput, dataColumns);

              });
                
              });
            });
          });
        });
      });
  };
  
  // Append both buttons to the outputQuestionElement
  outputQuestionElement.appendChild(yesButton);
  outputQuestionElement.appendChild(noButton);
}

function askNumSeatsQuestion(callback) {
  createNewForm();

  // Append the form to the outputQuestionElement
  outputQuestionElement.innerHTML = '<p>What column has the number of seats?</p>';
  outputQuestionElement.appendChild(form);

  // Capture the user input when the form is submitted
  form.onsubmit = function (event) {
    event.preventDefault(); // Prevent the form from submitting
    const userInput = input.valueAsNumber;
    callback(userInput);
    // Hide the form after the last question is asked
    form.style.display = 'none';
    outputQuestionElement.innerHTML = '<p> </p>';
  };
  
}

function askDriverStatusQuestion(callback) {
  createNewForm();

  // Append the form to the outputQuestionElement
  outputQuestionElement.innerHTML = '<p>What column has the driver statuses?</p>';
  outputQuestionElement.appendChild(form);

  // Capture the user input when the form is submitted
  form.onsubmit = function (event) {
    event.preventDefault(); // Prevent the form from submitting
    const userInput = input.valueAsNumber;
    callback(userInput);
  };
}

function askLocationQuestion(callback) {
  createNewForm();

  // Append the form to the outputQuestionElement
  outputQuestionElement.innerHTML = '<p>What column has the locations?</p>';
  outputQuestionElement.appendChild(form);

  // Capture the user input when the form is submitted
  form.onsubmit = function (event) {
    event.preventDefault(); // Prevent the form from submitting
    const userInput = input.valueAsNumber;
    callback(userInput);
  };
}

function askPhoneNumQuestion(callback) {
  createNewForm();

  // Append the form to the outputQuestionElement
  outputQuestionElement.innerHTML = '<p>What column has the phone numbers?</p>';
  outputQuestionElement.appendChild(form);

  // Capture the user input when the form is submitted
  form.onsubmit = function (event) {
    event.preventDefault(); // Prevent the form from submitting
    const userInput = input.valueAsNumber;
    callback(userInput);
  };
}

function askNameColumnQuestion(callback) {
  createNewForm();

  // Append the form to the outputQuestionElement
  outputQuestionElement.innerHTML = '<p>What column has the names?</p>';
  outputQuestionElement.appendChild(form);

  // Capture the user input when the form is submitted
  form.onsubmit = function (event) {
    event.preventDefault(); // Prevent the form from submitting
    const userInput = input.valueAsNumber;
    callback(userInput);
  };
}

function askTimeSlotColumnQuestion(callback) {
  createNewForm();

  // Append the form to the outputQuestionElement
  outputQuestionElement.innerHTML = '<p>What column is the information about the time slots in?</p>';
  outputQuestionElement.appendChild(form);

  // Capture the user input when the form is submitted
  form.onsubmit = function (event) {
    event.preventDefault(); // Prevent the form from submitting
    const userInput = input.valueAsNumber;
    callback(userInput);
  };
}

function createNewForm() {
  // Create a form element
  form = document.createElement('form');
  form.action = '/action_page.php';

  // Create a label for the input
  label = document.createElement('label');
  label.setAttribute('for', 'columnInput');

  // Create an input element
  input = document.createElement('input');
  input.type = 'number';
  input.id = 'columnInput';
  input.name = 'columnInput';
  input.min = '1';

  // Check if numberOfColumns is defined before setting the max attribute
  if (typeof numberOfColumns !== 'undefined') {
    input.max = numberOfColumns.toString(); // Set the maximum value to the number of columns
    input.required = true;
  }

  // Create a submit button
  submitButton = document.createElement('input');
  submitButton.type = 'submit';

  // Append elements to the form
  form.appendChild(label);
  form.appendChild(input);
  form.appendChild(submitButton);
}

let outputCarpoolElement = document.getElementById('outputCarpools');

class Driver {
  constructor(name, number, numSeats, location, timeSlot) {
      this.name = name;
      this.timeSlot = timeSlot;
      this.number = number;
      this.numSeats = numSeats;
      this.location = this.processLocation(location);
      this.carpool = [];
  }

  processLocation(location) {
      if (location === "Dinky" || location === "Como") {
          return "Dinky/Como";
      } else if (location === "Stadium Village" || location === "Superblock") {
          return "Stadium Village/Superblock";
      } else {
          return location;
      }
  }


  getName() {
      return this.name;
  }

  getNumber() {
      return this.number;
  }

  getNumSeats() {
      return this.numSeats;
  }

  getLocation() {
      return this.location;
  }

  getTimeSlot() {
      return this.timeSlot;
  }

  yesTimeSlot() {
      if (this.timeSlot === -1) {
          return false;
      } else {
        return true;
      }
  }

  getNumTakenSeats() {
      return this.carpool.length;
  }

  hasSeatsLeft() {
      return this.getNumTakenSeats() < this.numSeats;
  }

  addToCarpool(rider) {
      this.carpool.push(rider);
  }

  showCarpool(outputCarpoolElement) {
        outputCarpoolElement.innerHTML += `<h3>${this.getName()} (${this.getNumber()})'s carpool getting there by ${this.getTimeSlot()}</h3>`;
      for (let i = 0; i < this.getNumSeats(); i++) {
          if (i > this.getNumTakenSeats() - 1) {
                outputCarpoolElement.innerHTML += `<p> ** EMPTY SLOT: _________________ ** </p>`;
          } else {
                outputCarpoolElement.innerHTML += `<p> ${this.carpool[i].getName()} (${this.carpool[i].getNumber()}) </p>`;
          }
      }
  }
}

class Rider {
  constructor(name, number, location, timeSlot) {
      this.name = name;
      this.timeSlot = timeSlot;
      this.number = number;
      // this.time = time;
      this.location = this.processLocation(location);
  }

  processLocation(location) {
      if (location === "Dinky" || location === "Como") {
          return "Dinky/Como";
      } else if (location === "Stadium Village" || location === "Superblock") {
          return "Stadium Village/Superblock";
      } else {
          return location;
      }
  }

  getName() {
      return this.name;
  }

  getNumber() {
      return this.number;
  }

  getLocation() {
      return this.location;
  }

  getTimeSlot() {
      return this.timeSlot;
  }

  yesTimeSlot() {
      if (this.timeSlot === -1) {
          return false;
      } else {
        return true;
      }
  }

  printRiderInfo(outputCarpoolElement) {
      outputCarpoolElement.innerHTML += `<p> * ${this.getName()} (${this.getNumber()}) from ${this.getLocation()}</p>`;
  }
}

function handleFileSelect(fileInput, dataColumns) {
  console.log("Inside the handleFileSelect function");
  const file = fileInput.files[0];
  // const outputCarpoolElement = document.getElementById('output');

  if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
          const fileContent = e.target.result;
          // Process the rows
          const rows = fileContent.split('\n').map(row => row.split(','));
          console.log("Going to the processRows function");
          processRows(rows, dataColumns);
      };
      reader.readAsText(file);
  }
}

function processRows(rows, dataColumns) {
  console.log("In processRows function");
  const allRiders = [];
  const allDrivers = [];
  const girlsWithoutRides = [];
  const driversWithSpace = [];

  if (dataColumns.timeSlot > -1) {
    console.log("Time slots DO matter");
    for (const row of rows) {
      console.log("Inside the for loop");

      if (row[dataColumns.drivingStatus] === "Yes") {
        console.log("This Barbie is a driver");
        const driver = new Driver(row[dataColumns.name], row[dataColumns.phoneNum], row[dataColumns.numSeats], row[dataColumns.location], row[dataColumns.timeSlot]);
        allDrivers.push(driver);

      } else if (row[dataColumns.drivingStatus] === "No") {
        console.log("This Barbie is a rider");
        const rider = new Rider(row[dataColumns.name], row[dataColumns.phoneNum], row[dataColumns.location], row[dataColumns.timeSlot]);
        allRiders.push(rider);
      }

    }

  } else {
    for (const row of rows) {
      console.log("Time slots don't matter");
      console.log("Inside the for loop");

        if (row[dataColumns.drivingStatus] === "Yes") {
          console.log("This Barbie is a driver");
          const driver = new Driver(row[dataColumns.name], row[dataColumns.phoneNum], row[dataColumns.numSeats], row[dataColumns.location]);
            allDrivers.push(driver);
        } else if (row[dataColumns.drivingStatus] === "No") {
            console.log("This Barbie is a rider");
            const rider = new Rider(row[dataColumns.name], row[dataColumns.phoneNum], row[dataColumns.location]);
            allRiders.push(rider);
        }

    }
  }

  console.log("Got it all sorted!");
  // Match riders with drivers
  console.log("About to match the riders with drivers");
  matchRidersWithDrivers(allRiders, allDrivers, girlsWithoutRides);

  console.log("About to look for drivers with extra space");
  findDriversWithSpace(allDrivers, driversWithSpace);

  // Display girls without rides
  if (girlsWithoutRides.length > 0) {
    console.log("There are girls without rides.");
    console.log(girlsWithoutRides.length);

    matchRidersWithDriversLocationNoPreference(girlsWithoutRides, driversWithSpace);
    console.log("We're about to display the list of girls without rides");
  }

  displayList("Girls without rides:", girlsWithoutRides, outputCarpoolElement);

  displayCarpools(allDrivers, outputCarpoolElement);

}

function findDriversWithSpace(allDrivers, driversWithSpace) {

  console.log("here at findDriversWithSpace");

  for (const driver of allDrivers) {
    if (driver.getNumTakenSeats() < driver.getNumSeats()) {
      driversWithSpace.push(driver);
    }
  }
}

function displayList(title, list, outputCarpoolElement) {
  console.log(title);
  console.log("inside the displayList function");
  const noRidesContainer = document.createElement('div');
  noRidesContainer.className = 'noRides-container';

  // Create an array to store the HTML content for each item
  let itemsHTML = [];

  for (const item of list) {
    console.log(item.getName());
    // Add the HTML content for the current item to the array
    if (item.yesTimeSlot()) {
      itemsHTML.push(`<p>${item.getName()} (${item.getNumber()}) from ${item.getLocation()} - ${item.getTimeSlot()}</p>`);
    } else {
      itemsHTML.push(`<p>${item.getName()} (${item.getNumber()}) from ${item.getLocation()}</p>`);
    }
  }

  // Set the innerHTML after the loop with the accumulated content
  outputCarpoolElement.innerHTML = `<h2>${title}</h2>${itemsHTML.join('')}`;

  // Append the container to the outputCarpoolElement (if needed)
  outputCarpoolElement.appendChild(noRidesContainer);
}

function matchRidersWithDrivers(allRiders, allDrivers, girlsWithoutRides) {

  console.log("Here at the matching function");

  for (const rider of allRiders) {
      let carpoolFound = false;

      for (const driver of allDrivers) {
          if (rider.getTimeSlot() === driver.getTimeSlot() && rider.getLocation() === driver.getLocation() && driver.hasSeatsLeft()) {
              driver.addToCarpool(rider);
              carpoolFound = true;
              break;
          }
      }

      if (!carpoolFound) {
          girlsWithoutRides.push(rider);
      }
  }
}

function matchRidersWithDriversLocationNoPreference(girlsWithoutRides, driversWithSpace) {
  console.log("ABout to do the last round of matching");
  for (const rider of girlsWithoutRides) {
    let carpoolFound = false;

    for (const driver of driversWithSpace) {
      driver.addToCarpool(rider);

      if (!driver.hasSeatsLeft()) {
        // Remove the driver from the array since there are no seats left
        const index = driversWithSpace.indexOf(driver);
        if (index !== -1) {
          driversWithSpace.splice(index, 1);
        }
      }

      carpoolFound = true;
      break; // Break after adding the rider to the first available driver
    }

    if (carpoolFound) {
      // Remove the rider from the array since a carpool was found
      const riderIndex = girlsWithoutRides.indexOf(rider);
      if (riderIndex !== -1) {
        girlsWithoutRides.splice(riderIndex, 1);
      }
    }
  }
  console.log(girlsWithoutRides.length);
}

function displayCarpools(allDrivers, outputCarpoolElement) {
  console.log("Inside the displayCarpool function");
  for (const driver of allDrivers) {
    // Create a container div for each carpool
    const carpoolContainer = document.createElement('div');
    carpoolContainer.className = 'carpool-container';

    // Display carpool information inside the container
    driver.showCarpool(carpoolContainer);

    // Append the container to the outputCarpoolElement
    outputCarpoolElement.appendChild(carpoolContainer);
  }
}
