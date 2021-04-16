
import { User } from '../data/Models'

import axios from 'axios'
export class MatchComputations {
    
    static async generatePrefFreq(user: User) {
        const headers = { Authorization: user.a_token }
        const guilds = (await axios.get('https://discord.com/api/users/@me/guilds', { headers })).data
        for(const guild of guilds) {
            const guildId = guild.id
            //todo think of classification method
        }
        return []
    }
}