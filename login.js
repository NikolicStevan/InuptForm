$(document).ready(function () {



    let emailCheck = false;
    let pinCheck = false;
    let passwordCheck = false;

    let email = '';
    let pin = '';
    let pass = '';
    let token = localStorage.getItem('token');

    if (token) {
        location.assign('home.html');
    }

    $('#email').blur(function () {
        email = $('#email').val();
        const mailREG = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (mailREG.test(email)) {
            $("#checkEmail").text('')
            emailCheck = true;
        } else {
            $("#checkEmail").text("Doesn't look like a valid e-mail.")
        }
    });


    $('#password').blur(function () {
        pass = $('#password').val();

        if (pass.length >= 8 && pass.length <= 32) {
            $('#checkPassword').text('')
            return passwordCheck = true;
        } else {
            $('#checkPassword').text('Password must be between 8 and 32 character.')
        }
    });


    $('#pin').blur(function () {
        pin = $('#pin').val();

        if (pin.length >= 4 && pin.length <= 8) {
            $('#checkPin').text('')
            return pinCheck = true;
        } else {
            $('#checkPin').text('Pin must be between 4 and 8 character.')
        }
    });


    $('#submit').click(function () {
        $('#errorMsg').text('');
        if (!passwordCheck || !emailCheck || !pinCheck) {
            $('#errorMsg').text('Please enter your credentials.');
            return;
        } else {
            login(email, pin, pass);
        }

    });

  

    function login(email, pin, pass) {
        const data = {
            "email": email,
            "password": pass,
            "pin": pin
        };

        $.ajax({
            type: "POST",
            url: "https://reqres.in/api/login",
            data: data,
            success: function (result, status, xhr) {
                token = result.token;
                localStorage.setItem("token", token);
                location.assign("home.html");
            }
        });
    }





    $(".eye1").click(function () {
        $(".eye1").toggleClass("eye1Clicked");
        $('#password').attr('type', function (index, attr) {
            return attr == 'text' ? 'password' : 'text';
        });
    });


    $(".eye2").click(function () {
        $(".eye2").toggleClass("eye2Clicked");
        $('#pin').attr('type', function (index, attr) {
            return attr == 'text' ? 'password' : 'text';
        });
    });




});

