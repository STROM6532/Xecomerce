import { motion } from "framer-motion";

export const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container-custom pt-24"
    >
      <h1 className="text-3xl font-bold mb-6">About Us</h1>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <p className="mb-4">
          Welcome to ShopAI – an AI-powered smart e-commerce platform designed to provide personalized shopping experiences.
        </p>

        <p className="mb-4">
          Our system uses machine learning and intelligent recommendations to help users find the best products quickly and easily.
        </p>

        <p>
          This platform is built with modern technologies like React, AI models, and smart analytics to create a next generation shopping environment.
        </p>
      </div>
    </motion.div>
  );
};
