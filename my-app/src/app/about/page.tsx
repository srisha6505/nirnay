import React from 'react';
import Sidebar from '@/components/sidebar';
import Headbar from '@/components/headbar';

export default function Component() {
  const teamMembers = [
    { 
      name: "Srisha KS", 
      email: "srishaks6@gmail.com", 
      color: "bg-pink-500",
      bio: "Results-oriented leader with a passion for building high-performing teams and delivering exceptional customer experiences. With a background in AIML, I'm well-versed in the latest trends and best practices that drive business growth."
    },
    { 
      name: "Swatantra Tiwari", 
      email: "swatantratiwari29@gmail.com", 
      color: "bg-purple-500",
      bio: "Technical wizard with a passion for solving complex problems and building scalable solutions. My goal is to craft innovative software that makes a real difference in people's lives."
    },
    { 
      name: "Saharsh Raj", 
      email: "saharsh@example.com", 
      color: "bg-blue-500",
      bio: "Collaborative problem-solver with a knack for finding creative solutions that delight our customers. I'm passionate about building strong relationships and empowering my teammates to do their best work."
    },
    { 
      name: "Adviktha K", 
      email: "advikthap@gmail.com", 
      color: "bg-green-500",
      bio: "Data-driven innovator with a passion for storytelling through numbers. I love digging into complex data sets to uncover insights that inform our product decisions and drive growth."
    },
    { 
      name: "Sneha Vats", 
      email: "snehasania123@gmail.com", 
      color: "bg-yellow-500",
      bio: "Design-savvy storyteller who crafts compelling narratives that bring our brand to life. With a background in fine art and a love for good design, I'm always looking for ways to elevate our visual identity and create a memorable experience for our customers."
    },
  ];

  return (
      <body>
        <div className="flex flex-col min-h-screen bg-white text-black">
          <div className="flex flex-1">
            <Sidebar />
    <div className="min-h-screen bg-gray-100">
    
    <div className="bg-gray-800 text-white text-center py-16 px-4">
        <h1 className="text-5xl font-bold mb-4">About Us</h1>
        <p className="text-xl">Discover our amazing team</p>
      </div>

      {/* Our Team */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Our Team</h2>
        <div className="space-y-12">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} 
                          bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105`}
            >
              <div className={`w-full md:w-1/3 h-96 ${member.color}`}></div>
              <div className="w-full md:w-2/3 p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
                <p className="text-gray-600 mb-4">Member</p>
                <p className="text-sm mb-4">{member.bio}</p>
                <p className="text-sm mb-6">{member.email}</p>
                <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1">
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
    </div>
    </body>
  );
}