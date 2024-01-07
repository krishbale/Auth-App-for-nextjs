import Link from "next/link"
import styles from "./navbar.module.css"
import { auth } from "@/backend/lib/auth"
import Links from "./NavLink/LInk"

const Navbar = async () => {

  const session = await auth();

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>Travel Log Application</Link>
      <div>
        <Links session={session}/>
      </div>
    </div>
  )
}

export default Navbar