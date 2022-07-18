import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

const texto1 = 'This application simulates a Pokédex, a digital'
  + ' encyclopedia containing all Pokémons';
const texto2 = 'One can filter Pokémons by type,'
  + ' and see more details for each one of them';

describe('Teste o componente <About.js />', () => {
  test('Teste se a página contém as informações sobre a Pokédex;', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const head = screen.getByText(texto1, texto2);
    expect(head).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const head = screen.getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });
    expect(head).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex;', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const parag = screen.getByText(texto1);
    const parag2 = screen.getByText(texto2);

    expect(parag).toBeInTheDocument();
    expect(parag2).toBeInTheDocument();
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    history.push('/about');
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'Pokédex');
    expect(img).toHaveAttribute('src', src);
  });
});
