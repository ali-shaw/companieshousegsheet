// custom menu
function onOpen() {
  var ui = SpreadsheetApp.getUi();

  ui.createMenu('Company House Script')
    .addItem('Get me the data!', 'callCompanyHouseAPI')
    .addToUi();
}

// Execute the function
function callCompanyHouseAPI() {

  // set the sheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Sheet1');
  
  // collect the Company House IDs and store them as an array  
  var range = sheet.getRange(3, 1, sheet.getLastRow()-2, 1);
  var values = range.getValues();
  range.clearContent();
  
  // for each ID, collect data & send to sheet
  values.forEach(function(value){
    
    // set API params - url & auth
    var id = value;
    var endpoint = 'https://api.company-information.service.gov.uk/company/' + id;
    
    var USERNAME = '{{API_KEY}}'; 
    var PASSWORD = '';
    var authHeader = 'Basic ' + Utilities.base64Encode(USERNAME + ':' + PASSWORD);
    var options = {headers: {Authorization: authHeader}};

    // make API call & store response as JSON object
    var response = UrlFetchApp.fetch(endpoint, options);
    var responseObject = JSON.parse(response);

    // extract required data from JSON object & store as array - Make sure order matches sheet headers
    var data = [];
    var arr = [];
    arr.push(
        value,
        responseObject.company_name,
        responseObject.accounts.next_accounts.period_end_on,
        responseObject.accounts.next_accounts.due_on,
        responseObject.accounts.next_accounts.overdue,
        responseObject.confirmation_statement.next_due,
        responseObject.confirmation_statement.next_made_up_to,
        responseObject.confirmation_statement.overdue
        )
    data.push(arr);
    
    // write data to sheet
    sheet.getRange(sheet.getLastRow() +1, 1, data.length, data[0].length).setValues(data); 
  });
  
}



