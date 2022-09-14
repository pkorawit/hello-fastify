import { FilmService } from '../services/film.service.js'

export const FilmSchema = {
    type: 'object',
    properties: {
        film_id: {type : 'integer'},
        title: {type : 'string'},
        description: {type : 'string'},
        release_year: {type : 'integer'}
    }
}

export const getFilms = async (req, reply) => {
    const data = await FilmService.getAllFilm()
    reply.send(data)
}

export const getFilm = async (req, reply) => {
    const { id } = req.params
    const data = await FilmService.getFilmById(id)
    reply.send(data)
}