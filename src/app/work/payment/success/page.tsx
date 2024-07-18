"use client"
import React, { useEffect, useState } from 'react';
import { useRouter,useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { useFeedbackStore } from '@/store/feedback';
import Image from 'next/image';

const PaymentSuccessPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [value, setValue] = useState<number | null>(1);
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const token = localStorage.getItem('token');
  
  const handleContinueShopping = () => {
    router.push('/home');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitFeedback = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    

    try {
  const workId = localStorage.getItem('woId');
  const freelancerId = localStorage.getItem('frId');

      console.log(' workId', workId,'freelancerId',freelancerId,'rating',value,'feedback',feedback);
      
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/feedback`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },

        workId,
        freelancerId,
        userId: localStorage.getItem('userid'),
        rating: value,
        feedback,
      });

      console.log('Feedback submitted:', response.data);
      handleClose();
      localStorage.removeItem('woId');
      localStorage.removeItem('frId');

      router.push('/home')
    } catch (error) {
      console.error('Error submitting feedback:', error);
      // Handle error state or display error message
    }
  };
  
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <Image
        width={16}
        height={16}
  
          src="/img/success.png" 
          alt="Success"
          className="w-16 h-16 mx-auto mb-4"
        />
        <h2>{sessionId}</h2>
        <h1 className="text-2xl font-bold mb-2 text-green-500">Payment Successful!</h1>
        <p className="text-gray-700 mb-4">Thank you for your purchase. Your transaction has been completed successfully.</p>
        <p className="text-gray-700 mb-8">A Document contains your project will be sent to your email Soon..</p>
        <button
          onClick={handleContinueShopping}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Home
        </button>
        
        <Button variant="outlined" onClick={handleClickOpen}>
          Feedback
        </Button>
        
        
        
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: 'form',
            onSubmit: handleSubmitFeedback,
          }}
        >
          <DialogTitle>Submit your Feedback</DialogTitle>
          <DialogContent>
            <Box sx={{ '& > legend': { mt: 1 } }}>
              <Typography component="legend">Rating</Typography>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </Box>
            <DialogContentText>
              Please provide your honest feedback about your recent experience with our freelancer. Your input helps us ensure that we continue to meet your expectations and deliver high-quality work.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="feedback"
              name="feedback"
              label="Feedback"
              type="text"
              fullWidth
              variant="standard"
              value={feedback}
              onChange={(e:any) => setFeedback(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
