$(document).ready(() => {
    $('#add').on('click', () => {
        h.ajax('/addUser', 'POST', {
            login: $('#login').val(),
            password: $('#password').val(),
        }).then((data) => {
            console.log(data);
            h.ajax('/getUsers').then((data) => {
                console.log(data);
            }, console.error);
        }, console.error);
    });
});
