let dat = [];
let page = 0;
fetch("user.json")
.then(function(response) {
    // return json.parse(response);
    return response.json();
})
.then(function (data) {
    dat = data;
    const no = parseInt(document.getElementById('page').value);
    const start = page * no;
    const end = page * no + no;
    const temp = dat.slice(start,end);
    // console.log(temp);
    displayUser(temp);
    loadData(dat)
    // const no = parseInt(document.getElementById('page').value);
    // const start = page * no;
    // const end = page * no + no;
    // const temp = dat.slice(start,end);
    // console.log(temp);
    // displayUser(temp);
    // displayUser(dat);
    // console.log(dat);
    // let x = Math.ceil(dat.length)/2;
})


function displayUser(array) {
    var row = `<tr class="content">
    <th>ID</th>
    <th>SALUTATION</th>
    <th onclick = "sortTable(2)">FIRST NAME<i class="fas fa-arrows-alt-v"></i></th>
    <th>LAST NAME</th>
    <th>EMAIL</th>
    <th>GENDER</th>
    <th>PHONE</th>
    <th>COUNTRY</th>
    <th>STATE</th>
    <th>CITY</th>
    <th onclick = "sortTable(10)">DATE</th>
    <th>ACTION</th>
    </tr>`;
    array.forEach(function(arr, i) {
        row +=`<tr><td>${arr.id}</td>
                <td>${arr.salutation}</td>
                <td>${arr.first_name}</td>
                <td>${arr.last_name}</td>
                <td>${arr.email}</td>
                <td>${arr.gender}</td>
                <td>${arr.phone}</td>
                <td>${arr.country}</td>
                <td>${arr.state}</td>
                <td>${arr.city}</td>
                <td>${arr.date}</td>
                <td><i class='fa fa-edit' onclick = editUser(${i});></i>
                <i class='far fa-trash-alt' onclick = deleted(${i});></i></td></tr>`;
     })
     document.getElementById("tbl").innerHTML = row;
        
}

document.getElementById("prev").addEventListener("click", function() {
    // alert("Hai");
    const no = parseInt(document.getElementById('page').value);
    const start = page * no;
    const end = page * no + no;
    const temp = dat.slice(start,end);
    console.log(temp);
    displayUser(temp);
})

document.getElementById("next").addEventListener("click", function() {
    // alert("Hai");
    const no = parseInt(document.getElementById('page').value);
    const start = no;
    const end = no + 20;
    const temp = dat.slice(start,end);
    console.log(temp);
    displayUser(temp);
})

document.getElementById("three").addEventListener("click", function() {
    // alert("Hai");
    displayUser(dat)
})






// function paginate(dir){
//     if(parseInt(dir)===1){
//         // document.getElementById("next").style.display = "hide";
//         page++;
//     }
//     else{
//         // let news = document.getElementById("nexe");
//         // news.style.visibility = "hidden";
//         page--;
//     }
//    const no = parseInt(document.getElementById('page').value);
//    const start = page * no;
//    const end = page * no + no;
//    const temp = dat.slice(start,end);
//    displayUser(temp);
// // } 

function searching(){
    
    let count =document.getElementById('tbl').rows[0].cells.length;
    console.log(count)
    var inputValue=document.getElementById('filt').value.toLowerCase();
    //  filter=input.value.toUpperCase();
    if(inputValue != null){
        let table=document.getElementById('tbl');
        let tr=table.getElementsByTagName('tr');
        for( let i=1; i<tr.length;i++){
            let flag=0;
            for(let j=0; j<count; j++){
                td=tr[i].getElementsByTagName('td')[j];
                if(td){
                    
                    if(td.innerHTML.toLowerCase().indexOf(inputValue) > -1){
                        flag=1;
                    }
                    else{}
                }
            }
            if(flag==1){
                tr[i].style.display="";
            }
            else{
                tr[i].style.display="none";
            }
        }
    }
}





// function deleted(id) {
//     console.log(id);
// }
// function deleted()
function AddUser() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    let current = day+'-'+month+'-'+year;
    var id = document.getElementById("id").value;
    var salutation = document.getElementById("salutation").value;
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var email = document.getElementById("email").value;
    var gender = document.querySelector('input[type=radio][name=gender]:checked').value;
    var phone = document.getElementById("phone").value;
    var country = document.getElementById("input").value;
    var state = document.getElementById("select").value;
    var city = document.getElementById("city").value;
    var index = document.getElementById('index').value;
    let arr = {"id": id, "salutation" : salutation, "first_name": fname, "last_name": lname, "email": email, "gender" : gender, "phone" : phone, "country": country, "state": state, "city" : city, "date": current};
    console.log(index);



    if(index == "" || index == undefined) {
        dat.push(arr);
        showAlert('Successfully Added!!!', 'success');

        // data.map(row);
        // console.log(a)
    } else {
        dat.splice(index,1,arr);
        showAlert('Successfully Edited!!!', 'success');
        // document.getElementById('btn').innerHTML = "Edit";
    }
    displayUser(dat);
    // console.log(data)
    hideModel();
    resetForm();
    // console.log(a)
}

function countryChange() {
    var a = document.getElementById('input').value;
    // console.log(a)
    if(a === 'India') {
        var array = ["Kerala", "Tamilnadu", "Utter Predesh", "Punchab"];

    } else if(a === 'USA') {
        var array = ["Washington", "Texas", "Ontario"];
    }
    else {
        var array = [];
    }
    var string = "";
    for(let i=0; i<array.length; i++) {
        string = string+"<option>"+array[i]+"</option>";
    }
    string = "<select name='lol'>"+string+"<select>";
    document.getElementById('select').innerHTML = string;
}

// function reFreshe() {
//     document.getElementById('form').reset();
// }

 
function editUser(i) {
    showModal();  
    // console.log(i)
    var arr = dat[i];
    console.log(arr);
    document.getElementById('id').value = arr.id;
    document.getElementById('salutation').value = arr.salutation;
    document.getElementById('fname').value = arr.first_name;
    document.getElementById('lname').value = arr.last_name;
    document.getElementById('email').value = arr.email;
    document.getElementsByName('gender').value = arr.gender;
    document.getElementById('phone').value = arr.phone;
    document.getElementById('input').value = arr.country;
    document.getElementById('select').value = arr.state;
    document.getElementById('city').value = arr.city;

    document.getElementById('index').value = i;
    // document.getElementById('btn').innerText = "Update User";
    
} 


function deleted(i) {
    // let a = [];
    alert('do you want to delete?');
    // console.log(i);
    dat.splice(i,1);
    // document.getElementById('index').value = null;
    // a.splice(i,1);
    showAlert('Successfully Deleted!!!', 'error');
    displayUser(dat);

    // i.delete();
}
// function deleteUser(i) {
//     alert("Are you sure want to delete!!!?");
//     console.log(i);
//     // data.splice(i,1);
//     // displayUser(data);
//     // alert("Are you sure want to delete!!!?");
//     // let del = id.parentElement.parentElement;
//     // del.remove();
//     // console.log(del)
// }
    

    // document.getElementById("btn").addEventListener("click", AddUser);

    // displayUser(dat);   





    function sortTable(n) {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("tbl");
        switching = true;
        //Set the sorting direction to ascending:
        dir = "asc"; 
        /*Make a loop that will continue until
        no switching has been done:*/
        while (switching) {
          //start by saying: no switching is done:
          switching = false;
          rows = table.rows;
          /*Loop through all table rows (except the
          first, which contains table headers):*/
          for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /*check if the two rows should switch place,
            based on the direction, asc or desc:*/
            if (dir == "asc") {
              if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                //if so, mark as a switch and break the loop:
                shouldSwitch= true;
                break;
              }
            } else if (dir == "desc") {
              if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                //if so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
              }
            }
          }
          if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchcount ++;      
          } else {
            /*If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again.*/
            if (switchcount == 0 && dir == "asc") {
              dir = "desc";
              switching = true;
            }
          }
        }
      }
      









var model = document.getElementById('modal');
function showModal() {
  model.style.display = "block";
}

function hideModel(){
    resetForm();
    document.getElementById('index').value = null;
    document.getElementById('msgId').innerHTML = "";
    document.getElementById('msgSalutation').innerHTML = "";
    document.getElementById('msgFname').innerHTML = "";
    document.getElementById('msgLname').innerHTML = "";
    document.getElementById('msgEmail').innerHTML = "";
    document.getElementById('msgMobile').innerHTML = "";
    document.getElementById('msgCity').innerHTML = "";
    model.style.display = "none"; 
}

// document.getElementById("close").addEventListener("click", function() {
//     // resetForm();
//     model.style.display = "none";
// })


// document.getElementById('form').addEventListener('submit', function() {
//     if(document.getElementById('id').value === '') {
//         document.getElementById('msgId').innerHTML = "**Id can't large 2";
//     }
// })

function resetForm() {
    document.getElementById('id').value = "";
    document.getElementById('salutation').value ="";
    document.getElementById('fname').value="";
    document.getElementById('lname').value="";
    document.getElementById('email').value="";
    document.getElementsByName('gender').value="";
    document.getElementById('phone').value="";
    document.getElementById('input').value="";
    document.getElementById('select').value="";
    document.getElementById('city').value="";
}





function showAlert(message, className) {
   
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.example');
    const form = document.querySelector('#filter');
    console.log(form)
    container.insertBefore(div, form);

    setTimeout(function() {
        document.querySelector('.alert').remove();
    },2000);
}


let id = document.getElementById('id');
let msg = document.querySelector('.msg');
let salutation = document.getElementById('salutation');
let fname = document.getElementById('fname');
let lname = document.getElementById('lname');
let email = document.getElementById('email');
let phone = document.getElementById('phone');
let city = document.getElementById("city");

id.addEventListener('input', function() {
    if(id.value.length > 2 || id.value === '') {
        id.style.color = 'red';
        document.getElementById('msgId').innerHTML = "**Id can't large 2";
        msg.style.color = 'red';
        
    }
    else {
        document.getElementById('msgId').innerHTML = "";
        id.style.color = 'green';
    }
    // resetForm();
})

salutation.addEventListener('input', function() {
    if(salutation.value.length > 3 || salutation.value === '') {
        document.getElementById('msgSalutation').innerHTML = "**Salutation can't large 3";
        msg.style.color = 'red';
        salutation.style.color = 'red';
    
    }
    else {
        document.getElementById('msgSalutation').innerHTML = "";
        salutation.style.color = 'green';
    }
})

fname.addEventListener('input', function() {
    if(fname.value.length > 15 || fname.value === '') {
        document.getElementById('msgFname').innerHTML = "**cant large 6";
        msg.style.color = 'red';
        fname.style.color = 'red';
        
    }
    else {
        document.getElementById('msgFname').innerHTML = "";
        fname.style.color = 'green';
    }
})
lname.addEventListener('input', function() {
    if(lname.value.length > 15 || lname.value === '') {
        document.getElementById('msgLname').innerHTML = "**cant large 6";
        msg.style.color = 'red';
        lname.style.color = 'red';
        
    }
    else {
        document.getElementById('msgLname').innerHTML = "";
        lname.style.color = 'green';
    }
})
email.addEventListener('input', function() {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   
    if(!email.value.match(re)) {
        document.getElementById('msgEmail').innerHTML = "**Enter Valid email";
        msg.style.color = 'red';
        email.style.color = 'red';
    }
    else {
        document.getElementById('msgEmail').innerHTML = "";
        email.style.color = 'green';
    }
    
})



phone.addEventListener('input', function() {
    let phoneno = /^\d{10}$/;
    if(!phone.value.match(phoneno)) {
        document.getElementById('msgMobile').innerHTML = "**Please Enter 10 places";
        msg.style.color = 'red';
        phone.style.color = 'red';
    }
    else {
        document.getElementById('msgMobile').innerHTML = "";
        phone.style.color = 'green';
    }
})
city.addEventListener('input', function() {
    if(city.value.length > 20 || city.value === '') {
        document.getElementById('msgCity').innerHTML = "**cant larger than 20";
        msg.style.color = 'red';
        city.style.color = 'red';
        
    }
    else {
        document.getElementById('msgFname').innerHTML = "";
        city.style.color = 'green';
    }
})