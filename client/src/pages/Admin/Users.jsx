import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography, 
  IconButton,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Snackbar
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  Person as PersonIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { getUsers, deleteUser } from '../../services/adminService';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers();
      setUsers(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch users');
      showSnackbar('Failed to fetch users', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteUser(selectedUser._id);
      setUsers(users.filter(user => user._id !== selectedUser._id));
      showSnackbar('User deleted successfully', 'success');
    } catch (err) {
      showSnackbar('Failed to delete user', 'error');
    } finally {
      setOpenDialog(false);
      setSelectedUser(null);
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Users Management</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          component={RouterLink}
          to="/admin/users/new"
        >
          Add User
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="users table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    Loading users...
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <TableRow hover key={user._id}>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <PersonIcon sx={{ mr: 1 }} />
                          {user.name}
                        </Box>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: 'inline-block',
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            bgcolor: user.role === 'admin' ? 'primary.light' : 'grey.200',
                            color: user.role === 'admin' ? 'primary.contrastText' : 'text.primary',
                          }}
                        >
                          {user.role}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: 'inline-block',
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            bgcolor: user.isActive ? 'success.light' : 'error.light',
                            color: 'white',
                          }}
                        >
                          {user.isActive ? 'Active' : 'Inactive'}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          component={RouterLink}
                          to={`/admin/users/edit/${user._id}`}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteClick(user)}
                          disabled={user.role === 'admin'}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete user <strong>{selectedUser?.name}</strong>? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Users;
