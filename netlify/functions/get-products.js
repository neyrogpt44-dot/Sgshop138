const axios = require('axios');

exports.handler = async function(event, context) {
    const URL = 'https://fireboxstore.ru/link/b2427725d518f7884093a2a43dd8702bae53552b.xml';
    try {
        const { data } = await axios.get(URL);
        return {
            statusCode: 200,
            headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "text/xml" },
            body: data
        };
    } catch (error) {
        return { statusCode: 500, body: "Ошибка загрузки данных" };
    }
};
