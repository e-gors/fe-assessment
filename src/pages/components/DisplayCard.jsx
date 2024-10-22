import { Box, Paper, Typography } from "@mui/material";
import React from "react";

function DisplayCard({ geoData }) {
  const hasGeoData = geoData && Object.keys(geoData).length > 0;

  return (
    <Paper elevation={1} sx={{ padding: 2, mt: 2, mb: 2 }}>
      <Typography variant="h6" mb={2}>
        Geolocation Information:
      </Typography>
      <Box ml={2}>
        {hasGeoData ? (
          <>
            <Typography>
              <strong>IP:</strong> {geoData.ip}
            </Typography>
            <Typography>
              <strong>City:</strong> {geoData.city}
            </Typography>
            <Typography>
              <strong>Region:</strong> {geoData.region}
            </Typography>
            <Typography>
              <strong>Country:</strong> {geoData.country}
            </Typography>
            <Typography>
              <strong>Location:</strong> {geoData.loc}
            </Typography>
            <Typography>
              <strong>Postal:</strong> {geoData.postal}
            </Typography>
            <Typography>
              <strong>Timezone:</strong> {geoData.timezone}
            </Typography>
          </>
        ) : (
          <Typography>No geo information found</Typography>
        )}
      </Box>
    </Paper>
  );
}

export default DisplayCard;
