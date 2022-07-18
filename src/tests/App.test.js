import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Teste se o topo da aplicação contém um conjunto fixo de links de navegação:',
  () => {
    it('O primeiro link deve possuir o texto Home', () => {
      renderWithRouter(<App />);

      const home = screen.getByRole('link', { name: 'Home' });
      expect(home).toBeInTheDocument();
    });
    it('O segundo link deve possuir o texto About', () => {
      renderWithRouter(<App />);

      const About = screen.getByRole('link', { name: 'About' });
      expect(About).toBeInTheDocument();
    });
    it('O segundo link deve possuir o texto About', () => {
      renderWithRouter(<App />);

      const Favorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
      expect(Favorite).toBeInTheDocument();
    });
    it(`Teste se a aplicação é redirecionada para a página inicial,
        na URL / ao clicar no link Home da barra de navegação; `, () => {
      const { history } = renderWithRouter(<App />);
      const home = screen.getByRole('link', { name: 'Home' });

      userEvent.click(home);
      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });
    it(`Teste se a aplicação é redirecionada para a página de About, na URL /about,
     ao clicar no link About da barra de navegação;`, () => {
      const { history } = renderWithRouter(<App />);
      const About = screen.getByRole('link', { name: 'About' });

      userEvent.click(About);
      const { pathname } = history.location;
      expect(pathname).toBe('/about');
    });
    it(`Teste se a aplicação é redirecionada para a página de Pokémons Favoritados,
     na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação;`,
    () => {
      const { history } = renderWithRouter(<App />);
      const favorites = screen.getByRole('link', { name: 'Favorite Pokémons' });

      userEvent.click(favorites);
      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });
    it(`Teste se a aplicação é redirecionada para a página Not Found ao entrar em 
    uma URL desconhecida.`, () => {
      const customHistory = createMemoryHistory();
      render(<Router history={ customHistory }><App /></Router>);
      customHistory.push('/teste');

      const rotaPhantom = screen.getByRole('heading', {
        name: /Page requested not found/i,
        level: 2,
      });
      expect(rotaPhantom).toBeInTheDocument();
    });
  });
