var socket = io.connect('http://localhost:4444');
var table = document.getElementById("statistics");

// With the interval of 60 miliseconds
setInterval(function(){
    // make a query to server for statistics
    socket.emit("get stats", []);
}, 1000);

    

// getting statistics from the server
 
socket.on("send stats",function(statistics){

    // Making the table of statistics
    statistics = JSON.parse(statistics);
    table.innerHTML = "";
    tableHTML = "<tr><td>Date and Time</td><td>Grass Births</td><td>Grass Dies</td><td>GrassEater Births</td><td>FrameCount</td></tr>";
    for(var st of statistics){
        tableHTML+="<tr>";

        tableHTML+="<td>"+st.timestamp+"</td>";
        tableHTML+="<td>"+st.framecount+"</td>";
        tableHTML+="<td>"+st.grassBirth+"</td>";
        tableHTML+="<td>"+st.grassDie+"</td>";
        tableHTML+="<td>"+st.grassEaterBirth+"</td>";

        tableHTML+="</tr>";
    }

    table.innerHTML = tableHTML;
   
})
