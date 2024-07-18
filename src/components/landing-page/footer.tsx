import React from 'react';

const Footer = () => {
  return (
    <div className="footer flex justify-center text-[#666] my-12">
      <div className="container max-w-screen-xl px-4">
        <div className="top flex flex-wrap justify-between gap-8">
          <div className="item flex flex-col gap-5 w-full sm:w-auto">
            <h2 className="text-lg text-[#555]">Categories</h2>
            <span className="font-light">Graphics & Design</span>
            <span className="font-light">Digital Marketing</span>
            <span className="font-light">Writing & Translation</span>
            <span className="font-light">Video & Animation</span>
            <span className="font-light">Music & Audio</span>
            <span className="font-light">Programming & Tech</span>
            <span className="font-light">Data</span>
            <span className="font-light">Business</span>
            <span className="font-light">Lifestyle</span>
            <span className="font-light">Photography</span>
            <span className="font-light">Sitemap</span>
          </div>
          <div className="item flex flex-col gap-5 w-full sm:w-auto">
            <h2 className="text-lg text-[#555]">About</h2>
            <span className="font-light">Press & News</span>
            <span className="font-light">Partnerships</span>
            <span className="font-light">Privacy Policy</span>
            <span className="font-light">Terms of Service</span>
            <span className="font-light">Intellectual Property Claims</span>
            <span className="font-light">Investor Relations</span>
            <span className="font-light">Contact Sales</span>
          </div>
          <div className="item flex flex-col gap-5 w-full sm:w-auto">
            <h2 className="text-lg text-[#555]">Support</h2>
            <span className="font-light">Help & Support</span>
            <span className="font-light">Trust & Safety</span>
            <span className="font-light">Selling on GigNook</span>
            <span className="font-light">Buying on GigNook</span>
          </div>
          <div className="item flex flex-col gap-5 w-full sm:w-auto">
            <h2 className="text-lg text-[#555]">Community</h2>
            <span className="font-light">Customer Success Stories</span>
            <span className="font-light">Community hub</span>
            <span className="font-light">Forum</span>
            <span className="font-light">Events</span>
            <span className="font-light">Blog</span>
            <span className="font-light">Influencers</span>
            <span className="font-light">Affiliates</span>
            <span className="font-light">Podcast</span>
            <span className="font-light">Invite a Friend</span>
            <span className="font-light">Become a Seller</span>
            <span className="font-light">Community Standards</span>
          </div>
          <div className="item flex flex-col gap-5 w-full sm:w-auto">
            <h2 className="text-lg text-[#555]">More From GigNook</h2>
            <span className="font-light">GigNook Business</span>
            <span className="font-light">GigNook Pro</span>
            <span className="font-light">GigNook Logo Maker</span>
            <span className="font-light">GigNook Guides</span>
            <span className="font-light">Get Inspired</span>
            <span className="font-light">GigNook Select</span>
            <span className="font-light">ClearVoice</span>
            <span className="font-light">GigNook Workspace</span>
            <span className="font-light">Learn</span>
            <span className="font-light">Working Not Working</span>
          </div>
        </div>
        <hr className="my-12 border-[#ebe9e9]" />
        <div className="text-center">
          <p>2024 © GigNook LLC</p>
          <p>Terms & Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
