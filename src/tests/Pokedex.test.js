import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered pokémons',
    () => {
      renderWithRouter(<App />);
      const h2 = screen.getByRole('heading', {
        name: 'Encountered pokémons',
        level: 2,
      });
      expect(h2).toBeInTheDocument();
    });
  const nome = 'pokemon-name';
  const next = 'next-pokemon';
  it('Teste se é exibido o próximo pokémon da lista quando o botão Próximo'
    + ' pokémon é clicado', () => {
    renderWithRouter(<App />);
    const botao = screen.getByTestId(next);
    expect(botao.innerHTML).toMatch('Próximo pokémon');
    userEvent.click(botao);
    expect(botao.innerHTML).toMatch('Próximo pokémon');
    const Charmander = screen.getByTestId(nome);
    expect(Charmander.innerHTML).toMatch('Charmander');
    userEvent.click(botao);
    userEvent.click(botao);
    userEvent.click(botao);
    userEvent.click(botao);
    userEvent.click(botao);
    userEvent.click(botao);
    userEvent.click(botao);
    userEvent.click(botao);
    const primeiro = screen.getByTestId(nome);
    expect(primeiro.innerHTML).toMatch('Pikachu');
  });

  it('Teste se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);
    const botao = screen.getByTestId(next);
    userEvent.click(botao);
    const charmander = screen.getAllByTestId(nome);
    expect(charmander).toHaveLength(1);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const sete = 7;
    const botao = screen.getByTestId(next);
    const buttons = screen.getAllByRole('button');
    const todos = screen.getAllByTestId('pokemon-type-button');
    expect(todos.length).toBe(sete);
    expect(buttons[1].innerHTML).toMatch('Electric');
    expect(buttons[2].innerHTML).toMatch('Fire');
    expect(buttons[3].innerHTML).toMatch('Bug');
    expect(buttons[4].innerHTML).toMatch('Poison');
    expect(buttons[5].innerHTML).toMatch('Psychic');
    expect(buttons[6].innerHTML).toMatch('Normal');
    expect(buttons[7].innerHTML).toMatch('Dragon');
    userEvent.click(buttons[2]);
    const type = screen.getByTestId('pokemon-type');
    expect(type.innerHTML).toMatch('Fire');
    userEvent.click(botao);
    expect(type.innerHTML).toMatch('Fire');
    // expect(type.innerHTML).toMatch(type.innerHTML);
    expect(buttons[0]).toBeInTheDocument();
    expect(buttons[0].innerHTML).toMatch('All');
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro:', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', {
      name: 'All',
    });
    expect(button.innerHTML).toBe('All');
    userEvent.click(button);
    const pokemon = screen.getByText(/pikachu/i);
    expect(pokemon).toBeInTheDocument();
  });
});
