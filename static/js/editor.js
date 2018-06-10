'esversion: 6';
$(document).on('DOMContentLoaded', (event) => {
    console.log('DOM content loaded');

    const buildDiagram = (lv) => {
        lv.board.forEach((field) => {
            let nBlock = $('<div>')
                .css('position', 'absolute')
                .css('top', 0 + 'px')
                .css('left', 24 + 'px')
                .css('border', '1px solid black')
                .css('position', 'absolute')
                .css('width', 100 + 'px')
                .css('height', 25 + 'px')
                .attr('id', 'field-' + field.x.toString() +
                    '-' +
                    field.z.toString())
                .on('click', (e) => {
                    // let target = $(e.target);
                    let f = field;
                    console.log('N');
                });
            let sBlock = $('<div>')
                .css('position', 'absolute')
                .css('bottom', 0 + 'px')
                .css('left', 24 + 'px')
                .css('border', '1px solid black')
                .css('position', 'absolute')
                .css('width', 100 + 'px')
                .css('height', 25 + 'px')
                .attr('id', 'field-' + field.x.toString() +
                    '-' +
                    field.z.toString())
                .on('click', (e) => {
                    // let target = $(e.target);
                    let f = field;
                    console.log('S');
                });
            let eBlock = $('<div>')
                .css('position', 'absolute')
                .css('top', 24 + 'px')
                .css('right', 0 + 'px')
                .css('border', '1px solid black')
                .css('position', 'absolute')
                .css('width', 25 + 'px')
                .css('height', 100 + 'px')
                .attr('id', 'field-' + field.x.toString() +
                    '-' +
                    field.z.toString())
                .on('click', (e) => {
                    // let target = $(e.target);
                    let f = field;
                    console.log('E');
                });
            let wBlock = $('<div>')
                .css('position', 'absolute')
                .css('top', 24 + 'px')
                .css('left', 0 + 'px')
                .css('border', '1px solid black')
                .css('position', 'absolute')
                .css('width', 25 + 'px')
                .css('height', 100 + 'px')
                .attr('id', 'field-' + field.x.toString() +
                    '-' +
                    field.z.toString())
                .on('click', (e) => {
                    // let target = $(e.target);
                    let f = field;
                    console.log('W');
                });
            $('<div>')
                .addClass('div-field')
                .css('top', parseInt(field.z) * 150 + 'px')
                .css('left', parseInt(field.x) * 150 + 'px')
                .css('border', '1px solid black')
                .css('position', 'absolute')
                .css('width', 150 + 'px')
                .css('height', 150 + 'px')
                .attr('id', 'field-' + field.x.toString() +
                    '-' +
                    field.z.toString())
                .on('click', (e) => {
                    // let target = $(e.target);
                    let f = field;
                    console.log(f.x + ', ' + f.z);
                })
                .append(nBlock)
                .append(wBlock)
                .append(eBlock)
                .append(sBlock)
                .appendTo(content);
        });
    };

    let level;
    let content = $('.editor-content');

    $('#navigation-form').hide();
    $('#save-form').hide();
    $('#export-form').hide();

    $('#button-generate').on('click', (e) => {
        let width = $('#input-width').val();
        let length = $('#input-length').val();
        let name = $('#input-name').val();
        if (width && length && name) {
            level = new Level(width, length, name, 1);
            buildDiagram(level);
            $('#generator-form').hide();
            $('#navigation-form').show();
            $('#save-form').show();
            $('#export-form').show();
            $('#span-name').text('Name: ' + level.name);
            $('#span-num').text('Number of Players: ' + level.numOfPlayers);
            $('#span-dimensions').text('Dimensions: ' +
                level.width + 'x' + level.length);
        }
    });

    $('#button-regenerate').on('click', (e) => {
        $('#generator-form').show();
        $('#navigation-form').hide();
        $('#save-form').hide();
        $('#export-form').hide();
        content.empty();
        level = null;
    });

    $('#button-import').on('click', (e) => {
        let data = $('#textarea-import').val();
        level = Level.loadJSON(data);
        content.empty();
        buildDiagram(level);
        $('#generator-form').hide();
        $('#navigation-form').show();
        $('#save-form').show();
        $('#span-name').text('Name: ' + level.name);
        $('#span-num').text('Number of Players: ' + level.numOfPlayers);
        $('#span-dimensions').text('Dimensions: ' + level.width +
            'x' + level.length);
    });
});
