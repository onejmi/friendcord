
import { User } from '../data/Models'

import axios from 'axios'
import cheerio from 'cheerio'
import { ApiServer } from '../server'
export class MatchComputations {
    
    //todo cache top.gg tags per id
    static async generatePrefFreq(user: User) {
        const headers = { Authorization: user.a_token }
        const guilds = (await axios.get('https://discord.com/api/users/@me/guilds', { headers })).data
        const guildIds = []
        let prefMap : Map<string, number> = new Map()
        for(const guild of guilds) {
            const guildId = guild.id
            guildIds.push(guild.id)
            const tags = await MatchComputations.getTags(guildId)
            if(tags.length > 0) {
                for(const tag of tags) {
                    const count = prefMap.get(tag)
                    if(count != undefined) {
                        prefMap.set(tag, count + 1)
                    } else prefMap.set(tag, 1)
                }
            }
        }
        return { prefMap, guildIds }
    }

    private static async getTags(guildId: string) {
        const db = ApiServer.db
        const cachedTagsObj = await db.collection('tags').findOne({ guildId: guildId })
        if(cachedTagsObj != undefined) {
            return cachedTagsObj.tags
        }
        try {
            const res = await axios.get('https://top.gg/servers/' + guildId)
            const $ = cheerio.load(res.data)
            const parsedTags = []
            for(const tag of $('#entity-tags').find('.no-link').toArray()) {
                parsedTags.push($(tag).text().trim())
            }
            await db.collection('tags')
                .updateOne({ guildId: guildId }, { $set: { tags: parsedTags } }, { upsert: true })
            return parsedTags
        } catch(e) {
            return []
        }
    }


    
}