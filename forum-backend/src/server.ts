// Create a library for API server
// Express: API server framework
// cors: It makes HTML can call API in the different port
import express from "express";
import cors from "cors";

// Create server instance and define the port
const app = express();
const port = 3000;
