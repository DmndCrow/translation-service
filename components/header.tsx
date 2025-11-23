import Link from "next/link";
import constants from "@/lib/constants";
import AddLanguage from "./addLanguage";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      {constants.IS_ADD_LANGUAGE_ENABLED && <AddLanguage />}
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/">Добавить новый ключ</Link>
          </li>
          <li>
            <Link href="/upload-data">Загрузить данные</Link>
          </li>
          <li>
            <Link href="/get-model">Модель ключей</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
