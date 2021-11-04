import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./providers/AuthProvider";
import { AppRouter } from "./router/AppRouter";

function App() {
  return (
    <AuthProvider>
      <ChakraProvider>
        <AppRouter />
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
