// sidebar with list of links
const Sidebar = () => {
  return (
    <aside>
      <div className="bg-gray-800 w-64 h-full absolute">
        <ul className="p-4 text-white">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
