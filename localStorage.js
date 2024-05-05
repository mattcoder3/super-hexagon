if (localStorage.getItem("record")) {
    var record = JSON.parse(localStorage.getItem("record"));
} else {
    var record = {}; 
}


function update_record(player, newRecord) {
    if (record.hasOwnProperty(player)) { // record > recordold.. UpdateRecord
        if (newRecord > record[player]) {
            record[player] = newRecord;
            
        } else {
            record[player] = newRecord; // if player no have record storage.. put new record 
        }
    }
    // Save Record Storage 

    localStorage.setItem("record", JSON.stringify(record));
}


var player = "MattCoder" // Name the User
var newRecord;
update_record(player, newRecord);

var recordPlayer = record[player]; // Get Player Specific Record

