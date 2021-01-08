import { Adurc } from '../../interfaces/client';
import { AdurcMockModels } from './mock-models';

const adurcUntyped: Adurc = null;

adurcUntyped['user'].findMany({
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

adurcUntyped.client.user.findMany({
    orderBy: {
        email: 'asc',
    },
});

const adurc: Adurc<AdurcMockModels> = null;

adurc.client.post.findMany({
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

adurc.client.user.createMany({
    data: [{
        name: 'pep',
        posts: {
            connect: [{
                id: 1,
            }]
        }
    }],
});


adurc.client.post.createMany({
    data: [{
        title: 'demo',
        content: 'demo',
        published: false,
        author: { connect: { email: 'demo' } },
    }],
});

adurc.client.post.updateMany({
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

adurc.client.post.deleteMany({
    where: {
        id: 1,
    },
});

adurc.client.user.findMany({
    orderBy: {
        email: 'asc',
    },
});

adurc.client.user.findMany({
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

adurc.client.post.findMany({
    where: {
        author: { email: 'bob@adurc.io' },
        title: { startsWith: 'Hello' },
    },
});

adurc.client.user.createMany({
    data: [{
        email: 'alice@adurc.io',
        profile: {
            create: { bio: 'Hello World' },
        },
    }],
});

adurc.client.user.createMany({
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

adurc.client.user.aggregate({
    avg: {
        age: true,
    },
});

adurc.client.user.findMany({
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