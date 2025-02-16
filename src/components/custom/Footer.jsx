import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Linkedin, Github } from "lucide-react";

function Footer() {
  const { user } = useAuth();

  return (
    <footer
      className="bg-gradient-to-r from-purple-400 to-pink-400 backdrop-blur-md bg-opacity-10 text-white py-4 bottom-0 w-full border-t border-white border-opacity-20"
    >
      <div className="container mx-auto flex justify-around items-center">
        <div className="flex space-x-4">
          <a
            href="https://in.linkedin.com/company/parkar-digital"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="https://github.com/cdcostaparkar/lms_pruf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            <Github size={24} />
          </a>
        </div>
        {!user && (
          <div className="about-us-link">
            <a href="/aboutus" className="font-bold hover:text-gray-300">
              About Us
            </a>
          </div>
        )}
      </div>
      <div className="text-center mt-2">
        Made with ❤️
        <br />
        &copy; {new Date().getFullYear()} Easy{" "}
        <strong className="text-black">Learning</strong>
      </div>
    </footer>
  );
}

export default Footer;
