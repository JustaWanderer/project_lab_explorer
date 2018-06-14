$(document).ready(() => {
    $('#add').on('click', () => {
        h.ajax('/addUser', 'POST', {
            login: $('#login').val(),
            password: $('#password').val(),
        }).then(console.log, console.error);
    });

    h.ajax('/getLevels').then((data) => {
        data.forEach((level) => {
            let d = $('<div>')
                .append($('<p>')
                    .html('<h2>' + JSON.parse(level.jsonData).name + '</h2>Author: ' + level.author)
                    .on('click', () => {
                        let url = window.location.href;
                        if (url.endsWith('/')) {
                            url = url.substr(0, url.length - 1);
                        }
                        url += '/game?id=' + level._id;
                        console.log(url);
                        window.location = url;
                    })
                )
                .append($('<button>')
                    .text('PREVIEW')
                    .on('click', () => {
                        d.append($(new Minimap(JSON.parse(level.jsonData)).getCanvas()));
                    })
                )
                .appendTo($('#levels-form'));
        });
    }, console.error);
});
