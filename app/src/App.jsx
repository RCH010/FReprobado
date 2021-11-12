import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./providers/AuthProvider";
import { AppRouter } from "./router/AppRouter";
import { ForceColorMode } from "./theme/ForceColorMode";

function App() {
  return (
    <AuthProvider>
      <ChakraProvider>
        <ForceColorMode mode='dark'>
          <AppRouter />
        </ForceColorMode>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
