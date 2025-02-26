import Header from "./Header";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, useEffect } from 'react';
import axios from 'axios';

function Account() {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');
    useEffect(() => {
        const getInformation = async () => {
            const token = localStorage.getItem('cineclub-token');
            if (!token) {
              setError('Token manquant. Veuillez vous reconnecter.');
              return;
            }
      
            try {
              const { data } = await axios.get('http://localhost:8000/api/check-role', {
                headers: { Authorization: `Bearer ${token}` },
              });
      
              if (data?.isAdmin !== undefined && data?.email) {
                setIsAdmin(data.isAdmin);
                setEmail(data.email);
              } else {
                setError('Données utilisateur incomplètes.');
              }
            } catch (err) {
              console.error('❌ Erreur lors de la récupération des informations', err);
              setError('Impossible de récupérer les informations.');
            }
          };
        getInformation();
    }, [])

    return(
        <>
            <Header />
            <div className="flex justify-center">
                <div className="flex w__desktop--element justify-between items-center">
                    <section className="flex flex-col items-start gap-3">
                        <h1 className="text-4xl">Paramètres</h1>
                        {isAdmin 
                            ? <span className="text-gray-400">Administrateur</span> 
                            : <span className="text-gray-400">Utilisateur</span> 
                        }
                        
                        {isAdmin && 
                            <div className="flex flex-col items-start gap-3">
                                <button>Télécharger un nouveau film</button>
                                <button>Ajouter un compte</button>
                            </div>
                        }
                        <button>Changer de mot de passe</button>
                        <button>Changer l'adresse email</button>
                        <button>Changer le thème</button>
                    </section>

                    <div className="flex flex-col items-center gap-2">
                        <FontAwesomeIcon className="text-9xl" icon={faUser}></FontAwesomeIcon>
                        <span>{email || 'chargement...'}</span>
                        {error}
                    </div>
                    

                </div>
            </div>
            
        </>
        
    );
    
}

export default Account;