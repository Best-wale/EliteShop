
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import { useEffect, useState } from 'react';

 // Auth header helper
 export const getAuthHeaders = () => {
    const token = localStorage.getItem('access_token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  // Ensure session is created for guest users
  export const ensureSession = async () => {
    await fetch(`${apiUrl}/api/carts/`, {
      headers: getAuthHeaders(),
      credentials: 'include',
    });
  };

function useUserProfile() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
      const res = await fetch(`${apiUrl}/api/user-profile/`, {
        method: 'GET',
        headers: {
        Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUser(data);
      } catch (error) {
      console.log('Error fetching user profile');
      setUser(null);
      } finally {
      setLoading(false);
      }
    };

    fetchUser();

    
  }, []);
  // Return user data and loading state
  return { user, loading };
}

export default useUserProfile;