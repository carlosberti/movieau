import { getMovieDetails } from 'client'
import { GetStaticProps } from 'next'
import Movie, { MovieTemplateProps } from 'templates/Movie'
import { movieDetailsMapper } from 'utils/mappers'
import { ParsedUrlQuery } from 'querystring'

export default function MoviePage(props: MovieTemplateProps) {
  return <Movie {...props} />
}

export async function getStaticPaths() {
  return { paths: [], fallback: true }
}

interface Params extends ParsedUrlQuery {
  id: string
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as Params

  const numberId = +id

  const response = await getMovieDetails({ id: numberId })

  if (!response) {
    return { notFound: true }
  }

  return {
    props: movieDetailsMapper({ id: numberId, movie: response })
  }
}
