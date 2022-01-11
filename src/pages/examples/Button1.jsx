function Button1({ children }) {
  return (
    <button
      style={{
        backgroundColor: 'palevioletred',
        borderRadius: '3px',
        border: 'none',
        color: 'white',
      }}
    >
      {children}
    </button>
  );
}

const Button2 = styled.button`
  background: palevioletred;
  border-radius: 3px;
  border: none;
  color: white;
`;
