const Crawler = require("crawler")
const cron = require("node-cron")
const mysql = require("mysql")

const conn = mysql.createConnection(require("./database.json"))

conn.connect()

/*
let post = { post_id: 999, post_url: "https://example.com", post_date: "1991-05-10" }
conn.query("INSERT INTO themosvagas SET ?", post, (err, results, fields) => {
    if (err) throw err;
})
*/

conn.query("SELECT * FROM themosvagas", (err, results, fields) => {
    if (err) throw err;
    console.log(results)
})

conn.end()

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

// c.queue(pageList)

// running a task every 5 sec
// cron.schedule("*/5 * * * * *", () => { c.queue(pageList) })
