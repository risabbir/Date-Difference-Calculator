// --- DOM Element References ---
const startDateInput = document.getElementById('start-date');
const startTimeInput = document.getElementById('start-time');
const endDateInput = document.getElementById('end-date');
const endTimeInput = document.getElementById('end-time');
const endDateGroup = document.getElementById('end-date-group'); // Reference to the whole group

const startDateTodayButton = document.getElementById('start-date-today');
const startTimeNowButton = document.getElementById('start-time-now');
const endDateTodayButton = document.getElementById('end-date-today');
const endTimeNowButton = document.getElementById('end-time-now');

const calculationTypeSelect = document.getElementById('calculationType');
const resultsDiv = document.getElementById('results');
const calculateButton = document.getElementById('calculate');

// Option Sections
const addSubtractOptionsDiv = document.getElementById('addSubtractOptions');
const workingDaysOptionsDiv = document.getElementById('workingDaysOptions');
const dateArithmeticOptionsDiv = document.getElementById('dateArithmeticOptions');

// Add/Subtract Inputs (Update)
const operationToggleButton = document.getElementById('operation-toggle-button'); // ADDED
const yearsInput = document.getElementById('years');
const monthsInput = document.getElementById('months');
const daysInput = document.getElementById('days');

// Working Days Inputs
const weekStartSelect = document.getElementById('weekStart');
const holidaysInput = document.getElementById('holidays');

// Date Arithmetic Inputs
const dateArithmeticValueInput = document.getElementById('dateArithmeticValue');
const dateArithmeticBaseSelect = document.getElementById('dateArithmeticBase');

// Error Message Elements
const startDateError = document.getElementById('start-date-error');
const endDateError = document.getElementById('end-date-error');
const generalError = document.getElementById('general-error');
const addSubtractError = document.getElementById('add-subtract-error');
const holidaysError = document.getElementById('holidays-error');
const dateArithmeticError = document.getElementById('date-arithmetic-error');


// --- Initial Setup ---
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(el => el.style.display = 'none');

    const errorInputs = document.querySelectorAll('.error'); // Select elements with error class
    errorInputs.forEach(el => el.classList.remove('error'));

    // Clear error classes from parent groups if needed
    startDateInput.closest('.input-group')?.classList.remove('error');
    endDateInput.closest('.input-group')?.classList.remove('error');
    holidaysInput.closest('.input-group')?.classList.remove('error');
    dateArithmeticValueInput.closest('.input-group')?.classList.remove('error');
    // Clear error class from specific Add/Subtract inputs if present
    yearsInput.classList.remove('error');
    monthsInput.classList.remove('error');
    daysInput.classList.remove('error');
}

function updateInputVisibility() {
     const selectedType = calculationTypeSelect.value;

     // Hide all option sections initially
     addSubtractOptionsDiv.style.display = 'none';
     workingDaysOptionsDiv.style.display = 'none';
     dateArithmeticOptionsDiv.style.display = 'none';

     // Show relevant sections and control End Date visibility
     if (selectedType === 'addSubtract') {
         addSubtractOptionsDiv.style.display = 'block';
         endDateGroup.style.display = 'none'; // Hide End Date
     } else if (selectedType === 'workingDays') {
         workingDaysOptionsDiv.style.display = 'block';
         endDateGroup.style.display = 'block'; // Show End Date
     } else if (selectedType === 'dateArithmetic') {
         dateArithmeticOptionsDiv.style.display = 'block';
         endDateGroup.style.display = 'block'; // Show End Date (needed for base selection)
     } else { // 'difference'
         endDateGroup.style.display = 'block'; // Show End Date
     }
}

// --- Event Listeners ---
calculationTypeSelect.addEventListener('change', () => {
    clearErrors();
    resultsDiv.style.display = 'none'; // Hide results on type change
    updateInputVisibility();
});

// Initialize visibility on page load
updateInputVisibility();

// ADDED: Toggle button listener
operationToggleButton.addEventListener('click', () => {
    const currentOperation = operationToggleButton.dataset.operation;
    if (currentOperation === '+') {
        operationToggleButton.dataset.operation = '-';
        operationToggleButton.innerHTML = '<span class="icon">-</span> Subtract';
        operationToggleButton.classList.remove('add-mode');
        operationToggleButton.classList.add('subtract-mode');
    } else {
        operationToggleButton.dataset.operation = '+';
        operationToggleButton.innerHTML = '<span class="icon">+</span> Add';
        operationToggleButton.classList.remove('subtract-mode');
        operationToggleButton.classList.add('add-mode');
    }
});


function validateDate(dateInput, errorElement) {
     // Don't clear *all* errors here, just the one for this input
     errorElement.style.display = 'none';
     dateInput.closest('.input-group')?.classList.remove('error');

    if (!dateInput.value) {
        errorElement.textContent = 'Please select a date.';
        errorElement.style.display = 'block';
         dateInput.closest('.input-group')?.classList.add('error');
        return false;
    }
    const date = new Date(dateInput.value);
     if (isNaN(date.getTime()) || dateInput.value.length < 10) {
        errorElement.textContent = 'Invalid or incomplete date format (YYYY-MM-DD).';
        errorElement.style.display = 'block';
         dateInput.closest('.input-group')?.classList.add('error');
        return false;
    }
    return true;
}

// Input event listeners for instant feedback (optional)
startDateInput.addEventListener('input', () => validateDate(startDateInput, startDateError));
endDateInput.addEventListener('input', () => validateDate(endDateInput, endDateError));

// --- Today/Now Button Handlers ---
startDateTodayButton.addEventListener('click', () => {
    startDateInput.value = new Date().toISOString().split('T')[0];
    validateDate(startDateInput, startDateError);
});
startTimeNowButton.addEventListener('click', () => {
    const now = new Date();
    startTimeInput.value = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
});
endDateTodayButton.addEventListener('click', () => {
    endDateInput.value = new Date().toISOString().split('T')[0];
    validateDate(endDateInput, endDateError);
});
endTimeNowButton.addEventListener('click', () => {
    const now = new Date();
    endTimeInput.value = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
});


// --- Main Calculate Button Logic ---
calculateButton.addEventListener('click', () => {
    clearErrors();
    resultsDiv.style.display = 'none';
    resultsDiv.innerHTML = '';

    const calculationType = calculationTypeSelect.value;
    let isValid = true;

    // 1. Validate Start Date
    if (!validateDate(startDateInput, startDateError)) {
        isValid = false;
    }

    // 2. Validate End Date (if visible/required)
    if (endDateGroup.style.display !== 'none') {
        if (!validateDate(endDateInput, endDateError)) {
            isValid = false;
        }
    }

     // 3. Specific Validations based on Calculation Type
     if (calculationType === 'addSubtract') {
         // Use || 0 to handle empty inputs (placeholders) correctly
         const years = parseInt(yearsInput.value, 10) || 0;
         const months = parseInt(monthsInput.value, 10) || 0;
         const days = parseInt(daysInput.value, 10) || 0;

         if (years < 0 || months < 0 || days < 0) { // Check negativity entered directly
             addSubtractError.textContent = 'Years, Months, and Days must be non-negative.';
             addSubtractError.style.display = 'block';
             // Add error class to specific input
             if(years < 0) yearsInput.classList.add('error');
             if(months < 0) monthsInput.classList.add('error');
             if(days < 0) daysInput.classList.add('error');
             isValid = false;
         } else if (years === 0 && months === 0 && days === 0) {
              // Error only if fields are empty (placeholder showing) or all explicitly '0'
             addSubtractError.textContent = 'Please enter values for Years, Months, or Days to add/subtract.';
             addSubtractError.style.display = 'block';
             isValid = false;
         }
     } else if (calculationType === 'workingDays') {
         const holidayValues = holidaysInput.value.split(',').map(h => h.trim()).filter(h => h);
         const invalidHolidays = holidayValues.some(h => !/^\d{4}-\d{2}-\d{2}$/.test(h) || isNaN(new Date(h + 'T00:00:00Z').getTime())); // Use UTC for validation
         if (invalidHolidays) {
            holidaysError.textContent = 'Invalid holiday format. Use YYYY-MM-DD separated by commas.';
            holidaysError.style.display = 'block';
            holidaysInput.classList.add('error');
            isValid = false;
         }
     } else if (calculationType === 'dateArithmetic') {
         const arithmeticValue = dateArithmeticValueInput.value;
         if (arithmeticValue === '' || isNaN(parseInt(arithmeticValue, 10))) {
             dateArithmeticError.textContent = 'Please enter a valid number of days (e.g., 30 or -15).';
             dateArithmeticError.style.display = 'block';
             dateArithmeticValueInput.classList.add('error');
             isValid = false;
         } else if (parseInt(arithmeticValue, 10) === 0) {
             dateArithmeticError.textContent = 'Please enter a non-zero number of days.';
             dateArithmeticError.style.display = 'block';
             dateArithmeticValueInput.classList.add('error');
             isValid = false;
         }
     }


    // 4. Stop if any validation failed
    if (!isValid) {
         generalError.textContent = 'Please review the errors above and correct the inputs.';
         generalError.style.display = 'block';
         // Scroll to the first error? (More complex UX enhancement)
         const firstError = document.querySelector('.error-message[style*="display: block"], .error[style*="display: block"]');
         firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    // 5. Parse Dates (handle potentially missing times)
    const startDate = new Date(startDateInput.value + 'T' + (startTimeInput.value || '00:00:00'));
    let endDate = null;
     if (endDateGroup.style.display !== 'none') {
        endDate = new Date(endDateInput.value + 'T' + (endTimeInput.value || '00:00:00'));
     }

     // Check if parsed dates are valid (redundant with validateDate, but safe)
     if (isNaN(startDate.getTime())) {
         startDateError.textContent = 'Invalid Start Date value.';
         startDateError.style.display = 'block';
         return;
     }
     if (endDate && isNaN(endDate.getTime())) {
         endDateError.textContent = 'Invalid End Date value.';
         endDateError.style.display = 'block';
         return;
     }


    // 6. Check Date Order (if end date is relevant)
    if ((calculationType === 'difference' || calculationType === 'workingDays') && endDate && startDate > endDate) {
        generalError.textContent = 'Start Date cannot be later than End Date for this calculation.';
        generalError.style.display = 'block';
        return;
    }

    // --- Execute Calculation ---
     try {
         if (calculationType === 'difference' && endDate) {
            calculateDifference(startDate, endDate);
        } else if (calculationType === 'addSubtract') {
            addSubtract(startDate);
        } else if (calculationType === 'workingDays' && endDate) {
            calculateWorkingDays(startDate, endDate);
        } else if (calculationType === 'dateArithmetic') {
            performDateArithmetic(startDate, endDate); // Pass both for base selection
        }
         resultsDiv.style.display = 'block'; // Show results section
     } catch (error) {
         console.error("Calculation Error:", error);
         generalError.textContent = `An error occurred: ${error.message}`;
         generalError.style.display = 'block';
     }
});


// --- Calculation Functions ---

function calculateDifference(startDate, endDate) {
     const diffInMilliseconds = endDate.getTime() - startDate.getTime();

    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();
    let days = endDate.getDate() - startDate.getDate();
    let hours = endDate.getHours() - startDate.getHours();
    let minutes = endDate.getMinutes() - startDate.getMinutes();
    let seconds = endDate.getSeconds() - startDate.getSeconds();

    // Adjust negative components carefully
    if (seconds < 0) { seconds += 60; minutes--; }
    if (minutes < 0) { minutes += 60; hours--; }
    if (hours < 0) { hours += 24; days--; }
    if (days < 0) {
         // Borrow days from the previous month relative to the end date
        const daysInEndPrevMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate();
        days += daysInEndPrevMonth;
        months--;
    }
    if (months < 0) { months += 12; years--; }

     // Calculate total days accurately (difference between day starts)
     const startOfDayStart = new Date(startDate); startOfDayStart.setHours(0,0,0,0);
     const startOfDayEnd = new Date(endDate); startOfDayEnd.setHours(0,0,0,0);
     const totalDays = Math.round((startOfDayEnd.getTime() - startOfDayStart.getTime()) / (1000 * 60 * 60 * 24));

    let resultText = `<h2>Difference Calculation</h2>`;
     resultText += `<p>From: <strong>${startDate.toLocaleString()}</strong></p>`;
     resultText += `<p>To: <strong>${endDate.toLocaleString()}</strong></p>`;
     resultText += `<hr>`; // Use HR for separation

    let diffParts = [];
    if (years > 0) diffParts.push(`${years} year${years > 1 ? 's' : ''}`);
    if (months > 0) diffParts.push(`${months} month${months > 1 ? 's' : ''}`);
    if (days > 0) diffParts.push(`${days} day${days > 1 ? 's' : ''}`);
     // Show time parts if time was input OR if the difference spans less than a day but includes time
     if (startTimeInput.value || endTimeInput.value || (years === 0 && months === 0 && days === 0 && diffInMilliseconds > 0)) {
         if (hours > 0) diffParts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
         if (minutes > 0) diffParts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
         if (seconds > 0) diffParts.push(`${seconds} second${seconds > 1 ? 's' : ''}`);
     }

     if (diffParts.length > 0) {
         resultText += `<p><strong>Difference:</strong> ${diffParts.join(', ')}</p>`;
     } else if (diffInMilliseconds === 0) {
          resultText += `<p><strong>Difference:</strong> The dates and times are identical.</p>`;
     } else {
          resultText += `<p><strong>Difference:</strong> Less than a second.</p>`; // Handle very small differences
     }

    resultText += `<p><strong>Total Calendar Days Between:</strong> ${totalDays} days</p>`;
    resultsDiv.innerHTML = resultText;
}

function addSubtract(startDate) {
     const sign = operationToggleButton.dataset.operation;
     const yearsToAdd = parseInt(yearsInput.value, 10) || 0;
     const monthsToAdd = parseInt(monthsInput.value, 10) || 0;
     const daysToAdd = parseInt(daysInput.value, 10) || 0;

    let newDate = new Date(startDate);
    const opFactor = (sign === '+') ? 1 : -1;

    newDate.setFullYear(newDate.getFullYear() + (opFactor * yearsToAdd));
    newDate.setMonth(newDate.getMonth() + (opFactor * monthsToAdd));
    newDate.setDate(newDate.getDate() + (opFactor * daysToAdd));

    const options = {
         weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
         hour: startTimeInput.value ? '2-digit' : undefined,
         minute: startTimeInput.value ? '2-digit' : undefined,
     };
    const formattedDate = newDate.toLocaleString('en-US', options);
    const baseFormatted = startDate.toLocaleString('en-US', options);

     let operationDesc = [];
     if (yearsToAdd > 0) operationDesc.push(`${yearsToAdd} year${yearsToAdd > 1 ? 's' : ''}`);
     if (monthsToAdd > 0) operationDesc.push(`${monthsToAdd} month${monthsToAdd > 1 ? 's' : ''}`);
     if (daysToAdd > 0) operationDesc.push(`${daysToAdd} day${daysToAdd > 1 ? 's' : ''}`);

     resultsDiv.innerHTML = `<h2>Add/Subtract Time Result</h2>
                            <p>Original Date: <strong>${baseFormatted}</strong></p>
                            <p>Operation: <strong>${sign === '+' ? 'Added' : 'Subtracted'} ${operationDesc.join(', ')}</strong></p>
                            <hr>
                            <p>Result: <strong>${formattedDate}</strong></p>`;
}

function calculateWorkingDays(startDate, endDate) {
     const weekStart = parseInt(weekStartSelect.value, 10);
     const weekendDays = weekStart === 1 ? [6, 0] : (weekStart === 6 ? [0, 1] : [0, 6]); // Mon: Sat/Sun; Sat: Sun/Mon; Sun: Sat/Sun

     const holidaysList = holidaysInput.value.split(',')
                              .map(h => h.trim())
                              .filter(h => h && /^\d{4}-\d{2}-\d{2}$/.test(h));
     // Use UTC dates for holiday comparison to avoid timezone issues
     const holidayTimestamps = new Set(holidaysList.map(h => Date.UTC(...h.split('-').map((n, i) => i === 1 ? parseInt(n) - 1 : parseInt(n)))));

     let workingDays = 0, weekendDaysCount = 0, holidaysCount = 0;
     // Start from the beginning of the start day
     let currentDate = new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()));
     // End at the beginning of the day *after* the end date for the loop condition
     const loopEndDate = new Date(Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() + 1));

     if (currentDate >= loopEndDate) { // Handle same start/end day
          const dayOfWeek = startDate.getUTCDay();
          const isWeekend = weekendDays.includes(dayOfWeek);
          const isHoliday = holidayTimestamps.has(currentDate.getTime());
          if(!isWeekend && !isHoliday) workingDays = 1;
          else if(isWeekend) weekendDaysCount = 1;
          if(isHoliday && !isWeekend) holidaysCount = 1; // Count holiday only if it's on a weekday

     } else {
         while (currentDate < loopEndDate) {
             const dayOfWeek = currentDate.getUTCDay(); // Use UTC day
             const isWeekend = weekendDays.includes(dayOfWeek);
             const isHoliday = holidayTimestamps.has(currentDate.getTime());

             if (!isWeekend && !isHoliday) {
                 workingDays++;
             } else if (isWeekend) {
                 weekendDaysCount++;
             } else { // Holiday on a weekday
                 holidaysCount++;
             }
             // Move to the next day in UTC
             currentDate.setUTCDate(currentDate.getUTCDate() + 1);
         }
     }

     // Calculate inclusive total days more directly
     const startDayOnlyUTC = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
     const endDayOnlyUTC = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
     const inclusiveTotalDays = Math.round((endDayOnlyUTC - startDayOnlyUTC) / (1000 * 60 * 60 * 24)) + 1;


     resultsDiv.innerHTML = `<h2>Working Days Calculation</h2>
                             <p>Range: <strong>${startDate.toLocaleDateString()}</strong> to <strong>${endDate.toLocaleDateString()}</strong> (inclusive)</p>
                             <hr>
                             <p><strong>Total Calendar Days:</strong> ${inclusiveTotalDays}</p>
                             <p><strong>Working Days:</strong> ${workingDays}</p>
                             <p><strong>Weekend Days:</strong> ${weekendDaysCount}</p>
                             <p><strong>Holidays (on working days):</strong> ${holidaysCount}</p>`;

}

 function performDateArithmetic(startDate, endDate) {
     const daysToAddOrSubtract = parseInt(dateArithmeticValueInput.value, 10);
     if (isNaN(daysToAddOrSubtract) || daysToAddOrSubtract === 0) return; // Validation handled earlier

     const baseDateType = dateArithmeticBaseSelect.value;
     let baseDate;
     let baseTimeValue;

     if (baseDateType === 'startDate') {
         baseDate = startDate;
         baseTimeValue = startTimeInput.value;
     } else { // endDate
         baseDate = endDate;
         baseTimeValue = endTimeInput.value;
     }

     if (!baseDate || isNaN(baseDate.getTime())) {
          generalError.textContent = `The selected ${baseDateType === 'startDate' ? 'Start' : 'End'} Date is invalid.`;
          generalError.style.display = 'block';
          return;
     }

     const newDate = new Date(baseDate);
     newDate.setDate(newDate.getDate() + daysToAddOrSubtract);

     const options = {
         weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
         hour: baseTimeValue ? '2-digit' : undefined,
         minute: baseTimeValue ? '2-digit' : undefined,
     };
     const formattedDate = newDate.toLocaleString('en-US', options);
     const baseFormatted = baseDate.toLocaleString('en-US', options);
     const operation = daysToAddOrSubtract >= 0 ? 'Added' : 'Subtracted';
     const numDays = Math.abs(daysToAddOrSubtract);

     resultsDiv.innerHTML = `<h2>Add/Subtract Days Result</h2>
                             <p>Base Date: <strong>${baseFormatted}</strong> (${baseDateType === 'startDate' ? 'Start Date' : 'End Date'})</p>
                             <p>Operation: <strong>${operation} ${numDays} day${numDays !== 1 ? 's' : ''}</strong></p>
                             <hr>
                             <p>Result: <strong>${formattedDate}</strong></p>`;
 }
