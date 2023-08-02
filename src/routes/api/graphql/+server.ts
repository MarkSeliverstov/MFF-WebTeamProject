import { createYoga, createSchema } from 'graphql-yoga';
import type { RequestEvent } from '@sveltejs/kit';
import typeDefs from '$lib/server/graphql/typedefs';
import resolvers from '$lib/server/graphql/resolvers';


const yogaApp = createYoga<RequestEvent>({
    schema: createSchema({
        typeDefs,
        resolvers
    }
    ),
    graphqlEndpoint: '/api/graphql',
    fetchAPI: globalThis
})

export { yogaApp as GET, yogaApp as POST, yogaApp as PUT, yogaApp as DELETE}
