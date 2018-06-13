const getFieldTypes = () => {
    return [{
            code: 0,
            name: 'empty',
        },
        {
            code: 1,
            name: 'enemy',
        },
        {
            code: 2,
            name: 'treasure', // for now, only keys
        },
        {
            code: 3,
            name: 'lever', // able to switch ON and OFF
        },
        {
            code: 4,
            name: 'button', // fires an event, no switching
        },
        {
            code: 5,
            name: 'pressure-plate',
            // fires event when entering and another while leaving
        },
        {
            code: 6,
            name: 'fireplace',
            // fires event when entering and another while leaving
        },
        {
            code: 7,
            name: 'p1-start',
        },
        {
            code: 8,
            name: 'p2-start',
        },
        {
            code: 9,
            name: 'p1-finish',
        },
        {
            code: 10,
            name: 'p2-finish',
        },
    ];
};

const getDoorTypes = () => {
    // bind specifies what type of door must be on the other side
    return [{
            code: 0,
            name: 'wall',
            bind: 0,
        },
        {
            code: 1,
            name: 'open-door',
            bind: 1,
        },
        {
            code: 2,
            name: 'locked-door',
            // openable by key in treasure field or lever etc.
            bind: 2,
        },
        {
            code: 3,
            name: 'one-way-in',
            bind: 4,
        },
        {
            code: 4,
            name: 'one-way-out',
            bind: 3,
        },
    ];
};

module.exports = {
    getFieldTypes: getFieldTypes,
    getDoorTypes: getDoorTypes,
};
