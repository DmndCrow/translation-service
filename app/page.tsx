import styles from "./page.module.css";
import TranslationForm from "@/components/translation";

const Home = async () => {
  return (
    <main>
      <div className={styles.center}>
        <TranslationForm />
      </div>
    </main>
  );
};

export default Home;
