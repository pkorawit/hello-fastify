import PG from 'pg';
const Pool = PG.Pool
import { config } from '../config.js'

const pool = new Pool({
    user: config.database.user,
    host: config.database.host,
    database: config.database.database,
    password: config.database.password,
    port: 5432,
})

export const FilmService = {

    getAllFilm: async () => {
        try {
            const text = 'SELECT * FROM film'
            const result = await pool.query(text)
            return result.rows
        }
        catch (err) {
            console.log("🚀 ~ getAllFilm ~ err", err)
        }
    },

    getFilmById: async (id) => {
        try {
            const text = 'SELECT * FROM film WHERE film_id = $1'
            const values = [id]
            const result = await pool.query(text, values)
            return result.rows[0]
        }
        catch (err) {
            console.log("🚀 ~ getFilmById ~ err", err)
        }
    }

}



