import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa'
    + 'não tenha pokémons favoritos;', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');

    const msg = screen.getByText('No favorite pokemon found');
    expect(msg).toBeInTheDocument();
  });

  it('Teste se são exibidos todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: 'More details' });
    userEvent.click(link);

    const input = screen.getByLabelText('Pokémon favoritado?', { selector: 'input' });
    userEvent.click(input);

    const link2 = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(link2);

    const name = screen.getByText('Pikachu');
    expect(name).toBeInTheDocument();
  });
});
