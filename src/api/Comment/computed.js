const _default = {
    Comment: {
        user: async (parent, _, { prisma, isValid }) => {
            if(isValid !== true) throw Error("NotAuthenticated")
            
            return await prisma.user.findOne({
                where: {
                    id: parent.userId
                }
            });
        }
    }
}

exports.default = _default;