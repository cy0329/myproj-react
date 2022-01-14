function CharSelect({ char }) {
  return (
    <div>
      <div>
        <img
          src={char.photo}
          alt="char.job"
          className="w-10 h-10 mr-2 rounded inline"
        />
        {char.job}
      </div>
    </div>
  );
}

export default CharSelect;
