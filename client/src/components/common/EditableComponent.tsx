import { useState, useEffect } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Create your custom theme here if you have one
const theme = createTheme();

const MyComponent = () => {
  const [isEditing, setIsEditing] = useState(true);
  const [text, setText] = useState("");
  const [image, setImage] = useState<string | null>(null); // Allow image to be string or null

  useEffect(() => {
    // Load the image from local storage on component mount
    const savedImage = localStorage.getItem("savedImage");
    if (savedImage) {
      setImage(savedImage);
    }
  }, []);

  const handleDrop = (acceptedFiles: File[]) => {
    const fileUrl = URL.createObjectURL(acceptedFiles[0]);
    setImage(fileUrl);
    localStorage.setItem("savedImage", fileUrl); // Save the image to local storage
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: {
      "image/*": [],
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: theme.spacing(2) }}>
        {isEditing ? (
          <>
            <TextField
              fullWidth
              label="Edit Text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              margin="normal"
            />
            <div
              {...getRootProps()}
              style={{
                border: "2px dashed #cccccc",
                padding: theme.spacing(2),
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <input {...getInputProps()} />
              {image ? (
                <img src={image} alt="Preview" style={{ width: "100%" }} />
              ) : (
                <p>Drag 'n' drop an image here, or click to select one</p>
              )}
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsEditing(false)}
              style={{ marginTop: theme.spacing(2) }}
            >
              Done Editing
            </Button>
          </>
        ) : (
          <>
            <Paper
              sx={{
                padding: theme.spacing(2),
                marginBottom: theme.spacing(2),
              }}
            >
              <Typography variant="h6">Display Text</Typography>
              <Typography variant="body1">{text}</Typography>
            </Paper>
            {image && (
              <Paper
                sx={{
                  padding: theme.spacing(2),
                  marginBottom: theme.spacing(2),
                }}
              >
                <Typography variant="h6">Display Image</Typography>
                <img src={image} alt="Uploaded" style={{ width: "100%" }} />
              </Paper>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default MyComponent;
