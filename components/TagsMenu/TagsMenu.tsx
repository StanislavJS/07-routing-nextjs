import css from "./TagsMenu.module.css";
import Link from "next/link";

type TagsMenuProps = {
  tags: string[];
};

const TagsMenu: React.FC<TagsMenuProps> = ({ tags }) => (
  <div className={css.menuContainer}>
    <button className={css.menuButton}>Notes ▾</button>
    <ul className={css.menuList}>
      {tags.map(tag => (
        <li className={css.menuItem} key={tag}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default TagsMenu;
