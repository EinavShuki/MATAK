import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        borderRadius: '5px',
        outline: 'none',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function MatakModal({children, text, show, handleClose}) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    return (
        <div>
            <Modal
                open={show}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper}>
                    <p id="simple-modal-title">{text}</p>
                    {children}
                </div>
            </Modal>
        </div>
    );
}
