import PropTypes from "prop-types";
import ArrowDownIcon from "@heroicons/react/24/solid/ArrowDownIcon";
import ArrowUpIcon from "@heroicons/react/24/solid/ArrowUpIcon";
import { Card, CardContent, Stack, SvgIcon, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile, faMeh, faFrown } from "@fortawesome/free-solid-svg-icons";
export const OverviewTotalCustomers = (props) => {
  const { category, difference, positive = false, sx, value,arch="CSG" } = props;

  const getCategoryEmoji = () => {
    if (category === "low") {
      return <FontAwesomeIcon icon={faFrown} style={{ color: "#FF2400" }} />;
    } else if (category === "medium") {
      return <FontAwesomeIcon icon={faMeh} style={{ color: "orange" }} />;
    } else if (category === "high") {
      return <FontAwesomeIcon icon={faSmile} style={{ color: "#008000" }} />;
    } else {
      return "";
    }
  };
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1}>
            <Typography variant="h4">Taux de Coherence</Typography>
            <Typography variant="h4">
              {value} {getCategoryEmoji()} {/* Display the emoji */}
            </Typography>
          </Stack>
        </Stack>
        {difference !== null && (
          <Stack alignItems="center" direction="row" spacing={2} sx={{ mt: 2 }}>
            <Stack alignItems="center" direction="row" spacing={0.5}>
              <SvgIcon color={positive ? "success" : "error"} fontSize="small">
                {positive ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </SvgIcon>
              <Typography color={positive ? "success.main" : "error.main"} variant="body2">
                {difference}%
              </Typography>
            </Stack>
            <Typography color="text.secondary" variant="caption">
              variation du taux de coherence par rapport M-1
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

OverviewTotalCustomers.propTypes = {
  category: PropTypes.oneOf(["low", "medium", "high"]).isRequired,
  difference: PropTypes.number,
  positive: PropTypes.bool,
  value: PropTypes.string.isRequired,
  sx: PropTypes.object,
};
