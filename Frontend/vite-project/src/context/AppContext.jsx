import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const navigate = useNavigate();

    // States
    const [user, setUser] = useState(null);
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    // Fetch user data (replace with real API call)
    const fetchUser = async () => {
        try {
            // Example: fetch from backend
            // const response = await fetch("/api/user");
            // const data = await response.json();
            // setUser(data);

            // For now, user stays null until real fetch
            setUser(null);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    // Fetch user chats (replace with real API call)
    const fetchUserChats = async () => {
        try {
            // Example: fetch from backend
            // const response = await fetch(`/api/chats?userId=${user.id}`);
            // const data = await response.json();
            // setChats(data);

            setChats([]);
            setSelectedChat(null);
        } catch (error) {
            console.error("Error fetching chats:", error);
        }
    };

    // Theme effect
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Fetch chats when user changes
    useEffect(() => {
        if (user) {
            fetchUserChats();
        } else {
            setChats([]);
            setSelectedChat(null);
        }
    }, [user]);

    // Fetch user on mount
    useEffect(() => {
        fetchUser();
    }, []);

    const value = {
        navigate,
        user,
        setUser,
        fetchUser,
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
        theme,
        setTheme
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
