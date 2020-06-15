const _default = {
    Query: {
        me: async (_, __, { me, isValid }) => {
            if(isValid !== true) throw Error("NotAuthenticated")

            return me;
        }
    }
}

exports.default = _default;