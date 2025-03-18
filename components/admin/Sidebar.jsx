"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const router = useRouter();
  const [activeRoute, setActiveRoute] = useState("");

  // Automatically set the active route based on the current pathname
  useEffect(() => {
    setActiveRoute(window.location.pathname); // Get the current route from the window object
  }, []);

  const handleNavigation = (path) => {
    setActiveRoute(path); // Update active route
    router.push(path); // Navigate to the selected path
  };

  return (
    <aside style={styles.sidebar}>
      <div style={styles.logoContainer}>
        {/* <img src="/logo.png" alt="Logo" style={styles.logo} /> */}
        <h2 style={styles.logoText}>Dashboard</h2>
      </div>
      <ul style={styles.list}>
        <li
          style={{
            ...styles.listItem,
            ...(activeRoute === "/admin/dashboard" ? styles.active : {}),
          }}
          onClick={() => handleNavigation("/admin/dashboard")}
        >
          Users
        </li>
        <li
          style={{
            ...styles.listItem,
            ...(activeRoute === "/admin/package" ? styles.active : {}),
          }}
          onClick={() => handleNavigation("/admin/package")}
        >
          Plans
        </li>
      </ul>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: "250px",
    height: "100vh",
    backgroundColor: "#1a1a1a",
    color: "#fff",
    padding: "20px",
    top: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxShadow: "0px 0px 15px 2px #7e22ce", // Add a glowing shadow
    borderRight: "4px solid #7e22ce", // Bold right-side border
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "30px",
  },
  logo: {
    height: "40px",
    marginRight: "10px",
  },
  logoText: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#fff",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    fontSize: "1rem",
    padding: "10px 15px",
    marginBottom: "10px",
    cursor: "pointer",
    color: "#CBD5E1",
    borderRadius: "5px",
    transition: "all 0.3s",
  },
  active: {
    backgroundColor: "#4C1D95",
    color: "#fff",
  },
};

