import React, { ChangeEvent, CSSProperties } from 'react';
import { Item } from '../../types';
import styles from './SearchInput.module.css';
import { useNavigate } from 'react-router-dom';
import { FixedSizeList as List } from 'react-window';

interface SearchInputProps {
  data: Item[];
}

interface HighlightWordProps {
  word: string;
  highlight: string;
}

interface SearchItemsInnerProps {
  data: Item[];
  index: number;
  style: CSSProperties;
}

const HighlightWord = ({ word, highlight }: HighlightWordProps) => {
  const positions = React.useMemo(() => {
    const result = [];
    const haystack = word.toLowerCase();
    const needle = highlight.toLowerCase();
    let search = haystack.indexOf(needle, 0);

    while (search >= 0) {
      result.push(search);

      search = haystack.indexOf(needle, result[result.length - 1] + needle.length);
    }

    return result;
  }, [word, highlight]);
  const tokens = [];
  let tokenProcessed = 0;

  for (let i = 0; i < word.length; i++) {
    if (i === positions[tokenProcessed]) {
      tokens.push(<strong>{word.slice(i, i + highlight.length)}</strong>);
      tokenProcessed++;
      i += highlight.length - 1;
    } else {
      if (!tokens.length || typeof tokens[tokens.length - 1] !== 'string') {
        tokens.push('');
      }

      tokens[tokens.length - 1] += word[i];
    }
  }

  return (
    <>
      {tokens.map((t, i) => (
        <React.Fragment key={i}>{t}</React.Fragment>
      ))}
    </>
  );
};

const Inner = React.forwardRef<HTMLUListElement, React.HTMLProps<HTMLUListElement>>(
  ({ children, ...rest }, ref) => (
    <ul {...rest} ref={ref}>
      {children}
    </ul>
  ),
);

Inner.displayName = 'Inner';

const MAX_HEIGHT = 310;
const ITEM_HEIGHT = 33;
const PADDING_OFFSET = 32;

export default function SearchInput({ data }: SearchInputProps) {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState('');
  const [height, setHeight] = React.useState(0);
  const onChangeSearch = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
    [setSearch],
  );
  const searchResults = React.useMemo(() => {
    if (!search) {
      return [];
    }

    return data.filter(
      (d) =>
        d.line.name.toLowerCase().includes(search.toLowerCase()) ||
        d.product.name.toLowerCase().includes(search.toLowerCase()) ||
        d.shortnames.some((s) => s.toLowerCase().includes(search.toLowerCase())),
    );
  }, [search, data]);
  const onSelect = React.useCallback((id: string) => () => navigate(`/devices/${id}`), [navigate]);

  React.useEffect(() => {
    if (searchResults.length * ITEM_HEIGHT < MAX_HEIGHT) {
      setHeight(searchResults.length * ITEM_HEIGHT);
    } else {
      setHeight(MAX_HEIGHT - PADDING_OFFSET);
    }
  }, [searchResults.length]);

  return (
    <div className={styles.root}>
      <i className={styles.icon} />
      <input
        className={styles.input}
        type="search"
        onChange={onChangeSearch}
        placeholder="Search"
      />
      {!!searchResults.length && (
        <div style={{ maxHeight: MAX_HEIGHT }} className={styles.modal}>
          <List
            innerElementType={Inner}
            itemCount={searchResults.length}
            itemSize={ITEM_HEIGHT}
            height={height}
            width="100%"
            className={styles.scroll}
          >
            {({ index, style }: SearchItemsInnerProps) => {
              const item = searchResults[index];
              return (
                <li
                  style={style}
                  key={item.id}
                  className={styles.listItem}
                  onClick={onSelect(item.id)}
                >
                  <span className={styles.listName}>
                    <HighlightWord word={item.product.name} highlight={search} />
                  </span>
                  <span className={styles.listLine}>
                    {item.shortnames[item.shortnames.length - 1]}
                  </span>
                </li>
              );
            }}
          </List>
        </div>
      )}
    </div>
  );
}
