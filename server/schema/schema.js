const { clients, projects } = require("../sampleData.js");

//Array destructure
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");

//Type definition for Client
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    clientId: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve: (parent, args) => {
        return clients.find((client) => client.id === parent.clientId);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType", // root name
  fields: {
    //is the wrapper for every queries.
    //Fetch every clients
    clients: {
      type: new GraphQLList(ClientType), //Type definition of what query will be
      resolve: (parent, args) => {
        //Is the response after the query has done
        return clients;
      },
    },
    //Fetch specific client prior to id
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } }, // Args is for handling the arguement into query client(id:"1"){}
      resolve(parent, args) {
        // resolver is the response callback after query has been made.
        return clients.find((client) => client.id === args.id); //Clients is the object data we are searching through
      },
    },
    //Fetch every Projects.
    projects: {
      type: new GraphQLList(ProjectType),
      resolve: (parent, args) => {
        return projects;
      },
    },
    //Fetch single project prior to ID
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return projects.find((project) => project.id === args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
