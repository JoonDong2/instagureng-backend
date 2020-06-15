const _default = {
    Post: {
        isLiked: async (parent, _, { prisma, me, isValid }) => {
            if(isValid !== true) throw Error("NotAuthenticated")
            
            try {
                const { id } = parent; // a post
                const likes = await prisma.like.findMany({
                    where: {
                        AND: [
                            {
                                userId: me.id
                            },
                            {
                                postId: id
                            }
                        ]
                    },
                    select: {
                        id: true
                    }
                });

                if(likes.length > 0) {
                    return true;
                } else {
                    return false;
                }
            } catch(e) {
                console.log(e);
            }
        },
        likesCount: async (parent, _, { prisma, isValid }) => {
            if(isValid !== true) throw Error("NotAuthenticated")

            try {
                const { id } = parent; // a post
                const likes = await prisma.like.findMany({
                    where: {
                        postId: id
                    },
                    select: {
                        id: true
                    }
                });

                return likes.length;
            } catch(e) {
                console.log(e);
            }
        },
        commentsCount: async (parent, _, { prisma, isValid }) => {
            if(isValid !== true) throw Error("NotAuthenticated")

            try {
                const { id } = parent; // a post
                const comments = await prisma.comment.findMany({
                    where: {
                        postId: id
                    },
                    select: {
                        id: true
                    }
                });

                return comments.length;
            } catch(e) {
                console.log(e);
            }
        },
        user: async (parent, _, { prisma, isValid }) => {
            if(isValid !== true) throw Error("NotAuthenticated")

            try {
                const { userId } = parent; // a post

                return await prisma.user.findOne({
                    where: {
                        id: userId
                    }
                });
            } catch(e) {
                console.log(e);
            }
        },
        comments: async (parent, _, { prisma, isValid }) => {
            if(isValid !== true) throw Error("NotAuthenticated")

            try {
                const { id } = parent; // a post

                return await prisma.comment.findMany({
                    where: {
                        postId: id
                    }
                });
            } catch(e) {
                console.log(e);
            }
        },
        files: async (parent, _, { prisma, isValid }) => {
            if(isValid !== true) throw Error("NotAuthenticated")

            try {
                const { id } = parent; // a post

                return await prisma.file.findMany({
                    where: {
                        postId: id
                    }
                });
            } catch(e) {
                console.log(e);
            }
        },
    }
}

exports.default = _default