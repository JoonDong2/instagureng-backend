const _default = {
    Mutation: {
        createAccount: async(_, args, { prisma }) => {
            try {
                
                const {userName, email, firstName = "", lastName = "", name="", bio="", picture="" } = args;
                const existEmail = await prisma.user.findOne({
                    where: {
                        email
                    }
                });

                if(existEmail !== null) {
                    return "ExistEmailError"
                }

                const existUserName = await prisma.user.findOne({
                    where: {
                        userName
                    }
                });

                if(existUserName !== null) {
                    return "ExistUserNameError"
                }

                await prisma.user.create({ 
                    data: {
                        userName, 
                        email, 
                        firstName, 
                        lastName, 
                        name,
                        bio,
                        avatar: picture
                    }
                });
                return "SignUpComplete";
            } catch (e) {
                console.log(e);
                return e;
            }
        }
    }
}

exports.default = _default;