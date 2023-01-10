import { HeaderProps } from './interface';

export const Header = ({ title }: HeaderProps) => {
  return (
    <header>
      <span className="category">
        Categoria:<span> {title}</span>
      </span>
    </header>
  );
};
