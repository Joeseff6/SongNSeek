// https://api.audiomack.com/v1
const crypto = require('crypto')
const OAuth = require('oauth-1.0a')

const oauth = OAuth({
    consumer: { key: '<your consumer key>', secret: '<your consumer secret>' },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
        return crypto
            .createHmac('sha1', key)
            .update(base_string)
            .digest('base64')
    },
})


const apiBtn = $(`#apiBtn`);

apiBtn.click(() => {
    oauth.authorize(request, token)

    $.ajax({
        url: `https://api.audiomack.com/v1/request_token`,
        method: `POST`
    })
        .then(function(response) {
            console.log(response);
        })
}) 


const getTrack = () => {

}
