import { ApolloProvider } from "@apollo/client";
import Header from "./components/Header";
import Clients from "./components/Clients";
import AddClientModal from "./components/AddClientModal";
import { client } from "./clientConfig";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Header />
      <div className="container">
        <AddClientModal />
        <Clients />
      </div>
    </ApolloProvider>
  );
};

export default App;
