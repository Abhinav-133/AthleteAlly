import React from "react";
import styles from "./SidebarNavigation.module.css";

function SidebarNavigation() {
  return (
    <div className={styles.sidebar}>
      <a href="#home">My Profile</a>
      <a href="#about">Tournaments</a>
      <a href="#services">Sports Gear</a>
      <a href="#contact">Job Portals</a>
      <a href="#contact">Latest News</a>
      <a href="#contact">Community Section</a>
    </div>
  );
}

export default SidebarNavigation;
