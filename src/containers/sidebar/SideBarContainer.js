import React from "react";
import { Link } from "react-router-dom";

const NavSimpleElement = ({ isActive, name, href }) => (
  <li>
    <Link className={isActive ? "active" : ""} to={href}>
      <i className="fas fa-image"></i>
      Portfolio
    </Link>
  </li>
);

const NavElement = (props) => {
  const { name, isActive, id, subMenu } = props;
  return (
    <li className={isActive ? "active" : ""}>
      <a
        href={`#${id}`}
        data-toggle="collapse"
        aria-expanded="false"
        className="dropdown-toggle"
      >
        <i className="fas fa-home"></i>
        {name}
      </a>
      <ul className="collapse list-unstyled" id={id}>
        {subMenu &&
          subMenu.map((entry) => (
            <li key={entry.name}>
              <Link to={entry.href}>{entry.name}</Link>
            </li>
          ))}
      </ul>
    </li>
  );
};

const SideBarContainer = (props) => {
  const { title, entries } = props;
  return (
    <nav id="sidebar">
      <Link to="/">
        <div className="sidebar-header">
          <h3>{title}</h3>
          <strong>{title}</strong>
        </div>
      </Link>

      <ul className="list-unstyled components">
        {entries.map((entry) => {
          entry.key = entry.id;
          if (entry.subMenu) {
            return <NavElement {...entry} />;
          } else {
            return <NavSimpleElement {...entry} />;
          }
        })}
        <NavElement
          name="Home"
          isActive={false}
          id="home"
          subMenu={[{ name: "Home 1", href: "#" }]}
        />
        <NavSimpleElement name="About" href="#" />
        <NavElement
          name="Pages"
          isActive={false}
          id="pages"
          subMenu={[{ name: "Page 1", href: "#" }]}
        />
      </ul>

      <ul className="list-unstyled CTAs">
        <li>
          <a
            href="https://github.com/TitusCln/ScrumBoardSystem-react"
            className="article"
          >
            GitHub Repo
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default SideBarContainer;
