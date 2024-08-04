const fetch = require("node-fetch");

/**
 * Sends an HTTP request using node-fetch.
 * @param {string} url - The URL to send the request to.
 * @param {string} method - The HTTP method (e.g., 'GET', 'POST', 'PUT', 'DELETE').
 * @param {object} [headers={}] - Optional request headers.
 * @param {object} [body=null] - Optional request body.
 * @returns {Promise<object>} - A promise that resolves with the response data.
 */

async function slackSendRequest(url, method = "POST", headers = {}, body = null) {
    try {
        const response = await fetch(url, {
            method,
            headers: {
                ...headers,
            },
            body:
                body && !headers["content-type"].includes("form-data")
                    ? JSON.stringify(body) : body,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        }


        const contentType = response.headers.get("content-type");
        let data;

        if (contentType && contentType.includes("application/json")) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        return data;
    } catch (error) {
        console.error("Request failed:", error);
        throw error;
    }
}

module.exports = { slackSendRequest };
