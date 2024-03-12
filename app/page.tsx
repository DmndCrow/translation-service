import styles from "./page.module.css";
import TranslationForm from "@/components/translation";
import AddLanguage from "@/components/addLanguage";
import AddKey from "@/components/addKey";

const Home = async () => {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <AddLanguage />
        <AddKey />
      </div>

      <div className={styles.center}>
        <TranslationForm />
      </div>
    </main>
  );
};

export default Home;
