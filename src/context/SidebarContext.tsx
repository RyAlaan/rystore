import { createContext, useContext, useState } from "react";

interface sidebarContextType {
  showSidebar: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<sidebarContextType | undefined>(undefined);

interface sidebarProfiderProps {
  children: React.ReactNode;
}

export const SidebarProfider: React.FC<sidebarProfiderProps> = ({
  children,
}) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <SidebarContext.Provider value={{ showSidebar, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = (): sidebarContextType => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};