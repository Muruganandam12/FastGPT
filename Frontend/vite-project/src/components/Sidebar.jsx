import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import logo from '../images/favicon.png'
import galleryIcon from '../images/gallery icon.png'
import messageIcon from '../images/message icon.png'
import themeIcon from '../images/theme icon.png'
import diamond from '../images/diamond.png'
import profile from '../images/profile-picture.png'
import logout from '../images/logout.png'
import menu from '../images/menu.png'
import cancel from '../images/cancel.png'

const Sidebar = () => {
  const { chats, setSelectedChat, theme, setTheme, user } = useAppContext()
  const [search, setSearch] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden p-2">
        <img
          src={menu}
          alt="Menu"
          className="w-6 h-6 cursor-pointer"
          onClick={() => setIsMenuOpen(true)}
        />
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen w-64 pt-2 px-4 pb-4 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700
          flex flex-col transition-transform duration-300 z-50 pointer-events-auto
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        `}
      >
        {/* Mobile close button */}
        <div className="flex justify-end mb-2 md:hidden">
          <img
            src={cancel}
            alt="Close"
            className="w-5 h-5 cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
          />
        </div>

        {/* Logo pinned top-left
        <div className="flex items-center mb-4">
          <img src={logo} alt="Logo" className="w-8 h-8" />
          <span className="ml-2 font-bold text-gray-900 dark:text-gray-100 text-lg">FastGPT</span>
        </div> */}

        {/* New Chat Button */}
        <button
          onClick={() => setSelectedChat(null)}
          className="flex items-center justify-center w-full py-2 mb-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors text-sm"
        >
          <span className="mr-2 text-lg font-bold">+</span> New Chat
        </button>

        {/* Search */}
        <div className="flex items-center gap-2 p-2 mb-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800">
          <img src={messageIcon} alt="Search" className="w-4" />
          <input
            type="text"
            placeholder="Search chats..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none bg-transparent text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400"
          />
        </div>

        {/* Chats List */}
        <div className="flex-1 overflow-y-auto">
          {chats.length > 0 ? (
            chats
              .filter((chat) =>
                chat.name?.toLowerCase().includes(search.toLowerCase())
              )
              .map((chat) => (
                <div
                  key={chat._id}
                  onClick={() => setSelectedChat(chat)}
                  className="p-2 mb-2 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                >
                  {chat.name || 'New Chat'}
                </div>
              ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
              No chats yet
            </p>
          )}
        </div>

        {/* Bottom Buttons */}
        <div className="mt-3 flex flex-col gap-2 text-sm">
          {/* Community */}
          <button className="flex items-center gap-2 w-full p-2 border rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
            <img src={galleryIcon} alt="Gallery" className="w-5" />
            Community
          </button>

          {/* Credits */}
          <button className="flex items-center gap-2 w-full p-2 border rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
            <img src={diamond} alt="Credits" className="w-5 h-5" />
            Credits: {user?.credits || 0}
          </button>

          {/* Theme Toggle */}
          <div className="flex items-center justify-between p-2 border rounded-md">
            <div className="flex items-center gap-2">
              <img src={themeIcon} alt="Theme" className="w-4" />
              Dark Mode
            </div>
            <input
              type="checkbox"
              checked={theme === 'dark'}
              onChange={() =>
                setTheme(theme === 'dark' ? 'light' : 'dark')
              }
              className="cursor-pointer"
            />
          </div>

          {/* User Info */}
          <div className="flex items-center gap-2 p-2 border rounded-md">
            <img src={profile} alt="User" className="w-6 h-6 rounded-full" />
            {user?.name || 'Login'}
            {user && (
              <img
                src={logout}
                alt="Logout"
                className="w-4 h-4 ml-auto cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
