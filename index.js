function onRegister() {
    var gender = +$("input[name='gender']:checked").val();
    var course = $('#rcourse').find(":selected").val();
    var branch = $('#rbranch').find(":selected").val();
    var yos = +$('#ryos').find(":selected").val();
    var data = {
        "regno": $("#rregno").val(), 
        "fn": $("#rfname").val(),
        "ln": $("#rlname").val(),
        "dob": $("#rdob").val(),
        "email": $("#remail").val(),
        "mob": $("#rmob").val(),
        "gender": gender,
        "clg": $("#rclg").val(),
        "course": course,
        "branch": branch,
        "yos": yos,
        "yoj": +$("#ryoj").val()};
    console.log(data);
    $.ajax({
        url: "http://localhost:8080/students/register",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        dataType: "json",
        success: function (msg) {
            console.log(msg);
            $('#reg-text').html("Student details are registered successfully!");
            $('#reg-status').toast({animation: false, delay: 2000});
            $('#reg-status').toast('show');
        },
        error: function (req, status, error) {
            $('#reg-text').html("Registration failed!");
            $('#reg-status').toast({animation: false, delay: 2000});
            $('#reg-status').toast('show');
        }
    });
}

function onUpdate() {
    var gender = +$('#ugender').find(":selected").val();
    var course = $('#ucourse').find(":selected").val();
    var branch = $('#ubranch').find(":selected").val();
    var yos = +$('#uyos').find(":selected").val();
    var data = {
        "regno": $("#uregno").val(), 
        "fn": $("#ufname").val(),
        "ln": $("#ulname").val(),
        "dob": $("#udob").val(),
        "email": $("#uemail").val(),
        "mob": $("#umob").val(),
        "gender": gender,
        "clg": $("#uclg").val(),
        "course": course,
        "branch": branch,
        "yos": yos,
        "yoj": +$("#uyoj").val()};
    console.log(data);
    $.ajax({
        url: "http://localhost:8080/students/update",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        dataType: "json",
        success: function (msg) {
            console.log(msg);
            $('#update-text').html("Student details are updated successfully!");
            $('#update-status').toast({animation: false, delay: 2000});
            $('#update-status').toast('show');
        },
        error: function (req, status, error) {
            $('#update-text').html("Update failed!");
            $('#update-status').toast({animation: false, delay: 2000});
            $('#update-status').toast('show');
        }
    });
}

function onLoadStudentsView() {
    var table_content =
        '<table class="table" border="1" id="view_data">';
    table_content += 
        '<thead>\
         <tr>\
         <th scope="col">First Name</th>\
         <th scope="col">Last Name</th>\
         <th scope="col">Date Of Birth</th>\
         <th scope="col">Email ID</th>\
         <th scope="col">Mobile Number</th>\
         <th scope="col">Gender</th>\
         <th scope="col">College</th>\
         <th scope="col">Course</th>\
         <th scope="col">Branch</th>\
         <th scope="col">Year Of Join</th>\
         <th scope="col">Year Of Study</th>\
         <th scope="col">Registration Number</th>\
         <th scope="col">Update</th>\
         <th scope="col">Delete</th>\
         </tr>\
         </thead>';
    $.ajax({
        url: "http://localhost:8080/students",
        type: "GET",
        contentType: "application/json",
        data: "{}",
        dataType: "json",
        success: function (students) {
            console.log(students);
            table_content += '<tbody>';
            for(var i in students) {
                var student = students[i];
                console.log(student);
                var date = new Date(student.DateOfBirth);
                var gender = (student.Gender==1)?"Male":((student.Gender==2)?"Female":"Other");
                var course = (student.Course==1)?"B.Tech":"M.Tech";
                table_content += 
                    '<tr>\
                    <td>'+student.FirstName+'</td>\
                    <td>'+student.LastName+'</td>\
                    <td>'+date.getFullYear()+"-"+("0"+(date.getMonth()+1)).slice(-2)+"-"+("0"+date.getDate()).slice(-2)+'</td>\
                    <td>'+student.EmailID+'</td>\
                    <td>'+student.MobileNo+'</td>\
                    <td>'+gender+'</td>\
                    <td>'+student.College+'</td>\
                    <td>'+course+'</td>\
                    <td>'+student.Branch+'</td>\
                    <td>'+student.YearOfJoin+'</td>\
                    <td>'+student.YearOfStudy+'</td>\
                    <td>'+student.RegistrationNo+'</td>\
                    <td><a href="update.html?regno='+student.RegistrationNo+'">Update</a></td>\
                    <td><a href="" onclick="onDelete('+student.RegistrationNo+')">Delete</a></td>\
                    </tr>';
            }
            table_content += '</tbody>';
            $("#students-list").html(table_content);
        },
        error: function (req, status, error) {
            console.log(req);
            console.log(status);
            console.log(error);
            alert("Error try again");
        }
    });
}

function getURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}

function onLoadUpdateView() {
    var regno = getURLParameter("regno");
    $("#uregno").val(regno);
    $.ajax({
        url: "http://localhost:8080/students/"+regno,
        type: "GET",
        contentType: "application/json",
        data: "{}",
        dataType: "json",
        success: function (student) {
            console.log(student);
            var date = new Date(student.DateOfBirth);
            console.log(date);
            $("#ufname").val(student.FirstName);
            $("#ulname").val(student.LastName);
            $("#udob").val(date.getFullYear()+"-"+("0"+(date.getMonth()+1)).slice(-2)+"-"+("0"+date.getDate()).slice(-2));
            $("#ugender").val(student.Gender);
            $("#uemail").val(student.EmailID);
            $("#uclg").val(student.College);
            $("#umob").val(student.MobileNo);
            $("#ucourse").val(student.Course);
            $("#ubranch").val(student.Branch);
            $("#uyoj").val(student.YearOfJoin);
            $("#uyos").val(student.YearOfStudy);
        },
        error: function (req, status, error) {
            console.log(req);
            console.log(status);
            console.log(error);
            alert("Error try again");
        }
    });
}

function onDelete(regno) {
    $.ajax({
        url: "http://localhost:8080/students/"+regno,
        type: "DELETE",
        contentType: "application/json",
        data: '{}',
        dataType: "json",
        success: function (msg) {
            console.log(msg);
            $('#del-text').html("Student is deleted successfully!");
            $('#del-status').toast({animation: false, delay: 2000});
            $('#del-status').toast('show');
        },
        error: function (req, status, error) {
            $('#del-text').html("Deletion failed!");
            $('#del-status').toast({animation: false, delay: 2000});
            $('#del-status').toast('show');
        }
    });
}
