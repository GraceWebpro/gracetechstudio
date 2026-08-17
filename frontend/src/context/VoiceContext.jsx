import {
    createContext,
    useContext,
  } from "react";
  
  import useVoices from "../hooks/useVoices";
  
  
  const VoiceContext = createContext(null);
  
  
  export function VoiceProvider({ children }) {
  
    const voices = useVoices();
  
    return (
  
      <VoiceContext.Provider value={voices}>
  
        {children}
  
      </VoiceContext.Provider>
  
    );
  
  }
  
  
  export function useVoiceContext() {
  
    const context = useContext(VoiceContext);
  
    if (!context) {
  
      throw new Error(
        "useVoiceContext must be used inside VoiceProvider."
      );
  
    }
  
    return context;
  
  }
  
  
  export default VoiceContext;