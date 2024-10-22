import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

// ----------------------------------------------------------------------

export default function NotFound() {
  return (
    <Container>
      <Box
        sx={{
          maxWidth: 480,
          mx: "auto",
          display: "flex",
          minHeight: "100vh",
          textAlign: "center",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{ mb: 3, fontSize: "clamp(1.5rem, 2vw + 1rem, 3rem)" }}
        >
          Sorry, page not found!
        </Typography>

        <Typography sx={{ color: "text.secondary", mb: 2 }}>
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
          mistyped the URL? Be sure to check your spelling.
        </Typography>

        <Button
          color="primary"
          href="/"
          size="large"
          variant="contained"
          component="a"
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
}
