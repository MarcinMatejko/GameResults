import React from 'react';
import { Link } from 'react-router-dom';
import Scroll from '../layout/Scroll';

const Instructions = () => {
  return (
    <div className='instructions'>
      <div className='dark-overlay'>
        <Scroll>
          <div className='instructions-inner'>
            <Link className='btn btn-primary btn-back' to='/'>
              Powrót
            </Link>
            <h1 className='x-large text-center mt-4'>Jak używać Punktatora</h1>
            <div className='instructions-box'>
              <h2>0. Załóż darmowe konto.</h2>
              <p>
                Potrzebujesz konta, żeby moć dodawać własnych graczy, własne gry
                i przede wszystkim, żeby zapisaywać własne wyniki gier.
              </p>
              <h2>1. Stwórz własnych Graczy.</h2>
              <p>Graczy będziesz używał przy dodawaniu wyników gier.</p>
              <h2>2. Sprawdź listę dostępnych gier.</h2>
              <p>
                Tutaj możesz sprawdzić wszystkie gry dostępne w bazie danych. Po
                kliknięciu w wybrany tytuł zobaczysz jego szczegóły, oraz opcję
                "Dodaj do ulubionych". Jeżeli znajdziesz Grę której wynik
                chciałbyś zapisać, dodaj ją do ulubionych. Potem z ulubionych
                gier będziesz wybierał tytuły do których będziesz zapisywać
                wyniki. Jeżeli nie znalazłeś Gry której szukasz, nic się nie
                stało. Przejdź do kroku 3.
              </p>
              <h2>3. Sprawdź listę ulubionych gier</h2>
              <p>
                Tutaj znajdują się gry, które dodałeś w poprzednim kroku. Jeżeli
                nie ma gry którą potrzebujesz, kliknij "Dodaj Grę do
                ulubionych". W następnym oknie wypełnij formularz i dodaj nową
                grę do ulubionych. Gry które stworzyłeś w tym kroku są dostępne
                tylko dla Ciebie, nie dodają się do głównej bazy gier. Po
                kliknięciu w tytuł gry zobaczysz jej szczegóły oraz opcję "Usuń
                grę". Gry które usuniesz usuwają się tylko z ulubionych.
                Użytkownik nie ma możliwości dodawania/usuwania gier w z głównej
                bazy.
              </p>
              <h2>4. Nowy wynik gry</h2>
              <p>
                Tutaj dodajesz wyniki swoich gier. Wybierz tytuł gry, następnie
                dodaj graczy którzy grali i każdemu przypisz ile punktów uzyskał
                w danej rozgrywce, wybierz gracza który wygrał, a następnie
                zapisz wynik gry.
              </p>
            </div>
            <Link className='btn btn-primary btn-add-game mb-6' to='/'>
              Zacznij używać Punktatora
            </Link>
          </div>
        </Scroll>
      </div>
    </div>
  );
};

export default Instructions;
