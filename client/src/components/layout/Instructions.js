import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Scroll from '../layout/Scroll';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import players from '../../img/instructions/players.jpg';
import register from '../../img/instructions/register.jpg';
import games from '../../img/instructions/games.jpg';
import userGames from '../../img/instructions/userGames.jpg';

const Instructions = ({ auth: { isAuthenticated, loading } }) => {
  return (
    <div className='instructions'>
      <div className='dark-overlay-intructions'>
        <Scroll>
          <div className='instructions-inner'>
            <h1 className='x-large text-center mt-4'>Jak używać Punktatora</h1>
            <div className='instructions-box'>
              {!loading && (
                <Fragment>
                  {!isAuthenticated ? (
                    <Fragment>
                      <h2 className='instructions-header'>
                        0. Załóż darmowe konto.
                      </h2>
                      <p className='instructions-text'>
                        Potrzebujesz konta, żeby moć dodawać własnych graczy,
                        własne gry i przede wszystkim, żeby zapisaywać własne
                        wyniki gier. Konto możesz założyć{' '}
                        <Link className='btn-instructions' to='/register'>
                          tutaj.
                        </Link>
                      </p>
                      <img
                        src={register}
                        alt='register'
                        className='img-instructions'
                      />
                    </Fragment>
                  ) : (
                    <Fragment></Fragment>
                  )}
                </Fragment>
              )}
              <h2 className='instructions-header'>
                1. Stwórz własnych Graczy.
              </h2>
              <p className='instructions-text'>
                Graczy będziesz używał przy dodawaniu wyników gier. Graczy
                możesz stworzyć{' '}
                <Link className='btn-instructions' to='/players'>
                  tutaj.
                </Link>
              </p>
              <img src={players} alt='players' className='img-instructions' />
              <h2 className='instructions-header'>
                2. Sprawdź listę dostępnych gier.
              </h2>
              <p className='instructions-text'>
                W tym kroku możesz sprawdzić wszystkie gry dostępne w bazie
                danych. Po kliknięciu w wybrany tytuł zobaczysz jego szczegóły,
                oraz opcję "Dodaj do ulubionych". Jeżeli znajdziesz Grę której
                wynik chciałbyś zapisać, dodaj ją do ulubionych. Potem z
                ulubionych gier będziesz wybierał tytuły do których będziesz
                zapisywać wyniki. Jeżeli nie znalazłeś Gry której szukasz, nic
                się nie stało, przejdź do kroku 3. Lista dostępnych gier jest
                sukcesywnie powiększana.{' '}
                <Link className='btn-instructions' to='/games'>
                  Lista Gier.
                </Link>
              </p>
              <img src={games} alt='games' className='img-instructions' />
              <h2 className='instructions-header'>
                3. Sprawdź listę ulubionych gier
              </h2>
              <p className='instructions-text'>
                Tutaj znajdują się gry, które dodałeś w poprzednim kroku. Jeżeli
                nie ma gry którą potrzebujesz, kliknij "Dodaj Grę do
                ulubionych". W następnym oknie wypełnij formularz i dodaj nową
                grę do ulubionych. Gry które stworzyłeś w tym kroku są dostępne
                tylko dla Ciebie, nie dodają się do głównej bazy gier. Po
                kliknięciu w tytuł gry zobaczysz jej szczegóły oraz opcję "Usuń
                grę". Gry które usuniesz usuwają się tylko z ulubionych.
                Użytkownik nie ma możliwości dodawania/usuwania gier w z głównej
                bazy.{' '}
                <Link className='btn-instructions' to='/user-games'>
                  Lista Ulubionych Gier.
                </Link>
              </p>
              <img
                src={userGames}
                alt='userGames'
                className='img-instructions'
              />
              <h2 className='instructions-header'>4. Nowy wynik gry</h2>
              <p className='instructions-text'>
                W tym kroku dodajesz wyniki swoich gier. Wybierz tytuł gry,
                następnie dodaj graczy którzy grali i każdemu przypisz ile
                punktów uzyskał w danej rozgrywce, wybierz gracza który wygrał,
                a następnie zapisz wynik gry.{' '}
                <Link className='btn-instructions' to='/new-result'>
                  Dodaj wynik gry.
                </Link>
              </p>
            </div>
            <Link
              className='btn btn-primary btn-add-game mb-6 text-center'
              to='/'
            >
              Zacznij używać Punktatora
            </Link>
          </div>
        </Scroll>
      </div>
    </div>
  );
};

Instructions.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Instructions);
