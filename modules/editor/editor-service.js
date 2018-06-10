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
            name: 'treasure',
        },
        {
            code: 2,
            name: 'lever', // able to switch ON and OFF
        },
        {
            code: 3,
            name: 'button', // fires an event, no switching
        },
        {
            code: 2,
            name: 'pressure-plate',
            // fires event when entering and another while leaving
        },
    ];
};

const getDoorTypes = () => {
    // bind specifies what type of door must be on the other side
    return [{
            code: 0,
            type: 'wall',
            bind: 0,
        },
        {
            code: 1,
            type: 'open-door',
            bind: 1,
        },
        {
            code: 2,
            type: 'locked-door',
            // openable by key in treasude field or lever etc.
            bind: 2,
        },
        {
            code: 3,
            type: 'one-way-in',
            bind: 4,
        },
        {
            code: 4,
            type: 'one-way-out',
            bind: 3,
        },
    ];
};

module.exports = {
    getFieldTypes: getFieldTypes,
    getDoorTypes: getDoorTypes,
};
