import { AdurcClient } from '../../src/interfaces/client/client';
import { PostModel } from './mock-post-model';
import { UserModel } from './mock-user-model';

interface MyModels {
    user: UserModel;
    post: PostModel;
}

const client: AdurcClient<MyModels> = null;

client.post.read({
    select: {
        published: true
    },
    where: {
        published: true,
        title: 'demo',
        authorId: {
            equals: 1
        },
        author: {

        },
    },
    include: {
        author: true,
    },
});

client.post.create({
    data: {
        title: 'demo',
        content: 'demo',
        published: false,
        author: { connect: { email: 'demo' } },
    },
});

client.post.update({
    where: { id: 1 },
    data: { published: true },
});

client.post.delete({
    where: {
        id: 1,
    },
});

client.user.read({
    orderBy: {
        email: 'asc',
    },
});

client.user.read({
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

client.post.read({
    where: {
        author: { email: 'bob@adurc.io' },
        title: { startsWith: 'Hello' },
    },
});

client.user.create({
    data: {
        email: 'alice@adurc.io',
        profile: {
            create: { bio: 'Hello World' },
        },
    },
});

client.user.create({
    data: {
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
    },
});

client.user.aggregate({
    avg: {
        age: true,
    },
});

client.user.read({
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