import { Link } from 'react-router-dom';

function CharSelect({ char }) {
  return (
    <div>
      <Link to={`/maple/${char.id}/`}>
        <div>
          <img
            src={char.photo}
            alt="char.job"
            className="w-10 h-10 mr-2 rounded inline"
          />
          {char.job}
        </div>
      </Link>
    </div>
  );
}

export default CharSelect;
