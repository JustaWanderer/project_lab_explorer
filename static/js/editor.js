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
        'aqua',
        'blue',
        'pink',
        'purple',
    ];

    const doorColors = [
        'dimgrey',
        'lightgrey',
        'darkred',
    ];

    let keys = [];
    let switches = [];
    let level = new Level(1, 1, '', 1);
    let content = $('.editor-content');
    let selected = null;
    let fieldSelected = false;
    let doorSelected = false;

    /**
     * Sets a field on the diagram and in level
     * @param {number} x x position
     * @param {number} z z position
     * @param {object} type field object imported from server
     */
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
            pre.text('key\n' + key.id);
            f.content = key;
            keys.push(key);
        }
        if (type.code === 3 || type.code === 4 || type.code === 5) {
            let sw = {
                id: switches.length, // how much health takes away
            };
            pre.text(type.name + '\n' + sw.id);
            f.content = sw;
            switches.push(sw);
        }
        if (type.code === 6) {
            f.content = {
                type: 'fireplace',
                strength: 1, // how much health takes away
            };
        }
        // if (type.code === 3)
        level.board.push(f);
        console.log(level.board);
    };

    /**
     * Sets a door on diagram and in level.
     * @param {number} x x parameter
     * @param {number} z y parameter
     * @param {string} dir direction (n, w, s, e)
     * @param {object} type door object imported from server
     * @param {Boolean} [reflect] whether to automatically set doors on the other side (default true)
     */
    const setDoor = (x, z, dir, type) => {
        $('#' + dir + '-field-' + x + '-' + z)
            .css('background-color', doorColors[type.code]);
        level.getField(x, z).setDoor(dir, type.code);
        console.log(level.getField(x, z));
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
                    .css('background-color', 'white')
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
                        if (selected !== null && doorSelected) {
                            setDoor(x, z, 'n', selected);
                        }
                    });
                let sBlock = $('<div>')
                    .css('position', 'absolute')
                    .css('background-color', 'white')
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
                        if (selected !== null && doorSelected) {
                            setDoor(x, z, 's', selected);
                        }
                    });
                let eBlock = $('<div>')
                    .css('position', 'absolute')
                    .css('background-color', 'white')
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
                        if (selected !== null && doorSelected) {
                            setDoor(x, z, 'e', selected);
                        }
                    });
                let wBlock = $('<div>')
                    .css('position', 'absolute')
                    .css('background-color', 'white')
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
                        if (selected !== null && doorSelected) {
                            setDoor(x, z, 'w', selected);
                        }
                    });
                $('<div>')
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
                .css('background-color', fieldColors[fieldType.code])
                .on('click', () => {
                    if (!fieldSelected || selected.code !== fieldType.code) {
                        selected = fieldType;
                        fieldSelected = true;
                        doorSelected = false;
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
                .css('background-color', doorColors[v.code])
                .on('click', () => {
                    if (!doorSelected || selected.code !== fieldType.code) {
                        selected = fieldType;
                        doorSelected = true;
                        fieldSelected = false;
                        $('#door-types-form')
                            .children()
                            .css('font-weight', 'initial');
                        $('#field-types-form')
                            .children()
                            .css('font-weight', 'initial');
                        b.css('font-weight', 'bold');
                    } else {
                        selected = null;
                        doorSelected = false;
                        b.css('font-weight', 'initial');
                    }
                })
                .appendTo($('#door-types-form'));
        });
    });
});
