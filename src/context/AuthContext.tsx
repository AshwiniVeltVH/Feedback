import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  auth,
  provider,
  signInWithPopup,
  signOut,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
} from "../services/config";

const ROLES = {
  admin: ["manage:questions", "view:responses"],
  user: ["submit:feedback"],
} as const;

type Role = keyof typeof ROLES;
type Permission = (typeof ROLES)[Role][number];

export const hasPermission = (
  user: AuthUser | null,
  permission: Permission
): boolean => {
  return user
    ? user.roles.some((role) =>
        (ROLES[role] as readonly Permission[]).includes(permission)
      )
    : false;
};

interface AuthUser {
  uid: string;
  email: string;
  name?: string | null;
  photoURL?: string | null;
  roles: Role[];
}

interface AuthContextProps {
  user: AuthUser | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  hasPermission: (user: AuthUser | null, permission: Permission) => boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getUserRoles = (email: string): Role[] => {
    const roles: Role[] = ["user"]; // Default role

    // Admin check - add your admin email addresses here
    if (email === "ashwinivelt@karunya.edu.in") {
      roles.push("admin");
    }

    return roles;
  };

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (currentUser && currentUser.email) {
            const roles = getUserRoles(currentUser.email);
            setUser({
              uid: currentUser.uid,
              email: currentUser.email,
              name: currentUser.displayName,
              photoURL: currentUser.photoURL,
              roles,
            });
          } else {
            setUser(null);
          }
          setLoading(false);
        });
        return () => unsubscribe();
      })
      .catch((error: unknown) => {
        console.error("Error setting persistence:", (error as Error)?.message);
        setLoading(false);
      });
  }, []);

  const login = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;

      if (!email) {
        setErrorMessage("No email available for the user.");
        setLoading(false);
        return;
      }

      const roles = getUserRoles(email);
      setUser({
        uid: result.user.uid,
        email,
        name: result.user.displayName,
        photoURL: result.user.photoURL,
        roles,
      });

      // Store user details in localStorage
      localStorage.setItem("email", email);
      if (result.user.displayName) {
        localStorage.setItem("fullName", result.user.displayName);
      }

      setErrorMessage(null);
      setLoading(false);
    } catch (error: unknown) {
      console.error("Login failed:", (error as Error)?.message);
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem("email");
      localStorage.removeItem("fullName");
    } catch (error: unknown) {
      console.error("Logout failed:", (error as Error)?.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, hasPermission, loading }}
    >
      {children}
      {errorMessage && (
        <div className="error-modal">
          <div className="error-content">
            <p>{errorMessage}</p>
            <button onClick={() => setErrorMessage(null)}>Close</button>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};
