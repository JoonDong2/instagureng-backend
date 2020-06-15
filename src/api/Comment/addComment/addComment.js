const _default = {
    Mutation: {
        addComment: async (_, args, { prisma, me, isValid }) => {
            if(isValid !== true) throw Error("NotAuthenticated");

            const { text, postId} = args;

            const comment = await prisma.comment.create({
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
                    },
                    text: text
                }
            });

            return comment;
        }
    }
}

exports.default = _default;