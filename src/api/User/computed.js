const _default = {
    User: {
        fullName: async (parent) => {
            return `${parent.firstName} ${parent.lastName}`;
        },
        isFollowing: async (parent, _, { prisma, me, isValid }) => {
            if(isValid !== true) throw Error("NotAuthenticated")

            //const { user } = request; // me
            const { id: parentId } = parent; // another user or me
            try {
                const exist = await prisma.user.findMany({
                    where: {
                        AND: [
                            {
                                id: parentId
                            },
                            {
                                followers: {
                                    some: {
                                        id: me.id
                                    }
                                    
                                }
                            }
                        ]
                    },
                    select: {
                        id: true
                    }
                });

                if(exist.length > 0) {
                    return true;
                } else {
                    return false
                }
            } catch(error) {
                console.log(error);
                return false;
            }
        },
        isSelf: (parent, _, { me, isValid }) => {
            if(isValid !== true) throw Error("NotAuthenticated")

            const { id: parentId } = parent;
            return me.id === parentId;
        },
        posts: async (parent, _, {prisma, isValid}) => {
            if(isValid !== true) throw Error("NotAuthenticated")
            try {
                return await prisma.post.findMany({
                    where: {
                        userId: parent.id
                    }
                });
            } catch (e) {
                console.log(e);
            }
        },
        postsCount: async (parent, _, {prisma, isValid}) => {
            if(isValid !== true) throw Error("NotAuthenticated")
            try {
                const posts = await prisma.post.findMany({
                    where: {
                        userId: parent.id
                    },
                    select: {
                        id: true
                    }
                });

                return posts.length;
            } catch (e) {
                console.log(e);
            }
        },
        likesCount: async (parent, _, {prisma, isValid}) => {
            if(isValid !== true) throw Error("NotAuthenticated")

            try {
                const likes = await prisma.like.findMany({
                    where: {
                        userId: parent.id
                    },
                    select: {
                        id: true
                    }
                })
    
                return likes.length;
            } catch (e) {
                console.log(e);
            }
        },
        commentsCount: async (parent, _, {prisma, isValid}) => {
            if(isValid !== true) throw Error("NotAuthenticated")

            try {
                const comments = await prisma.comment.findMany({
                    where: {
                        userId: parent.id
                    },
                    select: {
                        id: true
                    }
                })
    
                return comments.length;
            } catch (e) {
                console.log(e);
            }
        },
        followingCount: async (parent, _, {prisma, isValid}) => {
            if(isValid !== true) throw Error("NotAuthenticated")

            try {
                const users = await prisma.user.findMany({
                    where: {
                        followers: {
                            some: {
                                id: parent.id
                            }
                        }
                    },
                    select: {
                        id: true
                    }
                });

                return users.length;
            } catch (e) {
                console.log(e);
            }
        },
        followersCount: async (parent, _, {prisma, isValid}) => {
            if(isValid !== true) throw Error("NotAuthenticated")

            try {
                const users = await prisma.user.findMany({
                    where: {
                        following: {
                            some: {
                                id: parent.id
                            }
                        }
                    },
                    select: {
                        id: true
                    }
                });

                return users.length;
            } catch (e) {
                console.log(e);
            }
        },
    }
}

exports.default = _default;