import React, { useState, useRef, useLayoutEffect, useMemo, useEffect } from 'react';
import { Heart, MessageCircle, Layers, Play, Search, SlidersHorizontal, X } from 'lucide-react';
import gsap from 'gsap';
import Post from './Post'; 

// --- DATA (Keep your existing 50+ items data here) ---
const allExplorePosts = [
  { id: 1, category: 'Cyberpunk', image: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '2.4k', comments: 45, type: 'image', span: 'col-span-1 row-span-1' },
  { id: 2, category: 'Cyberpunk', image: 'https://images.pexels.com/photos/2603464/pexels-photo-2603464.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '5.1k', comments: 98, type: 'image', span: 'col-span-2 row-span-2' },
   { id: 1, category: 'Cyberpunk', image: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '2.4k', comments: 45, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 2, category: 'Cyberpunk', image: 'https://images.pexels.com/photos/2603464/pexels-photo-2603464.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '5.1k', comments: 98, type: 'image', span: 'col-span-2 row-span-2' }, // Big Feature



  { id: 3, category: 'Cyberpunk', image: 'https://images.pexels.com/photos/2071882/pexels-photo-2071882.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '1.2k', comments: 30, type: 'video', span: 'col-span-1 row-span-2' }, // Tall



  { id: 4, category: 'Cyberpunk', image: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '8.5k', comments: 120, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 5, category: 'Cyberpunk', image: 'https://images.pexels.com/photos/3172740/pexels-photo-3172740.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '3.3k', comments: 55, type: 'album', span: 'col-span-1 row-span-1' },



  { id: 6, category: 'Cyberpunk', image: 'https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '4.1k', comments: 88, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 7, category: 'Cyberpunk', image: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '900', comments: 22, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 8, category: 'Cyberpunk', image: 'https://images.pexels.com/photos/2397414/pexels-photo-2397414.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '12k', comments: 300, type: 'video', span: 'col-span-1 row-span-1' },







  // --- TECH (Gadgets, Code, Setup) ---



  { id: 9, category: 'Tech', image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '1.1k', comments: 33, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 10, category: 'Tech', image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '4.5k', comments: 112, type: 'image', span: 'col-span-2 row-span-1' }, // Wide



  { id: 11, category: 'Tech', image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '900', comments: 24, type: 'video', span: 'col-span-1 row-span-1' },



  { id: 12, category: 'Tech', image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '2.1k', comments: 45, type: 'image', span: 'col-span-1 row-span-2' }, // Tall



  { id: 13, category: 'Tech', image: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '6.7k', comments: 150, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 14, category: 'Tech', image: 'https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '3.4k', comments: 89, type: 'album', span: 'col-span-1 row-span-1' },



  { id: 15, category: 'Tech', image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '1.8k', comments: 40, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 16, category: 'Tech', image: 'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '9.2k', comments: 210, type: 'image', span: 'col-span-1 row-span-1' },







  // --- ARCHITECTURE (Modern, Buildings) ---



  { id: 17, category: 'Architecture', image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '15k', comments: 450, type: 'album', span: 'col-span-1 row-span-1' },



  { id: 18, category: 'Architecture', image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '3.2k', comments: 76, type: 'image', span: 'col-span-1 row-span-2' }, // Tall



  { id: 19, category: 'Architecture', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '2.9k', comments: 88, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 20, category: 'Architecture', image: 'https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '8.8k', comments: 200, type: 'image', span: 'col-span-2 row-span-1' }, // Wide



  { id: 21, category: 'Architecture', image: 'https://images.pexels.com/photos/262367/pexels-photo-262367.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '4.5k', comments: 90, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 22, category: 'Architecture', image: 'https://images.pexels.com/photos/2228582/pexels-photo-2228582.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '1.2k', comments: 34, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 23, category: 'Architecture', image: 'https://images.pexels.com/photos/323772/pexels-photo-323772.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '6.6k', comments: 145, type: 'video', span: 'col-span-1 row-span-1' },



  { id: 24, category: 'Architecture', image: 'https://images.pexels.com/photos/1838640/pexels-photo-1838640.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '2.4k', comments: 55, type: 'image', span: 'col-span-1 row-span-1' },







  // --- TRAVEL (Nature, Adventure) ---



  { id: 25, category: 'Travel', image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '8.2k', comments: 201, type: 'video', span: 'col-span-1 row-span-1' },



  { id: 26, category: 'Travel', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '5.5k', comments: 130, type: 'image', span: 'col-span-2 row-span-2' }, // Big Feature



  { id: 27, category: 'Travel', image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '670', comments: 19, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 28, category: 'Travel', image: 'https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '9.1k', comments: 210, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 29, category: 'Travel', image: 'https://images.pexels.com/photos/3244513/pexels-photo-3244513.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '14k', comments: 320, type: 'album', span: 'col-span-1 row-span-1' },



  { id: 30, category: 'Travel', image: 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '2.2k', comments: 48, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 31, category: 'Travel', image: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '3.8k', comments: 80, type: 'video', span: 'col-span-1 row-span-2' }, // Tall



  { id: 32, category: 'Travel', image: 'https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '7.9k', comments: 180, type: 'image', span: 'col-span-1 row-span-1' },







  // --- PHOTOGRAPHY (Portrait, Artistic) ---



  { id: 33, category: 'Photography', image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '12k', comments: 320, type: 'video', span: 'col-span-1 row-span-1' },



  { id: 34, category: 'Photography', image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '3.2k', comments: 56, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 35, category: 'Photography', image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '2.9k', comments: 88, type: 'image', span: 'col-span-1 row-span-2' }, // Tall



  { id: 36, category: 'Photography', image: 'https://images.pexels.com/photos/1193942/pexels-photo-1193942.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '1.5k', comments: 40, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 37, category: 'Photography', image: 'https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '5.6k', comments: 125, type: 'image', span: 'col-span-2 row-span-1' }, // Wide



  { id: 38, category: 'Photography', image: 'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '8.3k', comments: 190, type: 'album', span: 'col-span-1 row-span-1' },



  { id: 39, category: 'Photography', image: 'https://images.pexels.com/photos/2092479/pexels-photo-2092479.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '3.9k', comments: 92, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 40, category: 'Photography', image: 'https://images.pexels.com/photos/1081685/pexels-photo-1081685.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '11k', comments: 250, type: 'video', span: 'col-span-1 row-span-1' },







  // --- DIGITAL ART (Abstract, 3D) ---



  { id: 41, category: 'Digital Art', image: 'https://images.pexels.com/photos/2110951/pexels-photo-2110951.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '9.5k', comments: 230, type: 'image', span: 'col-span-2 row-span-2' }, // Big Feature



  { id: 42, category: 'Digital Art', image: 'https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '4.2k', comments: 100, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 43, category: 'Digital Art', image: 'https://images.pexels.com/photos/2167039/pexels-photo-2167039.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '3.1k', comments: 70, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 44, category: 'Digital Art', image: 'https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '1.8k', comments: 45, type: 'video', span: 'col-span-1 row-span-2' }, // Tall



  { id: 45, category: 'Digital Art', image: 'https://images.pexels.com/photos/1209843/pexels-photo-1209843.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '7.4k', comments: 160, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 46, category: 'Digital Art', image: 'https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '5.9k', comments: 130, type: 'album', span: 'col-span-1 row-span-1' },



  { id: 47, category: 'Digital Art', image: 'https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '2.7k', comments: 60, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 48, category: 'Digital Art', image: 'https://images.pexels.com/photos/1910225/pexels-photo-1910225.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '8.8k', comments: 210, type: 'image', span: 'col-span-1 row-span-1' },



  



  // --- MIXED EXTRAS ---



  { id: 49, category: 'Travel', image: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '1.5k', comments: 30, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 50, category: 'Tech', image: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '3.3k', comments: 75, type: 'image', span: 'col-span-1 row-span-1' },







 { id: 1, category: 'Cyberpunk', image: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '2.4k', comments: 45, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 2, category: 'Cyberpunk', image: 'https://images.pexels.com/photos/2603464/pexels-photo-2603464.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '5.1k', comments: 98, type: 'image', span: 'col-span-2 row-span-2' }, // Big Feature



  { id: 3, category: 'Cyberpunk', image: 'https://images.pexels.com/photos/2071882/pexels-photo-2071882.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '1.2k', comments: 30, type: 'video', span: 'col-span-1 row-span-2' }, // Tall



  { id: 4, category: 'Cyberpunk', image: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '8.5k', comments: 120, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 5, category: 'Cyberpunk', image: 'https://images.pexels.com/photos/3172740/pexels-photo-3172740.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '3.3k', comments: 55, type: 'album', span: 'col-span-1 row-span-1' },



  { id: 6, category: 'Cyberpunk', image: 'https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '4.1k', comments: 88, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 7, category: 'Cyberpunk', image: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '900', comments: 22, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 8, category: 'Cyberpunk', image: 'https://images.pexels.com/photos/2397414/pexels-photo-2397414.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '12k', comments: 300, type: 'video', span: 'col-span-1 row-span-1' },







  // --- TECH (Gadgets, Code, Setup) ---



  { id: 9, category: 'Tech', image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '1.1k', comments: 33, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 10, category: 'Tech', image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '4.5k', comments: 112, type: 'image', span: 'col-span-2 row-span-1' }, // Wide



  { id: 11, category: 'Tech', image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '900', comments: 24, type: 'video', span: 'col-span-1 row-span-1' },



  { id: 12, category: 'Tech', image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '2.1k', comments: 45, type: 'image', span: 'col-span-1 row-span-2' }, // Tall



  { id: 13, category: 'Tech', image: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '6.7k', comments: 150, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 14, category: 'Tech', image: 'https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '3.4k', comments: 89, type: 'album', span: 'col-span-1 row-span-1' },



  { id: 15, category: 'Tech', image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '1.8k', comments: 40, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 16, category: 'Tech', image: 'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '9.2k', comments: 210, type: 'image', span: 'col-span-1 row-span-1' },







  // --- ARCHITECTURE (Modern, Buildings) ---



  { id: 17, category: 'Architecture', image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '15k', comments: 450, type: 'album', span: 'col-span-1 row-span-1' },



  { id: 18, category: 'Architecture', image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '3.2k', comments: 76, type: 'image', span: 'col-span-1 row-span-2' }, // Tall



  { id: 19, category: 'Architecture', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '2.9k', comments: 88, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 20, category: 'Architecture', image: 'https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '8.8k', comments: 200, type: 'image', span: 'col-span-2 row-span-1' }, // Wide



  { id: 21, category: 'Architecture', image: 'https://images.pexels.com/photos/262367/pexels-photo-262367.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '4.5k', comments: 90, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 22, category: 'Architecture', image: 'https://images.pexels.com/photos/2228582/pexels-photo-2228582.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '1.2k', comments: 34, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 23, category: 'Architecture', image: 'https://images.pexels.com/photos/323772/pexels-photo-323772.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '6.6k', comments: 145, type: 'video', span: 'col-span-1 row-span-1' },



  { id: 24, category: 'Architecture', image: 'https://images.pexels.com/photos/1838640/pexels-photo-1838640.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '2.4k', comments: 55, type: 'image', span: 'col-span-1 row-span-1' },







  // --- TRAVEL (Nature, Adventure) ---



  { id: 25, category: 'Travel', image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '8.2k', comments: 201, type: 'video', span: 'col-span-1 row-span-1' },



  { id: 26, category: 'Travel', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '5.5k', comments: 130, type: 'image', span: 'col-span-2 row-span-2' }, // Big Feature



  { id: 27, category: 'Travel', image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '670', comments: 19, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 28, category: 'Travel', image: 'https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '9.1k', comments: 210, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 29, category: 'Travel', image: 'https://images.pexels.com/photos/3244513/pexels-photo-3244513.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '14k', comments: 320, type: 'album', span: 'col-span-1 row-span-1' },



  { id: 30, category: 'Travel', image: 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '2.2k', comments: 48, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 31, category: 'Travel', image: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '3.8k', comments: 80, type: 'video', span: 'col-span-1 row-span-2' }, // Tall



  { id: 32, category: 'Travel', image: 'https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '7.9k', comments: 180, type: 'image', span: 'col-span-1 row-span-1' },







  // --- PHOTOGRAPHY (Portrait, Artistic) ---



  { id: 33, category: 'Photography', image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '12k', comments: 320, type: 'video', span: 'col-span-1 row-span-1' },



  { id: 34, category: 'Photography', image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '3.2k', comments: 56, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 35, category: 'Photography', image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '2.9k', comments: 88, type: 'image', span: 'col-span-1 row-span-2' }, // Tall



  { id: 36, category: 'Photography', image: 'https://images.pexels.com/photos/1193942/pexels-photo-1193942.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '1.5k', comments: 40, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 37, category: 'Photography', image: 'https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '5.6k', comments: 125, type: 'image', span: 'col-span-2 row-span-1' }, // Wide



  { id: 38, category: 'Photography', image: 'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '8.3k', comments: 190, type: 'album', span: 'col-span-1 row-span-1' },



  { id: 39, category: 'Photography', image: 'https://images.pexels.com/photos/2092479/pexels-photo-2092479.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '3.9k', comments: 92, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 40, category: 'Photography', image: 'https://images.pexels.com/photos/1081685/pexels-photo-1081685.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '11k', comments: 250, type: 'video', span: 'col-span-1 row-span-1' },







  // --- DIGITAL ART (Abstract, 3D) ---



  { id: 41, category: 'Digital Art', image: 'https://images.pexels.com/photos/2110951/pexels-photo-2110951.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '9.5k', comments: 230, type: 'image', span: 'col-span-2 row-span-2' }, // Big Feature



  { id: 42, category: 'Digital Art', image: 'https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '4.2k', comments: 100, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 43, category: 'Digital Art', image: 'https://images.pexels.com/photos/2167039/pexels-photo-2167039.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '3.1k', comments: 70, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 44, category: 'Digital Art', image: 'https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '1.8k', comments: 45, type: 'video', span: 'col-span-1 row-span-2' }, // Tall



  { id: 45, category: 'Digital Art', image: 'https://images.pexels.com/photos/1209843/pexels-photo-1209843.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '7.4k', comments: 160, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 46, category: 'Digital Art', image: 'https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '5.9k', comments: 130, type: 'album', span: 'col-span-1 row-span-1' },



  { id: 47, category: 'Digital Art', image: 'https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '2.7k', comments: 60, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 48, category: 'Digital Art', image: 'https://images.pexels.com/photos/1910225/pexels-photo-1910225.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '8.8k', comments: 210, type: 'image', span: 'col-span-1 row-span-1' },



  



  // --- MIXED EXTRAS ---



  { id: 49, category: 'Travel', image: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '1.5k', comments: 30, type: 'image', span: 'col-span-1 row-span-1' },



  { id: 50, category: 'Tech', image: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=600', likes: '3.3k', comments: 75, type: 'image', span: 'col-span-1 row-span-1' },









];
  // ... (Your full list of 50 images)


const categories = ["For You", "Photography", "Tech", "Cyberpunk", "Architecture", "Travel", "Digital Art"];

// --- FIXED MODAL COMPONENT ---
const ExplorePostModal = ({ post, onClose }) => {
  const modalRef = useRef(null);
  const bgRef = useRef(null);

  // Lock Scroll on Body
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  // Animation
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(bgRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(modalRef.current, 
        { opacity: 0, scale: 0.9, y: 20 }, 
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.2)", delay: 0.1 }
      );
    });
    return () => ctx.revert();
  }, []);

  const parseLikes = (str) => {
    if(typeof str === 'string' && str.includes('k')) return parseFloat(str) * 1000;
    return parseInt(str) || 0;
  }

  return (
    // 1. FIX: Changed 'flex items-center' to 'overflow-y-auto' so you can scroll if it's too tall
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/90 backdrop-blur-xl">
        
        {/* 2. FIX: 'min-h-full' + 'flex items-center' ensures it centers if small, but scrolls if tall */}
        <div className="min-h-full flex items-center justify-center p-4 py-12">
            
            {/* Close Button (Fixed to screen top-right so it never scrolls away) */}
            <button 
                onClick={onClose} 
                className="fixed top-6 right-6 z-[110] p-3 bg-white/10 hover:bg-red-500/20 hover:text-red-500 rounded-full text-white transition-all backdrop-blur-md"
            >
                <X size={28} />
            </button>

            {/* Click outside to close */}
            <div ref={bgRef} onClick={onClose} className="absolute inset-0 w-full h-full"></div>

            {/* Modal Content */}
            <div ref={modalRef} className="relative w-full max-w-[470px] z-20">
                <Post 
                    username={post.category + "_guru"} 
                    userImage={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.id}`} 
                    postImage={post.image}
                    likes={parseLikes(post.likes)}
                    caption={`Exploring the beauty of ${post.category}. This shot captures the essence perfectly! ✨ #${post.category} #explore`}
                    timeAgo="Just now"
                />
            </div>
        </div>
    </div>
  );
}

// --- MAIN EXPLORE COMPONENT ---
export default function ExploreSection() {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState("For You");
  const [selectedPost, setSelectedPost] = useState(null);

  const visiblePosts = useMemo(() => {
    if (activeTab === "For You") return allExplorePosts;
    return allExplorePosts.filter((post) => post.category === activeTab);
  }, [activeTab]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.set('.explore-item', { opacity: 0, y: 30 });
      gsap.to('.explore-item', {
        opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.03, ease: "power2.out", overwrite: true 
      });
    }, containerRef);
    return () => ctx.revert();
  }, [visiblePosts]); 

  return (
    <div ref={containerRef} className="w-full max-w-5xl mx-auto pb-20">
      
      {/* Header */}
      <div className="sticky top-20 md:top-0 z-30 bg-slate-950/90 backdrop-blur-xl py-4 mb-2">
        <div className="md:hidden px-1 mb-4">
            <div className="relative group">
                <input type="text" placeholder="Search..." className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white outline-none focus:border-violet-500/50" />
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            </div>
        </div>
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide px-1 pb-2">
            <button className="p-2 bg-white/5 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:border-violet-500 transition-colors flex-shrink-0"><SlidersHorizontal size={18} /></button>
            {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveTab(cat)} className={`whitespace-nowrap px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 border flex-shrink-0 ${activeTab === cat ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white border-transparent shadow-lg shadow-violet-900/20' : 'bg-transparent text-slate-400 border-white/10 hover:border-white/30 hover:text-white'}`}>{cat}</button>
            ))}
        </div>
      </div>

      {/* Grid */}
      {visiblePosts.length > 0 ? (
        <div className="grid grid-cols-3 gap-1 md:gap-4 auto-rows-[120px] md:auto-rows-[250px]">
            {visiblePosts.map((item) => (
                <div 
                    key={item.id} 
                    onClick={() => setSelectedPost(item)} 
                    className={`explore-item opacity-0 relative group overflow-hidden rounded-none md:rounded-2xl cursor-pointer bg-slate-900 ${activeTab === 'For You' ? (item.span || 'col-span-1 row-span-1') : 'col-span-1 row-span-1'}`}
                >
                    <img src={item.image} alt="Explore" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 backdrop-blur-[2px]">
                        <div className="flex items-center gap-2 text-white font-bold"><Heart size={24} fill="white" /> <span>{item.likes}</span></div>
                    </div>
                    <div className="absolute top-2 right-2 text-white drop-shadow-md">
                        {item.type === 'video' && <Play size={20} fill="white" />}
                        {item.type === 'album' && <Layers size={20} fill="white" />}
                    </div>
                </div>
            ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500"><Search size={48} className="mb-4 opacity-50" /><p>No posts found for "{activeTab}"</p></div>
      )}

      {/* Render Post Modal */}
      {selectedPost && (
        <ExplorePostModal 
            post={selectedPost} 
            onClose={() => setSelectedPost(null)} 
        />
      )}

      <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
}