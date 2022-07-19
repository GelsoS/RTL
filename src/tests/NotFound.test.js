import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  test('Teste se a página contém um heading h2 com o texto Page requested not found',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/test');
      const h2 = screen.getByRole('heading', {
        name: /Page requested not found/i,
        level: 2,
      });
      expect(h2).toBeInTheDocument();
    });
  it('Teste se a página mostra a imagem', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/test');

    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const alt = 'Pikachu crying because the page requested was not found';
    const img = screen.getByAltText(alt);
    // expect(img).toHaveAttribute('alt', 'Pokédex');
    expect(img).toHaveAttribute('src', src);
  });
});
