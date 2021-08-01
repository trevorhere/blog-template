import React, { useState, useEffect } from 'react';
import {FaSpinner} from 'react-icons/fa'

export default function Loader(){
  return(
    <div  className="h-screen w-100 flex content-center justify-center ">
      < FaSpinner className="flex self-center animate-spin text-large"/>
    </div>

  )
}