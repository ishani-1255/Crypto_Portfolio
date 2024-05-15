import React from 'react';
import { Link } from 'react-router-dom';

function Home(){
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto py-8 mt-10">
        
       
        <div className="flex flex-wrap items-center">
          <div className="w-full md:w-1/2 md:pr-4 mb-4 md:mb-0">
            <div className="p-8 bg-white">
            <h1 className="text-3xl font-bold mb-4">Welcome to CryptoTrackX</h1>
              
              <p className="text-gray-700 mt -5">Your go-to platform for comprehensive cryptocurrency tracking and analysis.</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 md:pl-4">
            <img src="https://img.etimg.com/photo/msid-80927000/image3-1-copy.jpg" alt="Crypto"  className='border-l-2 pl-6 border-black'/>
          </div>
        </div>
      </div>
      <footer className="bg-gray-200 py-4 text-center fixed bottom-0 left-0 w-full ">
      <p className="text-sm text-gray-600">© 2024 CryptoPortfolio. All rights reserved.</p>
    </footer>
    </div>
  );
}

export default Home;