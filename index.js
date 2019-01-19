const Crawler = require("crawler")
const cron = require("node-cron")

const c = new Crawler({
    maxConnections: 10,
    callback: (err, res, done) => {
        if (err) {
            console.log(err)
        } else {
            let $ = res.$
           $(".post").each((i, el) => {
                
                const postIdStr = $(el).find(".post-like").attr("id")
                const postId = parseInt(postIdStr.split("-")[2])

                const postHead = $(el).find(".post-head")
                const headerText = $(postHead).find("h1").text()
                const postLink = $(postHead).find("h1 > a").attr("href")
                const postDate = $(postHead).find(".post-meta > div:first-of-type").text()

                 console.log(`${ headerText } - ${ postDate }`)

           })
        }
    }
})

const pageNumberStart = 1
const pageNumberCount = 1
const words = ["farma", "maqui"]
let pageList = []

for (let i = 0; i < words.length; i++)
    for (let j = pageNumberCount; j >= pageNumberStart; j--)
        pageList.push(`http://www.themosvagas.com.br/page/${ j }/?s=${ words[i] }`)

c.queue(pageList)
// running a task every 5 sec
// cron.schedule("*/5 * * * * *", () => { c.queue(pageList) })
