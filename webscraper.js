import axios from 'axios'
import cheerio from 'cheerio'

const asyncFetchPeeref = async (value) => {
    const url = `https://www.peeref.com/search?q=${value}`
    try {
        const response = await axios.get(url)
        const $ = cheerio.load(response.data)
        const rows = $('div[class="panel-body"] div[class="row"]')

        const results = rows.map((i, row) => {
            const keyCol = $(row).find('div[class="col-md-3 col-sm-4 col-xs-12"]')
            const valueCol = $(row).find('div[class="col-md-9 col-sm-8 col-xs-12"]')
            const key = $(keyCol).text().trim().trim().replace(/\s\s+/g, ' ').replace(/\n/g, ' ')
            const value = $(valueCol).text().trim().trim().replace(/\s\s+/g, ' ').replace(/\n/g, ' ')
            return { [key]: value }
        }).get()

        return results
    } catch (error) {
        console.error(error)
    }
}

export default asyncFetchPeeref