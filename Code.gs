function doGet(e) {
  const p = e.parameter;
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // اکشن برای لاگین
  if (!p.action) {
    const sheet = ss.getSheetByName("user-pass");
    const data = sheet.getDataRange().getValues();
    let response = { success: false, errors: [] };

    for (let i = 1; i < data.length; i++) {
      if (data[i][0] == p.user) {
        if (data[i][1] == p.email && data[i][2] == p.pass && data[i][3] == p.case) {
          response.success = true;
          return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
        } else {
          if (data[i][1] != p.email) response.errors.push('email');
          if (data[i][2] != p.pass) response.errors.push('password');
          if (data[i][3] != p.case) response.errors.push('caseNumber');
          return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
        }
      }
    }
    response.errors.push('userName');
    return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
  }

  // اکشن برای دریافت اطلاعات پنل (وقتی action=getPanelData باشد)
  if (p.action === "getPanelData") {
    const dataSheet = ss.getSheetByName("Data");
    const docSheet = ss.getSheetByName("Docpic");
    const caseNum = p.caseNumber;

    const dataRows = dataSheet.getDataRange().getValues();
    const docRows = docSheet.getDataRange().getValues();
    
    let result = { success: false };

    for (let i = 1; i < dataRows.length; i++) {
      if (dataRows[i][20] == caseNum) { // ستون U در شیت Data
        result.success = true;
        result.personal = dataRows[i];
        result.docs = docRows[i]; // فرض بر این است که ردیف‌ها در هر دو شیت یکسان است
        break;
      }
    }
    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
  }
}
