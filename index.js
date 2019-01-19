const Crawler = require("crawler")
const cron = require("node-cron")

const c = new Crawler({
    maxConnections: 10,
    callback: (err, res, done) => {
        if (err) {
            console.log(err)
        } else {
            let $ = res.$
           $(".post-head h1").each((i, el) => {
                const content = $(el).text()
                if (content.match(/auxiliar/i))
                    console.log(content)
           })
        }
    }
})

const pageNumberStart = 1
const pageNumberCount = 10
let pageList = []

for (let i = pageNumberCount; i >= pageNumberStart; i--)
    pageList.push(`http://www.themosvagas.com.br/page/${i}/`)


c.queue(pageList)
// running a task every 5 sec
// cron.schedule("*/5 * * * * *", () => { c.queue(pageList) })
