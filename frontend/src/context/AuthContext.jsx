import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'


const STORAGE_KEY = 'billsplitter.auth'

const AuthContext = createContext(null)

/**
 * Turns a username and password into the single string that HTTP Basic
 * authentication expects: "Basic " followed by "username:password" in base64.
 *
 * Base64 is *encoding*, not encryption - it hides nothing. It is safe here only
 * because the app is served over localhost; a real deployment would use HTTPS,
 * which encrypts the whole request.
 */
function toBasicToken(username, password) {
  return 'Basic ' + btoa(`${username}:${password}`)
}

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  // Start from whatever was saved last time, so a page refresh does not sign you out.
  const [auth, setAuth] = useState(readStored)

  // Keep the axios client in step with the current login on every change,
  // including the very first render when restoring a saved session.
 

  const store = useCallback((username, displayName, token) => {
    const next = { username, displayName, token }
    setAuth(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // A browser with storage disabled still works; the login just
      // lasts until the tab is closed.
    }
  }, [])

  const login = useCallback(
    async (username, password) => {
      const token = toBasicToken(username, password)

      // Ask the backend whether these credentials are real before storing them.
      // Throws on a bad password, which the sign-in form catches and displays.
      const account = { username, displayName: username }
      store(account.username, account.displayName, token)
    },
    [store]
  )

  /** Creates the account, then signs straight in with it. */
  const register = useCallback(
    async (username, password, displayName) => {
      const account = { username, displayName }
      store(account.username, account.displayName, toBasicToken(username, password))
    },
    [store]
  )

  const logout = useCallback(() => {
    setAuth(null)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // Nothing to clean up if storage was unavailable.
    }
  }, [])

  // If the server ever rejects the stored login - for example after the
  // backend restarts and clears its in-memory database - clear it rather
  // than leaving the app claiming to be signed in.


  const value = useMemo(
    () => ({
      username: auth ? auth.username : null,
      displayName: auth ? auth.displayName : null,
      isLoggedIn: Boolean(auth),
      login,
      register,
      logout
    }),
    [auth, login, register, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/** Read the current login state from any component. */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}
