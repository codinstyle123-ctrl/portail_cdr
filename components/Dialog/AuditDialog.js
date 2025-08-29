import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import MKButton from "components/MKButton";
import { useNavigate } from "react-router-dom";

function AuditDialog({ open, onClose }) {
    const navigate = useNavigate();

    const handleOptionSelected = (option) => {
        switch (option) {
            case 'CDR Radio':
                navigate('/fluxoaradio');
                break;
            case 'CDR Trans':
                navigate('/Catalogue');
                break;
            default:
                navigate('/');
                break;
        }

        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Choisir l&apos;univers CDR :</DialogTitle>
            <DialogContent sx={{ display: 'flex', alignItems: 'center' }}>
            
                <MKButton onClick={() => handleOptionSelected('CDR Radio')}>CDR Radio</MKButton>
        
                <MKButton onClick={() => handleOptionSelected('CDR Trans')}sx={{ marginLeft: '8px' }}>CDR Trans</MKButton>

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Annuler</Button>
            </DialogActions>
        </Dialog>
    );
}

AuditDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AuditDialog;
