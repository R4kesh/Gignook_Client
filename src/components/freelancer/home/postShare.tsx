import React from 'react';
import PropTypes from 'prop-types';
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterIcon,
  TwitterShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  EmailIcon,
  EmailShareButton,
} from 'react-share';
import Image from 'next/image';

interface PostShareProps {
  postId: string | null;
  setOpenShare: (open: { isOpen: boolean, postId: string | null }) => void;
}

const PostShare: React.FC<PostShareProps> = ({ postId, setOpenShare }) => {
    
  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${postId}`; 
  console.log('po',shareUrl);

  const handleClose = () => {
    setOpenShare({ isOpen: false, postId: null });
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='absolute w-screen h-full bg-black/60 flex justify-center items-center z-[100] top-0'>
        <div className='bg-white rounded-[10px] w-[400px] h-auto p-3 flex flex-col justify-center text-[#720058] text-sm'>
          <div className='flex justify-between items-center mb-3'>
            <h4 className='text-sm font-semibold'>Share post</h4>
            <div className='flex justify-end'>
              <button onClick={handleClose}><Image width={75}
      height={75}
 className='w-7' src="https://w7.pngwing.com/pngs/1008/558/png-transparent-computer-icons-button-close-angle-rectangle-logo-thumbnail.png" alt="close" /></button>
            </div>
          </div>
          <div className='flex w-[50%] justify-around'>
            <FacebookShareButton url={shareUrl} title={'Check out this post!'} hashtag="#freelancer">
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <WhatsappShareButton url={shareUrl} title={'Check out this post!'} separator=":">
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <TwitterShareButton url={shareUrl} title={'Check out this post!'} hashtags={['freelancer', 'post']}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <LinkedinShareButton url={shareUrl} title={'Check out this post!'}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <EmailShareButton url={shareUrl} subject={'Check out this post!'} body={'I thought you might find this interesting: ' + shareUrl}>
              <EmailIcon size={32} round />
            </EmailShareButton>
          </div>
        </div>
      </div>
    </div>
  );
};

PostShare.propTypes = {
  postId: PropTypes.string,
  setOpenShare: PropTypes.func.isRequired,
};

export default PostShare;
