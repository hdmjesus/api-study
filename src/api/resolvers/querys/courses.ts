interface Curso {
  title: string
  tecnologia: string
  // Otros campos del curso
}

const cursos: Curso[] = [
  {
    title: 'JavaScript Moderno Guía Definitiva Construye +10 Proyectos',
    tecnologia: 'JavaScript ES6'
  },
  {
    title: 'React – La Guía Completa: Hooks Context Redux MERN +15 Apps',
    tecnologia: 'React'
  },
  {
    title: 'Node.js – Bootcamp Desarrollo Web inc. MVC y REST API’s',
    tecnologia: 'Node.js'
  },
  {
    title: 'ReactJS Avanzado – FullStack React GraphQL y Apollo',
    tecnologia: 'React'
  }
]

const coursesQuery = {
  obtenerCursos: (_: any, args: any) => {
    const results = cursos.filter(
      curso => curso.tecnologia === args.input.tecnologia
    )

    return results
  }
}

// const resolvers = [userResolvers, userPostsResolver, postResolvers];

export default coursesQuery
