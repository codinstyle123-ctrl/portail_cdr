import { useState, useEffect } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import "./ArchitectureSelector.css";

const ArchitectureSelector = () => {
  const navigate = useNavigate();
  const { architecture } = useParams();
  const [selectedArchitecture, setSelectedArchitecture] = useState(
    architecture || "CSG-FH-CTR"
  );

  const architectures = [
    "CSG-FH-CSG",
    "CSG-FH-PTN",
    "CSG-FH-CTR",
    "CSG-FTTA-CSG",
    "CSG-FTTA-PTN",
    "CSG-FTTA-CTR",
  ];

  useEffect(() => {
    if (selectedArchitecture) {
      navigate(`/audit/${selectedArchitecture}`);
    }
  }, [selectedArchitecture, navigate]);

  return (
    <FormControl
      variant="outlined"
      size="small"
      className="customArchitectureSelector"
      sx={{ minWidth: 220, mt: 1 }}
    >
      <InputLabel 
        id="architecture-select-label" 
        sx={{ color: "white", mb: 0.5 /* add bottom margin if needed */ }}
      >
        Architecture
      </InputLabel>
      <Select
        labelId="architecture-select-label"
        value={selectedArchitecture}
        label="Architecture"
        onChange={(e) => setSelectedArchitecture(e.target.value)}
        sx={{
          color: "white", // Selected text color
          pt: 0.5, // Add left padding (adjust as needed)
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "& .MuiSvgIcon-root": {
            color: "white",
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: "white",
              color: "black",
            },
          },
        }}
      >
        {architectures.map((arch) => (
          <MenuItem key={arch} value={arch}>
            {arch}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ArchitectureSelector;
