var data = '^*^JSON{"ID":"01","did":"01","subname":"b","head":"object 01","name":"ТЯК Москва","microphone":true,"body":{"message":""}}^*^TOKENeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MjI2MzIyNDIsImV4cCI6MTY1NDE2ODI0MiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0._kXWtMl66xZWH2l4UzuZ-DJxaj4tAVf8jFLTLXrRQvI'


const dataParser = data => data.split('^*^').filter(elem => elem != '')


const getToken = (dataArr) => {
    for (value of dataArr) {
        if (/^TOKEN/.test(value)) {
            return value.substr(5)
        }
    }
}

const getJson = (dataArr) => {
    for (value of dataArr) {
        if (/^JSON/.test(value)) {
            return JSON.parse(value.substr(4))
        }
    }
}

console.log(getJson(dataParser(data)))