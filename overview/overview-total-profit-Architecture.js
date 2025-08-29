import PropTypes from "prop-types";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import ArchitectureFullScreenDialog from "components/Dialog/ArchitectureDialog";

export const OverviewTotalProfitArchitecture = (props) => {
  const { sx, title, image } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1}>
            <Typography variant="h4">{title}</Typography>
            <ArchitectureFullScreenDialog image={image} />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewTotalProfitArchitecture.propTypes = {
  value: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.object,
  sx: PropTypes.object,
};
