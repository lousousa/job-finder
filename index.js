const Crawler = require("crawler")
const cron = require("node-cron")

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

const pageNumberStart = 1
const pageNumberCount = 3
let pageList = []

for (let i = pageNumberCount; i >= pageNumberStart; i--)
    pageList.push(`http://www.themosvagas.com.br/page/${i}/`)

// running a task every 5 sec
cron.schedule("*/5 * * * * *", () => {
    c.queue(pageList)
})