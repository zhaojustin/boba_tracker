// set date
var d = new Date();
document.getElementById("date").value = (d.getMonth()+1)+"/"+d.getDate();

// send information to google sheets
function sendData() {

    var date = document.getElementById("date").value;
    var drink = document.getElementById("drink").value;
    var topping = document.getElementById("topping").value;
    var store = document.getElementById("store").value;
    var price = document.getElementById("price").value;

    document.getElementById("drink_date").innerHTML = date;
    document.getElementById("drink_name").innerHTML = drink;
    document.getElementById("drink_topping").innerHTML = topping;
    document.getElementById("drink_store").innerHTML = store;
    document.getElementById("drink_price").innerHTML = price;

    $.ajax({
        url:'https://api.apispreadsheets.com/data/8288/',
        type:'post',
        data:$("#sendData").serializeArray(),
        success: function(){
          console.log("Form Data Submitted :)")
        },
        error: function(){
          alert("There was an error :(")
        }
    });
}