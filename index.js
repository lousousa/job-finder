const Crawler = require("crawler");

const c = new Crawler({
    maxConnections: 10,
    callback: (err, res, done) => {
        if (err) {
            console.log(err)
        } else {
            var $ = res.$
            console.log($("title").text())
        }
    }
})

c.queue("http://www.amazon.com")