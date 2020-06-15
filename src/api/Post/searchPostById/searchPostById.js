const _default = {
    Query: {
        searchPostById: async(_, { postId }, { prisma, isValid }) => {
            if(isValid !== true) throw Error("NotAuthenticated")

            try {
                return await prisma.post.findOne({
                    where: {
                        id: postId
                    }
                })
            } catch (e) {
                console.log(e);
            }
        }
    }
}

exports.default = _default