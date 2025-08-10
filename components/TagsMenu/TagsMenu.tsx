'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import css from './TagsMenu.module.css';
import type { NoteTag } from '@/types/note';

const tags: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

const TagsMenu = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = useCallback(() => {
    setMenuVisible((visible) => !visible);
  }, []);

  return (
    <div className={css.menuContainer}>
      <button
        className={css.menuButton}
        onClick={toggleMenu}
        aria-haspopup="true"
        aria-expanded={menuVisible}
        aria-label="Toggle notes filter menu"
      >
        Notes ▾
      </button>

      {menuVisible && (
        <ul className={css.menuList} role="menu">
          <li className={css.menuItem} role="none">
            <Link
              href="/notes/filter/All"
              className={css.menuLink}
              role="menuitem"
              onClick={toggleMenu}
            >
              All notes
            </Link>
          </li>
          {tags.map((tag) => (
            <li key={tag} className={css.menuItem} role="none">
              <Link
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
                role="menuitem"
                onClick={toggleMenu}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;
