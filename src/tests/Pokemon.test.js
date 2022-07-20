import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';

describe('Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon:',
    () => {
      renderWithRouter(<App />);
      const dados = 'Average weight: 6.0 kg';
      const pokemon = screen.getByTestId('pokemon-name');
      const type = screen.getByTestId('pokemon-type');
      const weigth = screen.getByTestId('pokemon-weight');
      const img = screen.getByRole('img');
      const src = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
      expect(pokemon.innerHTML).toBe('Pikachu');
      expect(type.innerHTML).toBe('Electric');
      expect(weigth.innerHTML).toBe(dados);
      expect(img).toHaveAttribute('src', src);
      expect(img).toHaveAttribute('alt', 'Pikachu sprite');
    });

  const id = '/pokemons/25';
  it('Teste se o card do pokémon indicado na Pokédex contém um link de navegação para '
     + 'exibir detalhes deste pokémon. O link deve possuir a URL /pokemons/<id>,'
     + 'onde <id> é o id do pokémon exibido', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'More details' });
    expect(link).toHaveAttribute('href', id);
  });

  it('Teste se ao clicar no link de navegação do pokémon, é feito o redirecionamento'
    + ' da aplicação para a página de detalhes de pokémon', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'More details' });
    userEvent.click(link);
    const details = screen.getByRole('heading', { name: 'Pikachu Details', level: 2 });
    expect(details).toBeInTheDocument();
  });

  it('Teste também se a URL exibida no navegador muda para /pokemon/<id>, onde <id>'
    + ' é o id do pokémon cujos detalhes se deseja ver', () => {
    const { history } = renderWithRouter(<App />);
    history.push(id);
    const { location: { pathname } } = history;
    expect(pathname).toBe(id);
  });

  it('Teste se existe um ícone de estrela nos pokémons favoritados:', () => {
    const { history } = renderWithRouter(<App />);
    history.push(id);
    const checkbox = screen.getByLabelText('Pokémon favoritado?', { selector: 'input' });
    userEvent.click(checkbox);
    const img = screen.getAllByRole('img');

    expect(img[1]).toHaveAttribute('src', '/star-icon.svg');
    expect(img[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
