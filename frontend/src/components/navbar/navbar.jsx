import styles from './navbar.module.css'
import { LuShoppingCart, LuMenu } from "react-icons/lu"
import { Drawer } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false)
  const [showLoginDropdown, setShowLoginDropdown] = useState(false)

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu)
  }

  const toggleLoginDropdown = () => {
    setShowLoginDropdown(!showLoginDropdown)
  }

  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.navbarItems}>
        <Link to={'/'}>
          <img className={styles.logo} src="/imgs/logo.png" alt="Logo" />
        </Link>
        <div className={styles.navbarLinksContainer}>
          <Link to={'/'} className={styles.navbarLink}>Home</Link>
          <Link to={'/plates'} className={styles.navbarLink}>Pratos</Link>
          <Link to={'/cart'} className={styles.navbarLink}>
            <LuShoppingCart />
          </Link>
          
          {/* Dropdown de Login */}
          <div className={styles.loginDropdown}>
            <span className={styles.navbarLink} onClick={toggleLoginDropdown}>
              Login
            </span>
            {showLoginDropdown && (
              <div className={styles.dropdownContent}>
                <Link to="/auth" onClick={() => setShowLoginDropdown(false)}>
                  Usuário
                </Link>
                <Link to="/admin/auth" onClick={() => setShowLoginDropdown(false)}>
                  Administrador
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Versão Mobile */}
      <div className={styles.mobileNavbarItems}>
        <Link to={'/'}>
          <img className={styles.logo} src="/imgs/logo.png" alt="Logo" />
        </Link>
        <div className={styles.mobileNavbarBtns}>
          <Link to={'/cart'}>
            <LuShoppingCart className={styles.navbarLink} />
          </Link>
          <LuMenu className={styles.navbarLink} onClick={handleOpenMenu} />
        </div>
      </div>
      <Drawer
        anchor='right'
        open={openMenu}
        onClose={handleOpenMenu}
      >
        <div className={styles.drawer}>
          <Link to={'/'} className={styles.navbarLink} onClick={handleOpenMenu}>Home</Link>
          <Link to={'/plates'} className={styles.navbarLink} onClick={handleOpenMenu}>Pratos</Link>
          <Link to={'/auth'} className={styles.navbarLink} onClick={handleOpenMenu}>Login Usuário</Link>
          <Link to={'/admin/auth'} className={styles.navbarLink} onClick={handleOpenMenu}>Login Adm</Link>
          
        </div>
      </Drawer>
    </nav>
  )
}