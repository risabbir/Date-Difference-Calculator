# Date Difference Calculator

**Version:** 1.0.0 (Initial Release - April 2025)

A versatile, responsive web-based tool designed for various date and time calculations. It allows users to compute the duration between two dates, add or subtract time periods from a specific date, calculate working days excluding weekends and holidays, and perform simple date arithmetic.

---

## Features

* **Calculate Date & Time Difference:** Find the precise duration between a start and end date/time, broken down into years, months, days, hours, minutes, and seconds. Also shows the total number of calendar days between the dates.
* **Add/Subtract Time:** Add or subtract a specific number of years, months, and/or days to/from a given start date to find a future or past date.
* **Working Days Calculation:** Determine the number of working days between two dates, automatically excluding weekends (configurable start of the week - Sunday, Monday, or Saturday) and optionally excluding a list of user-defined holidays.
* **Date Arithmetic (Days):** Quickly add or subtract a specific number of days to/from either the start date or the end date.
* **User-Friendly Interface:**
    * Clean, modern dark theme.
    * Responsive design for usability on desktop and mobile devices.
    * "Today" and "Now" buttons for quickly setting current date and time.
    * Clear display of results.
    * Input validation and error messages.

## How It Works

The tool operates based on the "Calculation Type" selected:

1.  **Calculate Difference:**
    * Enter a `Start Date` and optionally a `Start Time`.
    * Enter an `End Date` and optionally an `End Time`. (End Date must be on or after Start Date).
    * Ensure `Calculate Difference` is selected in the `Calculation Type` dropdown.
    * Click the `Calculate` button.
    * The results area will display the duration breakdown (Years, Months, Days, Time if applicable) and the total calendar days between the two dates.

2.  **Add/Subtract Time:**
    * Enter a `Start Date` and optionally a `Start Time`. (The End Date fields are hidden for this mode).
    * Select `Add/Subtract Time` from the `Calculation Type` dropdown.
    * The "Amount of Time to Add/Subtract" section appears.
    * Choose `(+) Add` or `(-) Subtract` from the dropdown.
    * Enter the number of `Years`, `Months`, and/or `Days` you wish to add or subtract (at least one value must be non-zero).
    * Click the `Calculate` button.
    * The results area will show the original date and the resulting new date and time.

3.  **Working Days Between:**
    * Enter a `Start Date`.
    * Enter an `End Date`. (End Date must be on or after Start Date).
    * Select `Working Days Between` from the `Calculation Type` dropdown.
    * The "Working Days Options" section appears.
    * Select the `First Day of Week` (Sunday, Monday, or Saturday) to define the weekend.
    * Optionally, enter specific `Holidays` in `YYYY-MM-DD` format, separated by commas (e.g., `2025-12-25, 2026-01-01`).
    * Click the `Calculate` button.
    * The results area will show the total calendar days, working days, weekend days, and holidays (that fall on working days) within the specified range.

4.  **Add/Subtract Days:**
    * Enter a `Start Date` and optionally a `Start Time`.
    * Enter an `End Date` and optionally an `End Time`. (Both are available as potential base dates).
    * Select `Add/Subtract Days` from the `Calculation Type` dropdown.
    * The "Date Arithmetic Options" section appears.
    * Choose the `Base Date` (`Start Date` or `End Date`) from which to calculate.
    * Enter the number of `Days to Add (+) or Subtract (-)` (e.g., `30` to add 30 days, `-15` to subtract 15 days). Must be non-zero.
    * Click the `Calculate` button.
    * The results area will show the base date used and the resulting new date and time.

**Quick Inputs:**
Use the `Today` and `Now` buttons next to the date and time fields to quickly populate them with the current date and time.

## Live Link

Access the Date Difference Calculator here:
[**LIVE LINK HERE**](https://rsabbir.com/tools/date-difference-calculator/)


## What's Next? (Potential Future Enhancements)

* **Timezone Support:** Allow users to select timezones for more accurate calculations across regions.
* **Holiday Presets:** Include built-in holiday lists for common regions/countries.
* **Recurring Events:** Calculate dates based on recurring patterns (e.g., every 2nd Friday).
* **Format Options:** Allow users to choose different date/time display formats.
* **Result Sharing/Export:** Option to copy, share, or export the calculation results.
* **UI Themes:** Add light theme option.

## Copyright

Copyright (c) 2025 Date Difference Calculator Developed by R. Sabbir | All Rights Reserved
