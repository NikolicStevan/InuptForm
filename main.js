$(document).ready(function () {

    let token = localStorage.getItem("token");
    let payments = [];
    let dateOfBirthSortingOrder;
    let paymentSortingOrder;

    if (!token) {
        location.assign("/");
        return;
    }

    $("#myModal").modal("show");

    getPayments();

    function getPayments() {
        $.ajax({
            url: 'http://localhost:8080/MOCK_DATA.json',
            type: 'GET',
            data: {},
            success: function (result, status, xhr) {
                payments = result;
                printPayments();
            },
            error: function () {
                handleError('Error during reading payments from server');
            }
        });
    }

    function printPayments() {
        
        $('#payments tbody').empty();

        for (let i = 0; i < payments.length; i++) {
            let id = payments[i].id;
            let firstName = payments[i].first_name;
            let lastName = payments[i].last_name;
            let address = payments[i].address;
            let dateOfBirth = payments[i].date_of_birth;
            let payment = payments[i].payment;

            $('#payments tbody').append(`<tr id="payment${id}"></tr>`);
            $('#payment' + id)
                .append(`<td>${id}</td>
                                <td>${firstName}</td>
                                <td>${lastName}</td>
                                <td>${address}</td>
                                <td>${dateOfBirth}</td>
                                <td>${payment}</td>
                                `);
        }

        $('#payments').show();
    }

    $('#date-of-birth').click(function () {

        $(".arrowBirth").toggleClass("down");

        if (!dateOfBirthSortingOrder || dateOfBirthSortingOrder === 'DESC') {
            dateOfBirthSortingOrder = "ASC";
            payments.sort(function (p1, p2) {
                let dateArray = p1.date_of_birth.split('/');
                let day1 = parseInt(dateArray[0]);
                let month1 = parseInt(dateArray[1]);
                let year1 = parseInt(dateArray[2]);
                let d1 = new Date(year1, month1 - 1, day1);
                let dateArray2 = p2.date_of_birth.split('/');
                let day2 = parseInt(dateArray2[0]);
                let month2 = parseInt(dateArray2[1]);
                let year2 = parseInt(dateArray2[2]);
                let d2 = new Date(year2, month2 - 1, day2);
                return d1.getTime() - d2.getTime();
            });
        } else {
            dateOfBirthSortingOrder = "DESC";
            payments.sort(function (p1, p2) {
                let dateArray = p1.date_of_birth.split('/');
                let day1 = parseInt(dateArray[0]);
                let month1 = parseInt(dateArray[1]);
                let year1 = parseInt(dateArray[2]);
                let d1 = new Date(year1, month1 - 1, day1);
                let dateArray2 = p2.date_of_birth.split('/');
                let day2 = parseInt(dateArray2[0]);
                let month2 = parseInt(dateArray2[1]);
                let year2 = parseInt(dateArray2[2]);
                let d2 = new Date(year2, month2 - 1, day2);
                return d2.getTime() - d1.getTime();
            });
        }

        printPayments();
    });





    $('#payment').click(function () {

        $(".arrowPayment").toggleClass("down");
        
        if (!paymentSortingOrder || paymentSortingOrder === 'DESC') {
            paymentSortingOrder = "ASC";
            payments.sort(function (p1, p2) {
                let d1 = p1.payment.split('€');
                let d2 = p2.payment.split('€');
                return parseInt(d1[1]) - parseInt(d2[1]);

            });
        } else {
            paymentSortingOrder = "DESC";
            payments.sort(function (p1, p2) {
                let d1 = p1.payment.split('€');
                let d2 = p2.payment.split('€');
                return parseInt(d2[1]) - parseInt(d1[1]);

            });
        }
        printPayments();

    });







    //change on double click

    
    let editInput;
    $("#payments").on('dblclick', 'li', function () {
        oriVal = $(this).text();
        $(this).text('');
        $("<input type='text' value=" + oriVal + ">").appendTo(this).focus();
    });
    $("#parentUL").on('focusout', 'li > input', function () {
        var $this = $(this);
        $this.parent().text($this.val() || oriVal);
        $this.remove(); // Don't just hide, remove the element.

    });





    // search in table

    $("#search").keyup(function () {
        let value = this.value.toLowerCase().trim();
    
        $("table tr").each(function (index) {
            if (!index) return;
            $(this).find("td").each(function () {
                let id = $(this).text().toLowerCase().trim();
                let not_found = (id.indexOf(value) == -1);
                $(this).closest('tr').toggle(!not_found);
                return not_found;
            });
        });
    });





});