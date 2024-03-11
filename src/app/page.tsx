import styles from "./page.module.css";
import TranslationForm from "@/components/translation";
import AddLanguage from "@/components/addLanguage";
import AddKey from "@/components/addKey";
import { Language } from "@/lib/models";

const Home = async () => {
  const languages: Language[] = await fetch(
    "http://localhost:3000/api/database/language"
  ).then((a) => a.json());

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <AddLanguage />
        <AddKey />
      </div>

      <div className={styles.center}>
        <TranslationForm languages={languages} />
      </div>
    </main>
  );
};

export default Home;
