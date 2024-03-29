import constants from "@/lib/constants";
import AddLanguage from "./addLanguage";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      {constants.IS_ADD_LANGUAGE_ENABLED && <AddLanguage />}
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="/">Добавить новый ключ</a>
          </li>
          <li>
            <a href="/upload-data">Загрузить данные</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
