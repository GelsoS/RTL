import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';

describe('Teste o componente <PokemonDetails.js />', () => {
  const endereco = '/pokemons/25';
  test('Teste se as informações detalhadas do pokémon selecionado'
     + ' são mostradas na tela:', () => {
    const { history } = renderWithRouter(<App />);
    history.push(endereco);
    const details = screen.getByRole('heading', { name: 'Pikachu Details', level: 2 });
    const summary = screen.getByRole('heading', { name: 'Summary', level: 2 });
    const texto = 'This intelligent Pokémon roasts hard berries with electricity'
    + ' to make them tender enough to eat.';
    const resumo = screen.getByText(texto);
    expect(summary).toBeInTheDocument();
    expect(details).toBeInTheDocument();
    expect(resumo).toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com os mapas contendo as localizações'
   + ' do pokémon:', () => {
    const { history } = renderWithRouter(<App />);
    history.push(endereco);
    const details = screen.getByRole('heading', {
      name: 'Game Locations of Pikachu',
      level: 2,
    });
    expect(details).toBeInTheDocument();
    const imgs = screen.getAllByRole('img');
    const location = screen.getByText('Kanto Viridian Forest');
    const location2 = screen.getByText('Kanto Power Plant');
    const src = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';

    expect(location).toBeInTheDocument();
    expect(location2).toBeInTheDocument();
    expect(imgs[1]).toBeInTheDocument();
    expect(imgs[1]).toBeInTheDocument();
    expect(imgs[1]).toHaveAttribute('src', src);
    expect(imgs[1]).toHaveAttribute('alt', 'Pikachu location');
  });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes:',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push(endereco);
      const checkbox = screen.getByLabelText('Pokémon favoritado?', {
        selector: 'input',
      });

      userEvent.click(checkbox);
      history.push('/favorites');
      const favorito = screen.getByText('Pikachu');
      expect(favorito).toBeInTheDocument();
    });
});
