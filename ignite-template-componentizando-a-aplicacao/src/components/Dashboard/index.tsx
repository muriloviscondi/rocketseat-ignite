import { useEffect, useState } from 'react';

import { api } from '../../services/api';

import { Content } from '../Content';
import { SideBar } from '../SideBar';

import './styles.scss';

import { GenreResponseProps, MovieProps } from './interface';
import { Header } from '../Header';

export const Dashboard = () => {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  const handleClickButton = (id: number) => {
    setSelectedGenreId(id);
    handleSelectGenre(id);
  };

  const handleGenres = () => {
    api.get<GenreResponseProps[]>('genres').then((response) => {
      setGenres(response.data);
    });
  };

  const handleSelectGenre = (id: number) => {
    api.get<MovieProps[]>(`movies/?Genre_id=${id}`).then((response) => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${id}`).then((response) => {
      setSelectedGenre(response.data);
    });
  };

  useEffect(() => {
    handleGenres();
    handleSelectGenre(1);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar
        genres={genres}
        selectedGenreId={selectedGenreId}
        handleClickButton={handleClickButton}
      />

      <div className="container">
        <Header title={selectedGenre.title} />

        <Content movies={movies} />
      </div>
    </div>
  );
};
