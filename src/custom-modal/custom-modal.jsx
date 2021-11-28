import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import './custom-modal.scss';

const CustomModal = (props) => {

    const { signUp, children, handleRequestCloseFunc, modalIsOpen } = props;

    return (
        <Modal open={modalIsOpen}
            onClose={handleRequestCloseFunc}
            center
            classNames={{
                modal: `${signUp ? 'login_modal sign_up_modal' : 'login_modal'}`,
                // overlay: 'customOverlay',
                overlayAnimationIn: 'customEnterOverlayAnimation',
                overlayAnimationOut: 'customLeaveOverlayAnimation',
                modalAnimationIn: 'customEnterModalAnimation',
                modalAnimationOut: 'customLeaveModalAnimation',
            }}
            animationDuration={800}>
            {children}
        </Modal>
    );
}

export default CustomModal;