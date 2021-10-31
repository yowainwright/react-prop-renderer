import styled from 'styled-components'

export const theme = {
  colors: {
    light: '#fff',
    lightBorder: '#ccc',
    primary: '#000',
  },
  font: {
    regular: "'Roboto', sans-serif, 1rem",
    small: '0.6rem',
  },
  spacing: {
    verySmall: '0.2rem',
    small: '0.5rem',
    medium: '1rem',
    large: '2rem',
  },
}

export const Section = styled.section``

export const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: relative;

  &[data-endpoint-type] {
    position: relative;

    &:before {
      background: ${(props) => props.theme.colors.light};
      content: attr(data-endoint-type);
      display: inline-block;
      font-size: ${(props) => props.theme.font.small};
      left: ${(props) => props.theme.spacing.small};
      padding: ${(props) => props.theme.spacing.verySmall} ${(props) => props.theme.spacing.medium};
      position: relative;
      top: ${(props) => props.theme.spacing.small};
    }
  }
`

export const Item = styled.li`
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
  border-left: 5px solid ${(props) => props.theme.colors.primary};
  border-top: 0;
  padding: ${(props) => props.theme.spacing.verySmall};
  &:first-of-type {
    border-top: 1px solid ${(props) => props.theme.colors.lightBorder};
  }
`

export const Text = styled.span`
  display: inline-block;
  margin-bottom: ${(props) => props.theme.spacing.verySmall};
  &:last-child {
    margin-bottom: 0;
  }
`

export const Title = styled.h1``

/**
 * Button
 * @description positions the button in the top right corner
 */
export const Button = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.light};
  font: ${(props) => props.theme.font.regular};
  position: absolute;
  right: ${(props) => props.theme.spacing.large};
  top: ${(props) => props.theme.spacing.large};
`

/**
 * Background
 * @description adds a background color
 * meant to cover all app page content
 */
export const Background = styled.section`
  background-color: ${(props) => props.theme.backgroundColor};
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: auto !important;
  z-index: ${(props) => props.theme.backgroundZIndex};
`

/**
 * Modal
 * @description adds a modal containing
 * the endpoint and a button to exit the endpoint
 */
export const Modal = styled.div`
  max-width: ${(props) => props.theme.maxModalWidth};
`
