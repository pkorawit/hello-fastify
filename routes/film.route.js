import { FilmSchema, getFilm, getFilms } from "../controller/film.controller.js"


export function filmRoutes(fastify, option, done) {

    const getAllFilmOpts = {
        schema : {
            response: {
                200:{
                    type: 'array',
                    items: FilmSchema
                }
            }
        },
        handler: getFilms
    }

    const getFilmOpts = {
        schema : {
            response: {
                200: FilmSchema
            }
        },
        handler: getFilm
    }

    fastify.get('/films', getAllFilmOpts)
    fastify.get('/films/:id', getFilmOpts)

    done()
}