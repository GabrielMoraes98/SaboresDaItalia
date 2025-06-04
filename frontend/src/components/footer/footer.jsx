import styles from './footer.module.css'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className={styles.footerContainer}>
            <img src="/imgs/logo.png" alt="" />
            <div className={styles.linksContainer}>
                    <Link className={styles.link} to={'/'}>Home</Link>
                    <Link className={styles.link} to={'/plates'}>Pratos</Link>
                    <Link className={styles.link} to={'/profile'}>Perfil</Link>
            </div>
            <div className={styles.linksContainer}>
                <p>Desenvolvido por Gabriel Moraes</p>
                <a target='_blank' className={styles.link} href="https://gabrielmoraes98.github.io/Portfolio/">Acesse Meu Portfólio</a>
            </div>
        </footer>
    )
}