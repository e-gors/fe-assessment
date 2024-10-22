import { Button, Container, Paper, Typography } from "@mui/material";
import React from "react";
import { handleErrorResponse, isEmpty, validateIPAddress } from "../utils/helpers";
import axios from "axios";
import {
  options,
  ToastNotification,
  ToastNotificationContainer,
} from "../utils/toastConfig";
import Http from "../utils/Http";
import DisplayCard from "./components/DisplayCard";
import InputSearch from "./components/InputSearch";

function Homepage() {
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [ipAddress, setIpAddress] = React.useState("");
  const [geoData, setGeoData] = React.useState({});
  const [selectedIps, setSelectedIps] = React.useState([]);
  const [history, setHistory] = React.useState([]); // List of previous IP history
  const [loadingHistory, setLoadingHistory] = React.useState(true); // Loading state for history

  React.useEffect(() => {
    fetchIP();
    fetchHistory();
  }, [ipAddress]);

  React.useEffect(() => {
    if (!isEmpty(ipAddress)) {
      fetchGeoInfo(ipAddress);
    }
  }, [ipAddress]);

  // Fetch history
  const fetchHistory = () => {
    setLoadingHistory(true); // Start loading history
    Http.get("/history")
      .then((res) => {
        if (res.data.status === 200) {
          setHistory(res.data.data); // Assuming history is an array of IP objects
        }
      })
      .catch((err) => {
        ToastNotification("error", handleErrorResponse(err), options);
      })
      .finally(() => {
        setLoadingHistory(false); // Stop loading
      });
  };

  // Fetch user's public IP address
  const fetchIP = async () => {
    try {
      const response = await axios.get("https://api.ipify.org?format=json");
      setIpAddress(response.data.ip);
    } catch (error) {
      console.error("Error fetching IP address:", error);
    }
  };

  // Fetch geolocation data
  const fetchGeoInfo = async (ip) => {
    try {
      const response = await axios.get(`https://ipinfo.io/${ip}/geo`);
      setGeoData(response.data); // Update geo data
    } catch (error) {
      ToastNotification(
        "error",
        `Error fetching GEO Information: ${error}`,
        options
      );
    }
  };

  // Handle IP search and submission to backend
  const handleSearch = async (searchIp) => {
    if (!isEmpty(searchIp) && validateIPAddress(searchIp)) {
      setLoading(true);
      try {
        // Check if the IP already exists in history
        const existingIp = history.find((entry) => entry.ip === searchIp);

        if (!existingIp) {
          // If IP is new, add it to the history
          const response = await Http.post("/history", { ip: searchIp });
          if (response.data.status === 201) {
            setHistory(response.data.history); // Update history
          }
        }

        // Fetch geolocation data for the IP (new or existing)
        setIpAddress(searchIp); // This triggers the useEffect to fetch geo info
      } catch (error) {
        ToastNotification("error", handleErrorResponse(error), options);
      } finally {
        setLoading(false);
      }
    } else {
      ToastNotification("error", "Invalid IP Address", options);
    }
  };

  const handleSelect = (ip) => {
    setSelectedIps((prev) =>
      prev.includes(ip) ? prev.filter((item) => item !== ip) : [...prev, ip]
    );
  };

  return (
    <>
      <ToastNotificationContainer />
      <Container maxWidth="sm">
        <Paper elevation={3} style={{ padding: "16px", marginTop: "16px" }}>
          <Typography variant="h5" align="center">
            Geo Information Finder
          </Typography>
          <InputSearch
            history={history} // Pass history
            setSearch={setSearch} // Update search value
            selectedIps={selectedIps} // Selected IPs
            handleSelect={handleSelect} // Handle selection
            loadingHistory={loadingHistory} // Loading state for history
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSearch(search)}
            disabled={loading}
          >
            {loading ? "Loading..." : "Search"}
          </Button>
          <DisplayCard geoData={geoData} /> {/* Always show the DisplayCard */}
        </Paper>
      </Container>
    </>
  );
}

export default Homepage;
