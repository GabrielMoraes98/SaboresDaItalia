import styles from './page.module.css'
import Dessert from '../../../public/imgs/homepage/dessert'
import NaturalFood from '../../../public/imgs/homepage/naturalFood'
import Vegetable from '../../../public/imgs/homepage/vegetable'
import { FaMapMarkerAlt, FaFacebookSquare, FaInstagram, FaWhatsapp } from "react-icons/fa"


export default function Home() {
    return (
        <div className={styles.pageContainer}>
            <section className={styles.descriptionSection}>
                <h1>Sabores da Itália</h1>
                <p>
                    Bem-vindo ao nosso refúgio gastronômico especial,
                    onde a essência da Itália se une à inovação moderna
                    para proporcionar uma experiência culinária inesquecível.
                    Aqui, cada prato é um carinho ao paladar,
                    preparado com paixão e dedicação para tornar
                    cada momento à mesa memorável.
                </p>
            </section>

            <section className={styles.foodSection}>
                <div>
                    <i><NaturalFood /></i>
                    <h4>Qualidade no Cotidiano</h4>
                    <p>
                        Explore nossa seleção diária de pratos especiais, trazendo um toque fresco e sofisticado à sua mesa.
                    </p>
                </div>
                <div>
                    <i><Vegetable /></i>
                    <h4>Ingredientes de Escolha Superior</h4>
                    <p>Escolhemos cuidadosamente insumos extraordinários para garantir a excelência em cada uma das suas refeições favoritas.</p>
                </div>
                <div>
                    <i><Dessert /></i>
                    <h4>Sabores para Todos os Paladares</h4>
                    <p>Descubra uma variedade de sabores com nosso cardápio completo, pensado para agradar toda a família, dos aperitivos às sobremesas.</p>
                </div>
            </section>

            <section className={styles.contactSection}>
                <h1>Fique por dentro!</h1>
                <p>
                    Adentre o mundo do Sabores da Itália acompanhando-nos nas redes sociais.
                    Você estará sempre por dentro das nossas criações culinárias, eventos exclusivos
                    e experiências gastronômicas surpreendentes. Não deixe escapar nenhum detalhe!
                </p>
                <div className={styles.socialButtonsContainer}>
                    <button className={styles.socialButton}><FaInstagram /> Instagram</button>
                    <button className={styles.socialButton}><FaFacebookSquare /> Facebook</button>
                    <button className={styles.socialButton}><FaWhatsapp /> Whatsapp</button>
                    <button className={styles.socialButton}><FaMapMarkerAlt />Local</button>
                </div>
            </section>
        </div>
    )
}