import { Container } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import dbImg from '../../assets/pages/home/db-icon.png';
import signImg from '../../assets/pages/home/oscar-sign.png';
import styles from '../../styles/Home.module.css';

const BorderTitle = styled('h1')({
    background: 'linear-gradient(#0b0b0b, #9c9c9c)',
    textFillColor: 'transparent',
    backgroundClip: 'text',
    fontSize: '2.5em',
})

interface HomeProps {

}

export const Home: React.FC<HomeProps> = () => {

    const navigate = useNavigate();

    return (
        <Container maxWidth="lg">
            <main className={styles.main}>
                <div className={styles.description}>
                    <p>
                        Get started by editing&nbsp;
                        <code className={styles.code}>src/pages/index.tsx</code>
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        By&nbsp;&nbsp;
                        <img
                            className={styles.logo}
                            src={signImg}
                            alt="Sign"
                            width={80}
                            height={40}
                        />
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={dbImg} style={{ width: '60%' }} alt="DB" />
                </div>
                <div className={styles.center} style={{ paddingTop: '0px', paddingBottom: '2rem' }}>
                    <div className={styles.thirteen}>
                        <BorderTitle>
                            DB
                        </BorderTitle>
                    </div>
                    &nbsp;&nbsp;&nbsp;
                    <div style={{ display: 'flex', alignItems: 'baseline' }}>
                        <h1 style={{ fontSize: '2em', letterSpacing: '4px' }}>
                            COMPARE
                        </h1>
                        &nbsp;
                        <h4>
                            .JS
                        </h4>
                    </div>
                </div>
                <div className={styles.grid}>
                    <div
                        className={styles.card}
                        onClick={() => navigate("/compareDbSchema")}
                    >
                        <h2>
                            Compare Schema <span>-&gt;</span>
                        </h2>
                        <p>
                            Obtain the definitions of SP, FN, VIEW, and TABLE of the database, and compare the differences
                        </p>
                    </div>
                    <div
                        className={styles.card}
                        onClick={() => navigate("/compareDbSchema")}
                    >
                        <h2>
                            Compare Data <span>-&gt;</span>
                        </h2>
                        <p>
                            Obtain the specified Table data of the database and compare the data differences
                        </p>
                    </div>
                </div>
            </main>
        </Container>
    )
}