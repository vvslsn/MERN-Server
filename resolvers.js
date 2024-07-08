const User = require('./model/userSchema');

const resolvers = {
  Query: {
    getUsers: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        if (!user) {
          throw new Error('User not found');
        }
        return user;
      } catch (err) {
        throw new Error(err.message);const User = require('./model/userSchema');

        const resolvers = {
          Query: {
            getUsers: async (_, { id }) => {
              try {
                const user = await User.findById(id);
                if (!user) {
                  throw new Error('User not found');
                }
                return user;
              } catch (err) {
                throw new Error('Error retrieving user');
              }
            },
          },
          Mutation: {
            createUser: async (_, { input }) => {
              const { name, email, password } = input;
              if (!name || !email || !password) {
                throw new Error('Please enter all the fields');
              }
              const newUser = new User({ name, email, password });
              try {
                return await newUser.save();
              } catch (err) {
                throw new Error('Error creating user');
              }
            },
            changePass: async (_, { id, password }) => {
              try {
                const updatedUser = await User.findByIdAndUpdate(
                  id,
                  { password: password },
                  { new: true }
                );
                if (!updatedUser) {
                  throw new Error('User not found');
                }
                return updatedUser;
              } catch (err) {
                throw new Error('Error updating password');
              }
            },
          },
        };
        
        module.exports = resolvers;
        
      }
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      const { name, email, password } = input;
      if (!name || !email || !password) {
        throw new Error('Please enter all the fields');
      }
      const newUser = new User({ name, email, password });
      try {
        return await newUser.save();
      } catch (err) {
        throw new Error(err.message);
      }
    },
    changePass: async (_, { id, password }) => {
      try {
        const userNew = await User.findByIdAndUpdate(id, { password: password }, { new: true });
        if (!userNew) {
          throw new Error('User not found');
        }
        return userNew;
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
  User: {
    email: (parent) => parent.email || '',
    name: (parent) => parent.name || '',
    password: (parent) => parent.password || '',
  },
};

module.exports = resolvers;