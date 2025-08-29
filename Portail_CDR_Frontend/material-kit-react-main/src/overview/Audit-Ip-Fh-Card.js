import PropTypes from "prop-types";
//import ArrowDownIcon from "@heroicons/react/24/solid/ArrowDownIcon";
//import ArrowUpIcon from "@heroicons/react/24/solid/ArrowUpIcon";
//import CurrencyDollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
import { Card, CardContent, Stack, Typography } from "@mui/material";
//import MKButton from "components/MKButton";
//import axiosInstance from "AxiosApi/AxiosInstance";

export const AuditIpFhCard = (props) => {
  const { difference, positive = false, sx, value, title, description } = props;

  return (
    <Card sx={{ ...sx, backgroundColor: "rgba(255, 255, 255, 0.8)", height: "180px" }}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1}>
            <Typography variant="h6" alignItems="center">
              {title}
            </Typography>
            <Typography variant="h5">{value}</Typography>
          </Stack>
        </Stack>
        {difference && (
          <Stack
            alignItems="center"
            justifyContent="center"
            direction="row"
            spacing={0}
            sx={{ mt: 4 }}
          >
            <Stack alignItems="flex-start" direction="row" spacing={3}>
              <Typography
                color={positive ? "success.main" : "error.main"}
                variant="h6"
              ></Typography>
            </Stack>

            <Typography color="text.secondary" variant="h6">
              {difference}% {description}
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};
AuditIpFhCard.propTypes = {
  difference: PropTypes.number.isRequired,
  positive: PropTypes.bool.isRequired,
  sx: PropTypes.object.isRequired,
  value: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
