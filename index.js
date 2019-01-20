const Crawler = require("crawler")
const cron = require("node-cron")
const mysql = require("mysql")
const url = require("url")
const querystring = require("querystring")

let posts = []

const c = new Crawler({
    maxConnections: 10,
    callback: (err, res, done) => {
        if (err) {
            console.log(err)
        } else {
            let $ = res.$
            const uri = url.parse(res.options.uri)
            const uriQuery = querystring.parse(uri.query)
            $(".post").each((i, el) => {
                
                let postIdStr = $(el).find(".post-like").attr("id")
                let postId = parseInt(postIdStr.split("-")[2])

                let postHead = $(el).find(".post-head")
                let headerText = $(postHead).find("h1").text()
                let postUrl = $(postHead).find("h1 > a").attr("href")

                let postDateText = $(postHead).find(".post-meta > div:first-of-type").text()
                let postDate = postDateTextToYYYYMMDD(postDateText)                

                posts.push({
                    post_id: postId,
                    post_url: postUrl,
                    post_date: postDate,
                    search: uriQuery.s,
                    header_text: headerText
                })                    
            })
        }
        done()
    }
})

const postDateTextToYYYYMMDD = (dateText) => {

    let dateTable = {
        "janeiro": "01",
        "fevereiro": "02",
        "março": "03",
        "abril": "04",
        "maio": "05",
        "junho": "06",
        "julho": "07",
        "agosto": "08",
        "setembro": "09",
        "outubro": "10",
        "novembro": "11",
        "dezembro": "12"
    }

    let a = dateText.split(" ")
    let dd = parseInt(a[1])
    dd = ( (dd < 10) ? "0" : "") + dd
    let mm = dateTable[a[0]]
    let yyyy = a[2]

    return `${ yyyy }-${ mm }-${ dd }`

}

const pageNumberStart = 1
const pageNumberCount = 1
const words = ["farma", "maqui"]
let pageList = []

for (let i = 0; i < words.length; i++)
    for (let j = pageNumberCount; j >= pageNumberStart; j--)
        pageList.push(`http://www.themosvagas.com.br/page/${ j }/?s=${ words[i] }&a=1`)

c.queue(pageList)
c.on("drain", () => {

    console.log("Creating connection... ")

    const conn = mysql.createConnection(require("./database.json"))
    conn.connect()

    for (let i = 0; i < posts.length; i++) {
        let post = { post_id: posts[i].post_id, post_url: posts[i].post_url, post_date: posts[i].post_date }
        conn.query(`SELECT * FROM themosvagas WHERE post_id = ${ post.post_id }`, (err, results, fields) => {
            if (err) throw err
            if (!results.length) {
                conn.query("INSERT INTO themosvagas SET ?", post, (err, results, fields) => {
                    if (err) throw err
                    if(i == posts.length - 1) conn.destroy()
                })

                // Send SMS
            } else if(i == posts.length - 1) conn.destroy()
        })
    }

 })

// running a task every 5 sec
cron.schedule("*/5 * * * * *", () => { c.queue(pageList) })
