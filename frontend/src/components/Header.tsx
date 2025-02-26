import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import popcornArt from '../assets/popcornart.png'
import { useNavigate } from 'react-router-dom';

function Header () {

    const navigate = useNavigate();
    const deconnection = async () => {
        localStorage.removeItem('cineclub-token');
        navigate('/', {replace: true} );
    }

    const account = () => {
        navigate('/account', {replace: true});
    }

    const navHome = () => {
        navigate('/home', {replace: true});
    }

    return (
        <>
        <div className="flex justify-center mb-10">
            <header className="flex justify-between w__desktop--element">
                <div className="flex items-center gap-3">
                    <button onClick={navHome}>
                        <img src={popcornArt} alt="popcorn art" width={50}/>
                    </button>
                    
                    <span>Suggérer un film</span>
                    <span>Aléatoire</span>
                </div>
                
                <div className="flex gap-3 items-center">
                    <input className="border rounded py-1 px-2" type="text" placeholder="Rechercher un film..."/>
                    <button>
                        <FontAwesomeIcon onClick={account} icon={faUser} title="Mon compte"/>
                    </button>
                    
                    <button>
                        <FontAwesomeIcon onClick={deconnection} icon={faRightFromBracket} title="Se déconnecter"/>
                    </button>
                    
                </div>
            </header>
        </div>
            
        </>
    );
}

export default Header;