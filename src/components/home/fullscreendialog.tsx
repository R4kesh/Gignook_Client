import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { format } from 'date-fns';  

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface FullScreenDialogProps {
  open: boolean;
  handleClose: () => void;
}

interface PaymentDetails {
  freelancer: {
    firstname: string;
    profilePicture: string; // Assuming this is where the profile picture URL is stored
  };
  title: string; // Assuming this is the work title or description
  amount: number;
  date: string;
}

const FullScreenDialog: React.FC<FullScreenDialogProps> = ({ open, handleClose }) => {
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails[]>([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const userId = localStorage.getItem('userid');
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/paymentHistory/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        setPaymentDetails(response.data);
        console.log('Payment details:', response.data);
      } catch (error) {
        console.error('Error fetching payment details:', error);
      }
    };

    if (open) {
      fetchPaymentDetails();
    }
  }, [open, token]);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1, textAlign: 'center' }} variant="h6" component="div">
            Payment
          </Typography>
        </Toolbar>
      </AppBar>
      <TableContainer component={Paper}>
        <Table aria-label="payment details table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Freelancer Name</TableCell>
              <TableCell align="center">Profile Picture</TableCell>
              <TableCell align="center">Work</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paymentDetails.map((payment, index) => (
              <TableRow key={index}>
                <TableCell align="center">{payment.freelancer.firstname}</TableCell>
                <TableCell align="center">
                  <Avatar alt={payment.freelancer.firstname} src={payment.freelancer.profilePicture} />
                </TableCell>
                <TableCell align="center">{payment.title}</TableCell>
                <TableCell align="center">{payment.amount}</TableCell>
                <TableCell align="center">{format(new Date(payment.date), 'yyyy-MM-dd')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Dialog>
  );
}

export default FullScreenDialog;
