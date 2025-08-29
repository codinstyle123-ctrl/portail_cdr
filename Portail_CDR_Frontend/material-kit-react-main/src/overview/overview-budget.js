import { useState } from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import MKButton from "components/MKButton";
import axiosInstance from "AxiosApi/AxiosInstance";

export const OverviewBudget = (props) => {
  const { difference, positive = false, sx, value, architecture } = props;
  const [loading, setLoading] = useState(false);

  const handleExportClick = () => {
    setLoading(true);
    axiosInstance
      .get(`/audits/api/auditcsg/export/${architecture || ""}`, {
        responseType: "arraybuffer", // Important for binary files
      })
      .then((response) => {
        // 1. Create a Blob from the response data
        const blob = new Blob([response.data], {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        // 2. Create a download URL
        const url = window.URL.createObjectURL(blob);
        // 3. Dynamically create an <a> element
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "audit_records.xlsx");
        document.body.appendChild(link);
        // 4. Programmatically click the link
        link.click();
        // 5. Remove the link from the DOM
        link.parentNode.removeChild(link);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="center"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography variant="h4">Parc Audité</Typography>
            <Typography variant="h4">{value}</Typography>
          </Stack>
          <MKButton onClick={handleExportClick} disabled={loading}>
            {loading ? "Chargement…" : "Télécharger les données"}
          </MKButton>
        </Stack>

        {difference && (
          <Stack
            alignItems="flex-start"
            direction="row"
            spacing={0}
            sx={{ mt: 2 }}
          >
            <Stack alignItems="flex-start" direction="row" spacing={3}>
              <Typography
                color={positive ? "success.main" : "error.main"}
                variant="body2"
              ></Typography>
            </Stack>
            <Typography color="text.secondary" variant="overline">
              Représentant {Math.round(difference)}% du Parc {architecture == 'atr' ? 'ATR' : 'CSG'}
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

OverviewBudget.propTypes = {
  difference: PropTypes.number.isRequired,
  positive: PropTypes.bool.isRequired,
  sx: PropTypes.object.isRequired,
  value: PropTypes.number.isRequired,
  architecture: PropTypes.string.isRequired,
};
