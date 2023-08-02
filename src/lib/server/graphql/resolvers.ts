const resolvers = {
    Query: {
        websites: () => {
            return [
                {
                    identifier: '1',
                    label: 'Google',
                    url: 'https://www.google.com',
                    regexp: '.*',
                    tags: ['search'],	
                    active: true
                },
                {
                    identifier: '2',
                    label: 'Yahoo',
                    url: 'https://www.yahoo.com',
                    regexp: '.*',
                    tags: ['search'],
                    active: true
                }
            ];
        },
        nodes: (_: undefined, args: { webPages: string[] }) => {
            return [
                {
                    title: args.webPages[1],
                    url: 'https://www.google.com',
                    crawlTime: '2021-01-01T00:00:00.00Z',
                    links: [],
                    owner: {
                        identifier: '1',
                        label: 'Google',
                        url: 'https://www.google.com',
                        regexp: '.*',
                        tags: ['search'],
                        active: true
                    }
                }
            ];
        }
    }
};

export default resolvers;
