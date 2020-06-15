const _default = {
    Mutation: {
        toggleLike: async (_, args, { prisma, me, isValid }) => {
            if(isValid !== true) throw Error("NotAuthenticated");

            const  { postId } = args;

            const filterOptions = {
                where: {
                    AND:[
                        {
                            userId: me.id
                        },
                        {
                            postId
                        }
                    ]
                }
            };

            try {
                const existingLike = await prisma.like.findMany(filterOptions);
                if(existingLike.length > 0) {
                    const like = await prisma.like.deleteMany(filterOptions);
                } else {
                    const like = await prisma.like.create({
                        data: {
                            user: {
                                connect: {
                                    id: me.id
                                }
                            },
                            post: {
                                connect: {
                                    id: postId
                                }
                            }
                        }
                    });
                }
            } catch(error) {
                console.log(error);
            } finally {
                return prisma.post.findOne({
                    where: {
                        id: postId
                    }
                })
            }
        }
    }
}

exports.default = _default;