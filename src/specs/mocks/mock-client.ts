import { AdurcModelUntyped } from '../../interfaces/client/model';
import { Adurc } from '../../interfaces/client';
import { AdurcMockModels } from './mock-models';

const unknownClient: Adurc<Record<string, AdurcModelUntyped>> = null;

unknownClient['user'].findMany({
    select: {
        published: true,
    },
    include: {
        author: {
            age: true,
        },
    },
    where: {
        authorId: {
            equals: 1
        },
    }
});

unknownClient.user.findMany({
    orderBy: {
        email: 'asc',
    },
});

const client: Adurc<AdurcMockModels> = null;

client.post.findMany({
    select: {
        published: true
    },
    where: {
        published: true,
        title: 'demo',
        authorId: {
            equals: 1
        },
    },
    include: {
        author: {
            age: true,
        },
    },
});

client.user.createMany({
    data: [{
        name: 'pep',
        posts: {
            connect: [{
                id: 1,
            }]
        }
    }],
});


client.post.createMany({
    data: [{
        title: 'demo',
        content: 'demo',
        published: false,
        author: { connect: { email: 'demo' } },
    }],
});

client.post.updateMany({
    where: { id: 1 },
    set: {
        published: true,
        author: {
            connect: {
                id: 1,
            }
        }
    },
});

client.post.deleteMany({
    where: {
        id: 1,
    },
});

client.user.findMany({
    orderBy: {
        email: 'asc',
    },
});

client.user.findMany({
    where: {
        email: {
            endsWith: 'adurc.io',
        },
        posts: {
            every: {
                published: true,
            },
        },
    },
});

client.post.findMany({
    where: {
        author: { email: 'bob@adurc.io' },
        title: { startsWith: 'Hello' },
    },
});

client.user.createMany({
    data: [{
        email: 'alice@adurc.io',
        profile: {
            create: { bio: 'Hello World' },
        },
    }],
});

client.user.createMany({
    data: [{
        email: 'alice@adurc.io',
        profile: {
            connectOrCreate: {
                where: {
                    id: 1
                },
                create: {
                    bio: 'bla'
                },
            }
        },
    }],
});

client.user.aggregate({
    avg: {
        age: true,
    },
});

client.user.findMany({
    where: { id: 1 },
    include: {
        posts: {
            select: {
                published: true,
                title: true,
            },
        },
    },
});