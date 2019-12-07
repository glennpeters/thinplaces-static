window.addEventListener("DOMContentLoaded", function () {

    // Get the form elements defined in your form HTML above

    var form = document.getElementById("mail-form");
    // var button = document.getElementById("mail-form-button");
    var reset = document.getElementById("mail-form-button");
    var status = document.getElementById("mail-form-status");

    // Success and Error functions for after the form is submitted

    function success() {
        form.reset();
        // form.style = "display: none";
        $(status).addClass('text-focus-in');
        status.innerHTML = "Thanks!  I'll be in touch as soon as possible.";
    }

    function reset() {
        status.innerHTML = "";
    }

    function error() {
        status.innerHTML = "Oops! There was a problem.";
    }

    // Handle reset
    reset.addEventListener("click", reset);

    // handle the form submission event
    form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var data = new FormData(form);
        ajax(form.method, form.action, data, success, error);
    });
});

// helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200) {
            success(xhr.response, xhr.responseType);
        } else {
            error(xhr.status, xhr.response, xhr.responseType);
        }
    };
    xhr.send(data);
}