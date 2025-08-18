import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const Categories = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <div>
            <Typography variant="h4" component="h1" gutterBottom>
              Categories
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage product categories
            </Typography>
          </div>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            Add Category
          </Button>
        </Box>
        
        {/* Categories list will go here */}
        <Box sx={{ 
          p: 4, 
          border: '1px dashed', 
          borderColor: 'divider',
          borderRadius: 1,
          textAlign: 'center'
        }}>
          <Typography variant="body1" color="text.secondary">
            No categories found. Add your first category to get started.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Categories;
