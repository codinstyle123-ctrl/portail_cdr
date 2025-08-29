import PropTypes from "prop-types";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import FullScreenDialog from "components/Dialog/ParametreDialoglp71_2radio";
export const OverviewTotalProfit = (props) => {
  const { sx, title } = props;

  return (
    <Card >
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
            <FullScreenDialog />
        </Stack>
    </Card>
  );
};

OverviewTotalProfit.propTypes = {
  value: PropTypes.string,
  title: PropTypes.string,
  sx: PropTypes.object,
};
