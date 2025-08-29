import PropTypes from "prop-types";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import FullScreenDialog from "components/Dialog/ParametreDialog";
export const OverviewTotalProfit = (props) => {
  const { sx, title } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1}>
            <Typography variant="h4">{title}</Typography>
            <FullScreenDialog />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewTotalProfit.propTypes = {
  value: PropTypes.string,
  title: PropTypes.string,
  sx: PropTypes.object,
};
