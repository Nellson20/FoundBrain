import { useSelector } from "react-redux";
import Modal from './Modal';

export default function withAuthenticationCheck(Component) {


    return function WrappedComponent(props) {
        const { user } = useSelector(state => state.user)
        const [isModalOpen, setModalOpen] = useState(false);

        const handleClick = () => {
            if (!user) {
                setModalOpen(true);
            }
        };

        const closeModal = () => {
            setModalOpen(false);
        };


        return (
            <>
                <Component {...props} onClick={handleClick} />
                {isModalOpen && <Modal open={isModalOpen}>
                    <div className="disconnectedModal">
                        <h1>Vous devez vous connecter</h1>
                        <button className="btn btn-purple" onClick={closeModal}>Fermer</button>
                    </div>
                </Modal>}
            </>
        );
    };
}
