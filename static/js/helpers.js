const h = {
    /**
     * Generates an ajax request.
     * @param {string} url url of the request
     * @param {string} [method] method - defaults do 'GET'
     * @param {object} [data] data to send - defaults to null
     * @return {Promise<any>}
     */
    ajax: (url, method = 'GET', data = null) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                method: method,
                data: data,
                success: (data) => {
                    resolve(data);
                },
                error: (err) => {
                    reject(err);
                },
            });
        });
    },

    /**
     * Formats time to MM:SS.MMM
     * @param {number} milliseconds
     * @return {string}
     */
    formatDate: (milliseconds) => {
        let mil = milliseconds % 1000;
        let sec = Math.floor(milliseconds / 1000) % 60;
        let min = Math.floor(milliseconds / (1000 * 60)) % 60;
        let mi = '00' + mil;
        let s = '00' + sec;
        let m = '00' + min;
        return m.substr(-2) + ':' + s.substr(-2) + '.' + mi.substr(-3);
    },
};
