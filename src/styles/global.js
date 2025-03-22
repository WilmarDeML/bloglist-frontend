import styled from 'styled-components'

export const Wrapper = styled.div`
  font-family: Krona One, sans-serif;
  margin: 0;
  padding: 0;
  color: #03045e;
  background: #00b4d8;
  min-height: 100vh;
`

export const Input = styled.input`
  font-family: Krona One, sans-serif;
  border: 1px solid #03045e;
  border-radius: 0.7em;
  padding: 0.7em;
  font-size: 1em;
  background: #caf0f8;
`

export const Button = styled.button`
  font-family: Krona One, sans-serif;
  border: 1px solid #03045e;
  border-radius: 0.7em;
  padding: 0.6em;
  font-size: 1.2em;
  background: #caf0f8;
  width: 255px;
  cursor: pointer;

  &:hover {
    background: #03045e;
    color: #90e0ef;
  }
`

export const Title = styled.h1`
  font-size: 2em;
`

export const Subtitle = styled.h2`
  font-size: 1.5em;
  padding: 0.5em 1em;
`

export const ContainerForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;
`

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.2em;
  width: min-content;

  label {
    font-size: 1.2em;
    font-weight: 600;
    color: #03045e;
  }
`

export const Link = styled.div`
  border-radius: 0.5em;
  padding: 0.7em;
  margin: 1em;
  background: #90e0ef;

  &:hover {
    background: #0077b6;
    color: #caf0f8;
    cursor: pointer;
  }
`
