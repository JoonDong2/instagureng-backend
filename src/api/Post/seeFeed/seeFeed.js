const _default = {
    Query: {
        seeFeed: async (_, __, { prisma, me, isValid }) => {
            if(isValid !== true) throw Error("NotAuthenticated");
            
            const { following } = await prisma.user.findOne({
                where: {
                    id: me.id
                },
                select: {
                    following: true
                }
            });

            const followingIds = following.map(user => user.id);

            return prisma.post.findMany({
                where: {
                    user: {
                        id: {
                            in: [...followingIds, me.id]
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
        }
    }
}

exports.default = _default;