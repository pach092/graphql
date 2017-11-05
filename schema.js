const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools')
const casual = require('casual')

const typeDefs = `
    # Esto es un curso en el sistema
    type Curso {
        id: ID!
        titulo: String!
        descripcion: String!
        #Esta es la descripcion del curso
        profesor: Profesor
        rating: Float @deprecated(reason: "No creemos mas en los puntajes")
        comentarios: [Comentario]
    }

    type Profesor {
        id: ID!
        nombre: String!
        nacionalidad: String!
        genero: Genero
        cursos: [Curso]
    }

    enum Genero {
        MASCULINO
        FEMENINO
    }

    type Comentario {
        id: ID!
        nombre: String!
        cuerpo: String!
    }

    type Query{
        cursos: [Curso]
        profesores: [Profesor]
        curso(id: Int): Curso
        profesor(id: Int): Profesor
    }
`
const resolvers = {
    Query: {
        cursos: () => {
            return [{
                id: 1,
                titulo: 'Curso de GraphQL',
                descripcion: 'Aprendiendo GraphQL'
            }, {
                id: 2,
                titulo: 'Curso de PHP',
                descripcion: 'Aprendiendo PHP'
            }]
        }
    },
    Curso: {
        profesor: () => {
            return{
                nombre: "Pablo",
                nacionalidad: "Colombiano"
            }
        },
        comentarios: () => {
            return[{
                id: 1,
                nombre: "Francisco",
                cuerpo: "Probando los cursos de Platzi"
            },
            {
                id: 2,
                nombre: "Francisco",
                cuerpo: "Probando los temas de GraphQL"
            }]
        }
    }
}

const schema = makeExecutableSchema({ 
    typeDefs,
    resolvers
})

addMockFunctionsToSchema({ 
    schema,
    mocks:{
        Curso: () => {
            return {
                id: casual.uuid,
                titulo: casual.sentence,
                descripcion: casual.sentences(2)
            }
        },
        Profesor: () => {
            return {
                nombre: casual.name,
                nacionalidad: casual.country
            }
        }
    },
    preserveResolvers: true
})

module.exports = schema