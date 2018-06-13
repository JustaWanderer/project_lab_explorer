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
};
