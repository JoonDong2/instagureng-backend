const _default = {
    Query: {
        existDuplicatedEmail: async(_, args, { prisma }) => {
            try {
                const {email} = args;
                const exist = await prisma.user.findOne({
                    where: {
                        email
                    }
                });
                console.log(exist);

                if(exist !== null) {
                    return true;
                }
                
                return false;
            } catch (e) {
                console.log(e);
                return true;
            }
        }
    }
}

exports.default = _default;