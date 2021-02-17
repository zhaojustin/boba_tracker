// set date
var d = new Date();
document.getElementById("date").value = (d.getMonth()+1)+"/"+d.getDate();

async function updateStats() {
    // get data
    fetch("https://api.apispreadsheets.com/data/8288/").then(res=>{
        if (res.status === 200){
            // SUCCESS
            res.json().then(data=>{
                const bobaData = data;
                console.log(bobaData);

                // set length
                var length = 0;
                for(var i in bobaData.data) {
                    length++;
                }
                document.getElementById("drinks_amount").innerHTML = length;

                // set total cost
                var cost = 0;
                for(var i = 0; i<length; i++) {
                    cost += parseFloat(bobaData.data[i].Price.substring(1));
                }
                document.getElementById("total_cost").innerHTML = '$' + cost.toFixed(2);

                // set recent date
                var date = bobaData.data[length-1].Date;
                document.getElementById("recent_time").innerHTML = date;

            }).catch(err => console.log(err))
        }
        else{
            // ERROR
        }
    })
}
    
updateStats();

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
          updateStats();
        },
        error: function(){
          alert("There was an error :(")
        }
    });
}