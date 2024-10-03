'use client'

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, TextField, Box, Typography, CircularProgress, Paper, Container } from '@mui/material';
import { Upload, FileType } from 'lucide-react';
import Image from 'next/image';
import Tesseract from 'tesseract.js';

const OCRComponent: React.FC = () => {
  const [imageBase64, setImageBase64] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string);
      };
      reader.onerror = () => {
        console.error('Error reading file');
        alert('Failed to read file. Please try again.');
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: {'image/*': []} });

  const handleSubmit = async () => {
    if (!imageBase64) {
      alert('Please select an image first.');
      return;
    }

    setLoading(true);
    try {
      const result = await Tesseract.recognize(imageBase64, 'eng', {
        logger: (m) => console.log(m),
      });
      setText(result.data.text);
    } catch (error) {
      console.error('Error extracting text from image:', error);
      alert('Failed to extract text from image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
        Next.JS OCR Tool
      </Typography>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box
          {...getRootProps()}
          sx={{
            border: 2,
            borderStyle: 'dashed',
            borderRadius: 2,
            p: 4,
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s',
            borderColor: isDragActive ? 'primary.main' : 'grey.300',
            bgcolor: isDragActive ? 'primary.light' : 'background.paper',
            '&:hover': {
              borderColor: 'primary.main',
            },
          }}
        >
          <input {...getInputProps()} />
          {imageBase64 ? (
            <Box sx={{ position: 'relative', height: 200, width: '100%' }}>
              <Image
                src={imageBase64}
                alt="Uploaded"
                layout="fill"
                objectFit="contain"
              />
            </Box>
          ) : (
            <Box sx={{ width: 48, height: 48, mx: 'auto', mb: 2, color: 'text.secondary' }}>
              <Upload />
            </Box>
          )}
          <Typography variant="body2" color="text.secondary">
            {isDragActive
              ? "Drop the image here"
              : "Drag 'n' drop an image here, or click to select one"}
          </Typography>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading || !imageBase64}
            fullWidth
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <FileType />}
          >
            {loading ? 'Processing...' : 'Extract Text'}
          </Button>
        </Box>
        {text && (
          <Box sx={{ mt: 4, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>
              Extracted Text:
            </Typography>
            <TextField
              multiline
              fullWidth
              variant="outlined"
              value={text}
              onChange={(e) => setText(e.target.value)}
              minRows={4}
              maxRows={8}
            />
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default OCRComponent;