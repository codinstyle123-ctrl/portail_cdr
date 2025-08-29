import PropTypes from "prop-types";
import ArrowDownIcon from "@heroicons/react/24/solid/ArrowDownIcon";
import ArrowUpIcon from "@heroicons/react/24/solid/ArrowUpIcon";
//import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import {
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import MKButton from "components/MKButton";
import axiosInstance from "AxiosApi/AxiosInstance";
import React, { useState } from "react";
export const AuditIpFhCardCoherence = (props) => {
  const { difference, positive, sx, value } = props;
  const [loading, setLoading] = useState(false); // Add loading state
  const handleExportClick = () => {
    setLoading(true);
    axiosInstance({
      method: "get",
      url: "/audits/api/auditipfh/exportauditipfh", // Replace with your API endpoint
      responseType: "arraybuffer", // Important: responseType should be 'arraybuffer' to handle binary data
    })
      .then((response) => {
        setLoading(false);
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "audit_records.xlsx");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };
  return (
    <Card sx={{ ...sx, backgroundColor: "rgba(255, 255, 255, 0.8)", height: "1000px"  }}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1}>
            <Typography variant="h6">Taux de Coherence</Typography>
            <Typography variant="h5">{value}%</Typography>

            <MKButton onClick={handleExportClick}> Telecharger L&apos;audit</MKButton>
          </Stack>
        </Stack>
        {difference && (
          <Stack alignItems="center" direction="row" spacing={2} sx={{ mt: 2 }}>
            <Stack alignItems="center" direction="row" spacing={0.5}>
              <SvgIcon color={positive ? "success" : "error"} fontSize="small">
                {positive ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </SvgIcon>
              <Typography color={positive ? "success.main" : "error.main"} variant="body2">
                {difference}%
              </Typography>
            </Stack>
            <Typography variant="h6">
              variation du taux de coherence par rapport M-1
            </Typography>
          </Stack>
        )}
      </CardContent>
      <Dialog
        open={loading}
        onClose={() => setLoading(false)}
        disableBackdropClick
        disableEscapeKeyDown
      >
        <DialogTitle>Telechargement en Cours...</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Veuillez patienter pendant que le téléchargement est en cours de traitement.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MKButton onClick={() => setLoading(false)}>Cancel</MKButton>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

AuditIpFhCardCoherence.propTypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  value: PropTypes.number.isRequired,
  sx: PropTypes.object,
};
