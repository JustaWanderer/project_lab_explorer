'esversion: 6';
$(document).on('DOMContentLoaded', (event) => {
    console.log('DOM content loaded');
    const fieldColors = [
        'gray',
        'red',
        'gold',
        'green',
        'green',
        'green',
        'orange',
    ];

    let keys = [];
    let level = new Level(1, 1, '', 1);
    let content = $('.editor-content');
    let selected = null;
    let fieldSelected = false;
    let doorSelected = false;

    const setField = (x, z, type) => {
        let f = new Field(x, z, type.code);
        $('#field-' + x + '-' + z)
            .css('background-color', fieldColors[type.code])
            .children('pre')
            .remove();
        let pre = $('<pre>')
            .text(type.name)
            .css('position', 'absolute')
            .css('top', '40%')
            .css('width', '100%')
            .css('text-align', 'center')
            .appendTo($('#field-' + x + '-' + z));
        if (type.code === 1) {
            f.content = {
                type: 'enemy',
                strength: 1, // how much health takes away
            };
        }
        if (type.code === 2) {
            let key = {
                type: 'key',
                id: keys.length, // how much health takes away
            };
            pre.text('key ' + key.id);
            f.content = key;
            keys.push(key);
        }
        // if (type.code === 3)
        level.board.push(f);
    };
    /**
     * @param {Level} lv
     */
    const buildDiagram = (lv) => {
        for (let z = 0; z < lv.length; z++) {
            for (let x = 0; x < lv.width; x++) {
                let f = {
                    x: x,
                    z: z,
                };
                let nBlock = $('<div>')
                    .css('position', 'absolute')
                    .css('top', 0 + 'px')
                    .css('left', 24 + 'px')
                    .css('border', '1px solid black')
                    .css('position', 'absolute')
                    .css('width', 100 + 'px')
                    .css('height', 25 + 'px')
                    .attr('id', 'n-field-' + x +
                        '-' +
                        z)
                    .on('click', (e) => {
                        // let target = $(e.target);
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
                    .attr('id', 's-field-' + x +
                        '-' +
                        z)
                    .on('click', (e) => {
                        // let target = $(e.target);
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
                    .attr('id', 'e-field-' + x +
                        '-' +
                        z)
                    .on('click', (e) => {
                        // let target = $(e.target);
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
                    .attr('id', 'w-field-' + x +
                        '-' +
                        z)
                    .on('click', (e) => {
                        // let target = $(e.target);
                        console.log('W');
                    });
                let div = $('<div>')
                    .addClass('div-field')
                    .css('top', z * 150 + 'px')
                    .css('left', x * 150 + 'px')
                    .css('border', '1px solid black')
                    .css('position', 'absolute')
                    .css('width', 150 + 'px')
                    .css('height', 150 + 'px')
                    .attr('id', 'field-' + x +
                        '-' +
                        z)
                    .on('click', (e) => {
                        // let target = $(e.target);
                        if (selected !== null && fieldSelected) {
                            setField(f.x, f.z, selected);
                        }
                    })
                    .append(nBlock)
                    .append(wBlock)
                    .append(eBlock)
                    .append(sBlock)
                    .appendTo(content);
            }
        }
    };

    $('#navigation-form').hide();
    $('#save-form').hide();
    $('#export-form').hide();
    $('#field-types-form').hide();
    $('#door-types-form').hide();

    $('#button-generate').on('click', (e) => {
        let width = $('#input-width').val();
        let length = $('#input-length').val();
        let name = $('#input-name').val();
        if (width && length && name) {
            level = new Level(parseInt(width), parseInt(length), name, 1);
            buildDiagram(level);
            $('#generator-form').hide();
            $('#navigation-form').show();
            $('#save-form').show();
            $('#export-form').show();
            $('#field-types-form').show();
            $('#door-types-form').show();
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
        $('#field-types-form').hide();
        $('#door-types-form').hide();
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

    $('#button-export').on('click', (e) => {
        $('#textarea-export').val(level.getJSON());
    });

    h.ajax('/fieldTypes').then((data) => {
        data.forEach((v) => {
            const fieldType = v;
            let b = $('<button>')
                .text(fieldType.name)
                .css('display', 'block')
                .on('click', () => {
                    if (!fieldSelected || selected.code !== fieldType.code) {
                        console.log('selected: ' + fieldType.code);
                        selected = fieldType;
                        fieldSelected = true;
                        $('#field-types-form')
                            .children()
                            .css('font-weight', 'initial');
                        $('#door-types-form')
                            .children()
                            .css('font-weight', 'initial');
                        b.css('font-weight', 'bold');
                    } else {
                        selected = null;
                        fieldSelected = false;
                        b.css('font-weight', 'initial');
                    }
                })
                .appendTo($('#field-types-form'));
        });
    });

    h.ajax('/doorTypes').then((data) => {
        data.forEach((v) => {
            const fieldType = v;
            let b = $('<button>')
                .text(fieldType.name)
                .css('display', 'block')
                .on('click', () => {
                    if (!doorSelected || selected.code !== fieldType.code) {
                        console.log('selected: ' + fieldType.code);
                        selected = fieldType;
                        fieldSelected = true;
                        $('#door-types-form')
                            .children()
                            .css('font-weight', 'initial');
                        $('#field-types-form')
                            .children()
                            .css('font-weight', 'initial');
                        b.css('font-weight', 'bold');
                    } else {
                        selected = null;
                        fieldSelected = false;
                        b.css('font-weight', 'initial');
                    }
                })
                .appendTo($('#door-types-form'));
        });
    });
});
