const Crawler = require("crawler");

const c = new Crawler({
    maxConnections: 10,
    callback: (err, res, done) => {
        if (err) {
            console.log(err)
        } else {
            let $ = res.$
            let heads = $(".post-head h1")
            for (let i = 0; i < heads.length; i++) {
                console.log($(heads[i]).text())
            }
        }
    }
})

c.queue("http://www.themosvagas.com.br")