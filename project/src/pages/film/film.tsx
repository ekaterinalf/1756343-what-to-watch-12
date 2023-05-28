import { Link, useNavigate, useParams } from 'react-router-dom';
import CardsList from '../../components/cards-list/cards-list';
import Logo from '../../components/logo/logo';
import Tabs from '../../components/tabs/tabs';
import { AppRoutes, NUMBER_OF_SIMILAR_MOVIES } from '../../const';
import { films } from '../../mocks/films';
import { FilmData } from '../../types/films';

const Film = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const filmOnPage: FilmData | undefined = films.find((film) => film.id === Number(id));


  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={filmOnPage?.backgroundImage} alt={filmOnPage?.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo />
            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                </div>
              </li>
              <li className="user-block__item">
                <a href="/" className="user-block__link">Sign out</a>
              </li>
            </ul>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{filmOnPage?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{filmOnPage?.genre}</span>
                <span className="film-card__year">{filmOnPage?.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button" onClick={() => navigate(AppRoutes.Player)}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button" onClick={() => navigate(AppRoutes.MyList)}>
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                <Link to={`/films/${filmOnPage?.id || 0}/review`} className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={filmOnPage?.posterImage} alt={filmOnPage?.name} width="218" height="327" />
            </div>
            <Tabs film={filmOnPage} />
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <CardsList films={films} quantity={NUMBER_OF_SIMILAR_MOVIES} />
        </section>

        <footer className="page-footer">
          <Logo cn='logo__link--light' />
          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Film;
