This project builds a [Google Sheets Script](https://developers.google.com/apps-script/guides/sheets) that queries the [Companies House API](https://developer.company-information.service.gov.uk/api/docs/) and populates a table with certain data.

## Requirements:
1. A Companies House developer account & API Key: https://developer.company-information.service.gov.uk/api/docs/index/gettingStarted/quickStart.html
2. A Google Sheet

## Setup:
1. Follow the Companies House API documentation to create an account and create an application to retrieve and [API Key](https://developer.company-information.service.gov.uk/developer/applications) 
2. Make a copy of my [Companies House GSheet Script template](https://docs.google.com/spreadsheets/d/1kYJr4g9Pbi9uJWSSGyyd5PJJGtkXmRa-4Ow2KL4z2to/edit?usp=sharing)
> Note: the layout of this table is important as the script is configured to retrieve values and paste values from/to certain cells
4. On your sheet, go to `Tools > Script Editor`
5. Name your script & paste the contents of the [gsheetscript.gs](/gsheetscript.gs) file in this repo to the editor
6. Update line 29 with your API Key - replacing the `{{API_KEY}}` (make sure you preserve the `' '`)
>Note: The Companies House API uses HTTP Basic Authentication to transmit an API key between the client application and the server. Basic authentication is usually made up of a username and password pair; the Companies House API takes the username as the API key and ignores the password, so can be left blank.
7. Save your script
8. Return to your Sheet and enter the Company Numbers for the companies you want to retrieve data for in column A
9. You should now have a menu option after `Help` called `Company House Script` - hit `Get Me The Data!`
10. Rejoice

**The first time you run the script a Google Authorisation page will pop up to give your lovely new app write permissions to your Sheet. Go ahead and login and allow it. It may give you a "unsafe" warning, just hit advanced and proceed**

## Information:
This script has been to configured to extract the values below from the [Company Info](https://developer.company-information.service.gov.uk/api/docs/company/company_number/company_number.html) API response, you can add any values to this list that you such desire (lines 43-49) or query a different endpoint (line 27)!
* company_name
* accounts.next_accounts.period_end_on,
* accounts.next_accounts.due_on,
* accounts.next_accounts.overdue,
* confirmation_statement.next_due,
* confirmation_statement.next_made_up_to,
* confirmation_statement.overdue 

## Known Bugs:
* Values in column A *must* be text format - be careful of `0` being removed when pasting IDs
* If a company does not have the data expected in the API response, the script fails. Accepting PRs to fix this!
