function myFunction() {
  
  var calendar = CalendarApp.getCalendarById('***ID***@gmail.com');
  
  ////すべてのイベントを削除////
  var events = calendar.getEvents(
                    new Date('2015/1/1'), 
                    new Date('2015/12/31'));
  
      
  for(var i=0; i<events.length; i++){
   events[i].deleteEvent();
  }
  
  var response = UrlFetchApp.fetch("https://trello.com/calendar/******.ics");
  var text = response.getContentText();
  var csvData = text.split('\n');         // 行単位分割
  
  ///Logger.log(csvData);///ログ
  
  var i =0;
  var aa = csvData[8].indexOf( "DTSTART" );
  var ab;
  var ac;
  var result ;
  var result_Date = [];
  var result_Summary = [];
  var result_name = [];
  
  while (i < csvData.length ){
    //DATE
     aa = csvData[i].indexOf( "DTSTART" );
     if (aa > -1){
     result_Date.push( csvData[i].substr(8,4) + "/" + csvData[i].substr(12,2) + "/" + csvData[i].substr(14,2));
     }
   //SUMMARY
     ab = csvData[i].indexOf("SUMMARY");
     if(ab>-1){
     result_Summary.push( csvData[i].substr(8,20) );
     }
   //DESCRIPTION
     ac = csvData[i].indexOf("DESCRIPTION");
     if (ac > -1){
     result_name.push( csvData[i+1].substr(10,16) );
     }
  i++;
  }
     

  
  for(i=0; i<result_Summary.length;i++){
    calendar.createAllDayEvent(result_Summary[i],new Date(result_Date[i]), {description: result_name[i]      });
  }

}
