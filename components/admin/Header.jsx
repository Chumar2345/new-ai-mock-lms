"use client"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
const alertify = typeof window !== 'undefined' ? require('alertifyjs') : null;

import 'alertifyjs/build/css/alertify.min.css';

export default function Header() {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [formData, setFormData] = useState({ currentPassword: '', newPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [email, setEmail] = useState(''); // State to store the email
  const [isMounted, setIsMounted] = useState(false); // Track if component has mounted

  // Ensure that useEffect only runs on the client
  useEffect(() => {
    setIsMounted(true); // Component has mounted
    const storedEmail = localStorage.getItem('email'); // Adjust this to your needs
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  if (!isMounted) return null; // Prevent rendering during SSR

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email"); // Remove email as well
    router.push("/admin/login");
  };

  const handleChangePassword = async () => {
    try {
      const email = "admin@gmail.com"; // Replace with dynamic email
      const response = await fetch('/api/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, ...formData }),
      });

      const data = await response.json();
      if (!response.ok) {
        if (alertify) alertify.error('Failed to update password');
      } else {
        if (alertify) alertify.success('Password updated successfully');
        setFormData({ currentPassword: '', newPassword: '' });
        setChangePasswordOpen(false);
      }
    } catch (err) {
      if (alertify) alertify.error('An error occurred');
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
      <div className="text-purple-500 text-xl md:text-2xl font-bold">
          <span className="text-white">V</span>Mock <span className="text-xs">Ai</span>
        </div>
      </div>

      <div style={styles.userMenu}>
        <div style={styles.userIcon} onClick={() => setDropdownOpen(!dropdownOpen)}>
          <img src="/user.svg" alt="User Avatar" style={styles.avatar} />
        </div>
        <div style={styles.emailText}>admin@gmail.com</div> {/* Display the email */}
        {dropdownOpen && (
          <div style={styles.dropdown}>
            <button
              style={styles.dropdownItem}
              onClick={() => {
                setDropdownOpen(false);
                setChangePasswordOpen(true);
              }}
            >
              Change Password
            </button>
            <button style={styles.dropdownItem} onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>

      {changePasswordOpen && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2>Change Password</h2>
            {error && <p style={styles.error}>{error}</p>}
            {success && <p style={styles.success}>{success}</p>}
            <input
              type="password"
              placeholder="Current Password"
              value={formData.currentPassword}
              onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
              style={styles.input}
            />
            <input
              type="password"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              style={styles.input}
            />
            <div style={styles.modalActions}>
              <button onClick={handleChangePassword} style={styles.button}>
                Update Password
              </button>
              <button onClick={() => setChangePasswordOpen(false)} style={styles.buttonCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: "#121827",
    color: "#fff",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #2D3748",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  userMenu: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  userIcon: {
    cursor: "pointer",
    marginRight: "10px",
  },
  avatar: {
    height: "35px",
    width: "35px",
    borderRadius: "50%",
    border: "2px solid #fff",
  },
  emailText: {
    color: "#fff",
    fontSize: "0.9rem",
    marginRight: "15px", // Add some spacing between the email and avatar
  },
  dropdown: {
    position: "absolute",
    top: "45px",
    right: 0,
    backgroundColor: "#1E293B",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
    zIndex: 1000,
  },
  dropdownItem: {
    padding: "10px 15px",
    color: "#fff",
    background: "none",
    border: "none",
    cursor: "pointer",
    width: "100%",
    textAlign: "left",
  },
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    textAlign: "center",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    color: "black",
  },
  modalActions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  button: {
    padding: "10px 20px",
    background: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  buttonCancel: {
    padding: "10px 20px",
    background: "#ccc",
    color: "#000",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "0.9rem",
  },
  success: {
    color: "green",
    fontSize: "0.9rem",
  },
};
