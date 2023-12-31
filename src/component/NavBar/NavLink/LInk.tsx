"use client";

import { useState } from "react";
import styles from "./link.module.css";
import Image from "next/image";
import { handleLogout } from "@/backend/lib/action";
import NavLink from "../NavBarLink/Navbarlink";

const links = [
  {
    title: "Homepage",
    path: "/",
  },
  {
    title: "Admin",
    path: "/admin",
  },
  {
    title: "Author",
    path: "/author",
  },
  {
    title: "Contact",
    path: "/contact",
  },
];

const Links = ({session}:any) => {
  const [open, setOpen] = useState(false);

  // TEMPORARY
  // const session = true;
  // const isAdmin = true;

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}
        {session?.user ? (
          <>
            {session.user?.isAdmin && <NavLink item={{ title: "Admin", path: "/admin" }} />}
            <form action={handleLogout}>
              <button className={styles.logout}>Logout</button>
            </form>
          </>
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }} />
        )}
      </div>
      <Image
        className={styles.menuButton}
        src="/menu.png"
        alt="img"
        width={30}
        height={30}
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <NavLink item={link} key={link.title} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Links;