module.exports = `
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

    type Comentario {
        id: ID!
        nombre: String!
        cuerpo: String!
    }

    input NuevoCurso {
        titulo: String!,
        descripcion: String!
    }

    input CursoEditable {
        titulo: String,
        descripcion: String
    }
`